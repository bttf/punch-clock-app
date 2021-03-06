import fs from 'fs';
import uuid from 'uuid/v4';
import parseMilliseconds from '../lib/parseMilliseconds';

/**
 * TimeCard format
 * {
 *   sessions: [{
 *     id: 5
 *     memo: 'buld the thing',
 *     times: [{
 *       startTime: 1520000,
 *       endTime: 1530000,
 *     }],
 *   }],
 *  }
 */
class TimeCardManager {
  constructor(timeCardPath) {
    if (!timeCardPath) throw new Error('timeCardPath not specified');

    this.timeCardPath = timeCardPath;

    const { sessions } = this.readTimeCard();

    const recentSession = sessions.length && sessions[0];
    const recentTime = recentSession && recentSession.times.slice(-1)[0];

    this.currentSession = recentTime && !recentTime.endTime ?
      recentSession : null;
  }

  readTimeCard() {
    let contents;
    try {
      contents = fs.readFileSync(this.timeCardPath, 'utf8');
    } catch(e) {
      if (e.message.includes('no such file')) {
        return { sessions: [] };
      }
      throw e;
    }

    if (!contents) {
      return { sessions: [] };
    }

    let sessions;
    try {
      const timeCard = JSON.parse(contents);
      sessions = timeCard.sessions || [];
    } catch(e) {
      throw new Error('Trouble parsing time card JSON. Try fixing the file, or delete it');
    }

    const sortedSessions = sessions.sort((a, b) => {
      return new Date(b.times[0].startTime) - new Date(a.times[0].startTime);
    });

    return { sessions: sortedSessions };
  }

  updateTimeCard(sessions) {
    const timeCardPath = this.timeCardPath;
    const sessionsJSON = JSON.stringify({ sessions });
    fs.writeFileSync(timeCardPath, sessionsJSON, 'utf8');
  }

  updateSession(session) {
    const { sessions } = this.readTimeCard();
    const existingSession = sessions.find(s => s.id === session.id);

    let updatedSessions;
    if (existingSession) {
      updatedSessions = sessions.map(s => s.id === session.id ? session : s);
    } else {
      updatedSessions = [...sessions, session];
    }

    this.updateTimeCard(updatedSessions);
  }

  startSession(memo) {
    const currentSession = this.currentSession;

    if (currentSession && currentSession.times.length) {
      throw new Error('Cannot start time for ongoing session');
    }

    this.currentSession = {
      id: uuid(),
      memo,
      times: [{
        startTime: new Date(),
        endTime: null,
      }],
    };

    this.updateSession(this.currentSession);
  }

  pauseSession() {
    const currentSession = this.currentSession;

    if (!currentSession || !currentSession.times.length) {
      throw new Error('Cannot pause time for session that has not started');
    }

    const recentTime = currentSession.times.slice(-1)[0];

    if (recentTime.endTime) {
      throw new Error('Cannot pause session that has already ended');
    }

    this.currentSession = {
      ...currentSession,
      times: currentSession.times.map((t, index, arr) => {
        return index === arr.length - 1 ? {
          startTime: t.startTime,
          endTime: new Date(),
        } : t;
      }),
    }

    this.updateSession(this.currentSession);
  }

  unpauseSession() {
    const currentSession = this.currentSession;

    if (!currentSession || !currentSession.times.length) {
      throw new Error('Cannot unpause time for session that has not started');
    }

    const recentTime = currentSession.times.slice(-1)[0];

    if (!recentTime.endTime) {
      throw new Error('Cannot unpause session that has not been paused');
    }

    this.currentSession = {
      ...currentSession,
      times: currentSession.times.concat([{
        startTime: new Date(),
        endTime: null,
      }])
    }

    this.updateSession(this.currentSession);
  }

  stopSession() {
    const currentSession = this.currentSession;

    if (!currentSession || !currentSession.times.length) {
      throw new Error('Cannot stop time for session that has not started');
    }

    const recentTime = currentSession.times.slice(-1)[0];

    if (recentTime.endTime) {
      this.currentSession = null;
      return;
    }

    this.currentSession = {
      ...currentSession,
      times: currentSession.times.map((t, index, arr) => {
        return index === arr.length - 1 ? {
          startTime: t.startTime,
          endTime: new Date(),
        } : t;
      }),
    }

    this.updateSession(this.currentSession);

    this.currentSession = null;
  }

  _getSessionTime(session) {
    const times = session.times || [];
    return times.reduce((acc, time) => {
      const start = new Date(time.startTime);
      const end = time.endTime ? new Date(time.endTime) : new Date();
      return acc + (end.getTime() - start.getTime());
    }, 0);
  }

  getCurrentSessionDelta() {
    const currentSession = this.currentSession;

    if (!currentSession) return 0;

    const times = currentSession.times;

    if (!times || !times.length) return 0;

    return this._getSessionTime(currentSession);
  }

  getCurrentSessionStatus() {
    const currentSession = this.currentSession;

    if (!currentSession) return 'ended'

    const recentTime = currentSession.times.slice(-1)[0];

    if (!recentTime) {
      throw new Error('Session created without any start time');
    }

    return recentTime.endTime ? 'paused' : 'started';
  }

  getTotalTime() {
    const { sessions } = this.readTimeCard();
    return sessions.reduce((acc, session) => acc + this._getSessionTime(session), 0);
  }

  getTimeCardLogs() {
    const { sessions } = this.readTimeCard();
    return sessions.reduce((acc, session) => {
      const date = new Date(session.times[0].startTime);
      const { seconds, minutes, hours } =
        parseMilliseconds(this._getSessionTime(session));
      const log = {
        session,
        displayTotal: `${date.toLocaleDateString()} - ${hours}h ${minutes}m ${seconds}s${session.memo ? ` - ${session.memo}` : ''}`,
      };
      acc.push(log)
      return acc;
    }, []);
  }

  removeSession(session) {
    const { sessions } = this.readTimeCard();
    this.updateTimeCard(sessions.map(s => s.id !== session.id ? s : null).filter(Boolean));
  }

  // TODO implement this feature in UI
  alterSessionTime(session, deltaMs) {
    if (deltaMs >= 0) {
      const newTimes = session.times.map((t, index, arr) => {
        if (index < arr.length - 1) return t;

        const endTimeDate = new Date(t.endTime);

        return {
          ...t,
          endTime: new Date(endTimeDate.getTime() + deltaMs),
        };
      });

      this.updateSession({
        ...session,
        times: newTimes,
      });
    } else {
      const sessionTotalTime = this._getSessionTime(session);

      if (deltaMs > sessionTotalTime) {
        throw new Error('Cannot rollback past 0-time');
      }

      const newSessionTotal = sessionTotalTime - deltaMs;

      if (newSessionTotal === sessionTotalTime) return;

      const newTimes = session.times.reduce((acc, time) => {
        const accTimeMs = this._getSessionTime({ times: acc });
        const startTimeDate = new Date(time.startTime);
        const endTimeDate = new Date(time.endTime);
        const timeMs = startTimeDate.getTime() - endTimeDate.getTime();

        if ((accTimeMs + timeMs) < newSessionTotal) {
          return acc.concat(time);
        }

        const accDelta =  (accTimeMs + timeMs) - newSessionTotal;

        if (accDelta === timeMs) return acc;

        return acc.concat({
          ...time,
          startTime: startTimeDate,
          endTime: new Date(endTimeDate.getTime() - accDelta),
        });
      }, []);

      this.updateSession({
        ...session,
        times: newTimes,
      });
    }
  }
}

export default TimeCardManager;

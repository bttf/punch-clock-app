import React, { Component } from 'react';
import Container from './Container';
import parseMilliseconds from '../../../lib/parseMilliseconds';

export default class ClockDisplay extends Component {
  state = { timeoutHandler: null };

  componentDidMount() {
    this.updateClock();
  }

  updateClock = () => {
    const {
      seconds,
      minutes,
      hours,
    } = parseMilliseconds(this.props.getDelta());

    const clocktime = {
      second: seconds,
      minute: minutes,
      hour: hours,
    };

    for (let timeUnit in clocktime) {
      clocktime[timeUnit] = clocktime[timeUnit].toString();

      if (clocktime[timeUnit].length == 1) {
        clocktime[timeUnit] = '0'+clocktime[timeUnit];
      }

      clocktime[timeUnit] = clocktime[timeUnit].split('');

      for (let i=0; i<2; i++) {
        let selector = '#lcd-clock .'+timeUnit+'.digit-'+(i+1);
        let className = 'number-is-'+clocktime[timeUnit][i];

        for (let j=0; j<10; j++) {
          let oldClass = 'number-is-'+j;
          document.querySelector(selector).classList.remove(oldClass);
        }

        document.querySelector(selector).classList.add(className);
      }
    }

    setTimeout(this.updateClock, 200);
  }

  render() {
    return (
      <Container className={this.props.className}>
        <svg version="1.1" id="lcd-clock" x="0px" y="0px"
          width="1362.45px" height="324px" viewBox="0 0 1362.45 324" enableBackground="new 0 0 1362.45 324">
          <g className="hour digit digit-1">
            <g className="lcd-element top-center">
              <polygon points="149.486,40 49.486,40 50.883,0 150.883,0"/>
              <polygon points="149.486,40 150.883,0 170.184,20"/>
              <polygon points="50.883,0 49.486,40 30.184,20"/>
            </g>
            <g className="lcd-element top-right">
              <polygon points="146.959,141 186.959,141 190.451,41 150.451,41"/>
              <polygon points="190.451,41 150.451,41 171.149,21"/>
              <polygon points="146.959,141 186.959,141 166.26,161"/>
            </g>
            <g className="lcd-element top-left">
              <polygon points="4.959,141 44.959,141 48.451,41 8.451,41"/>
              <polygon points="48.451,41 8.451,41 29.149,21"/>
              <polygon points="4.959,141 44.959,141 24.26,161"/>
            </g>
            <g className="lcd-element mid-center">
              <polygon points="144.527,182 44.527,182 45.924,142 145.924,142"/>
              <polygon points="144.527,182 145.924,142 165.226,162"/>
              <polygon points="45.924,142 44.527,182 25.226,162"/>
            </g>
            <g className="lcd-element bottom-right">
              <polygon points="142,283 182,283 185.492,183 145.492,183"/>
              <polygon points="185.492,183 145.492,183 166.191,163"/>
              <polygon points="142,283 182,283 161.302,303"/>
            </g>
            <g className="lcd-element bottom-left">
              <polygon points="0,283 40,283 43.492,183 3.492,183"/>
              <polygon points="43.492,183 3.492,183 24.191,163"/>
              <polygon points="0,283 40,283 19.302,303"/>
            </g>
            <g className="lcd-element bottom-center">
              <polygon points="139.568,324 140.965,284 160.267,304"/>
              <polygon points="40.965,284 39.568,324 20.267,304"/>
              <polygon points="139.568,324 39.568,324 40.965,284 140.965,284"/>
            </g>
          </g>
          <g className="hour digit digit-2">
            <g className="lcd-element top-center">
              <polygon points="361.486,40 261.486,40 262.883,0 362.883,0"/>
              <polygon points="361.486,40 362.883,0 382.184,20"/>
              <polygon points="262.883,0 261.486,40 242.184,20"/>
            </g>
            <g className="lcd-element top-right">
              <polygon points="358.959,141 398.959,141 402.451,41 362.451,41"/>
              <polygon points="402.451,41 362.451,41 383.149,21"/>
              <polygon points="358.959,141 398.959,141 378.26,161"/>
            </g>
            <g className="lcd-element top-left">
              <polygon points="216.959,141 256.959,141 260.451,41 220.451,41"/>
              <polygon points="260.451,41 220.451,41 241.149,21"/>
              <polygon points="216.959,141 256.959,141 236.26,161"/>
            </g>
            <g className="lcd-element mid-center">
              <polygon points="356.527,182 256.527,182 257.924,142 357.924,142"/>
              <polygon points="356.527,182 357.924,142 377.226,162"/>
              <polygon points="257.924,142 256.527,182 237.226,162"/>
            </g>
            <g className="lcd-element bottom-right">
              <polygon points="354,283 394,283 397.492,183 357.492,183"/>
              <polygon points="397.492,183 357.492,183 378.191,163"/>
              <polygon points="354,283 394,283 373.302,303"/>
            </g>
            <g className="lcd-element bottom-left">
              <polygon points="212,283 252,283 255.492,183 215.492,183"/>
              <polygon points="255.492,183 215.492,183 236.191,163"/>
              <polygon points="212,283 252,283 231.302,303"/>
            </g>
            <g className="lcd-element bottom-center">
              <polygon points="351.568,324 352.965,284 372.267,304"/>
              <polygon points="252.965,284 251.568,324 232.267,304"/>
              <polygon points="351.568,324 251.568,324 252.965,284 352.965,284"/>
            </g>
          </g>
          <g className="lcd-element dots">
            <path d="M458.657,121c-0.289,8.284-7.24,15-15.524,15s-14.765-6.716-14.476-15c0.29-8.284,7.24-15,15.524-15
              S458.947,112.716,458.657,121z"/>
            <path d="M455.515,211c-0.29,8.284-7.24,15-15.524,15s-14.766-6.716-14.476-15c0.289-8.284,7.239-15,15.523-15
              S455.804,202.716,455.515,211z"/>
          </g>
          <g className="minute digit digit-1">
            <g className="lcd-element top-center">
              <polygon points="636.485,40 536.485,40 537.883,0 637.883,0"/>
              <polygon points="636.485,40 637.883,0 657.185,20"/>
              <polygon points="537.883,0 536.485,40 517.185,20"/>
            </g>
            <g className="lcd-element top-right">
              <polygon points="633.959,141 673.959,141 677.451,41 637.451,41"/>
              <polygon points="677.451,41 637.451,41 658.149,21"/>
              <polygon points="633.959,141 673.959,141 653.261,161"/>
            </g>
            <g className="lcd-element top-left">
              <polygon points="491.959,141 531.959,141 535.451,41 495.451,41"/>
              <polygon points="535.451,41 495.451,41 516.149,21"/>
              <polygon points="491.959,141 531.959,141 511.261,161"/>
            </g>
            <g className="lcd-element mid-center">
              <polygon points="631.527,182 531.527,182 532.924,142 632.924,142"/>
              <polygon points="631.527,182 632.924,142 652.226,162"/>
              <polygon points="532.924,142 531.527,182 512.226,162"/>
            </g>
            <g className="lcd-element bottom-right">
              <polygon points="629,283 669,283 672.492,183 632.492,183"/>
              <polygon points="672.492,183 632.492,183 653.19,163"/>
              <polygon points="629,283 669,283 648.302,303"/>
            </g>
            <g className="lcd-element bottom-left">
              <polygon points="487,283 527,283 530.492,183 490.492,183"/>
              <polygon points="530.492,183 490.492,183 511.19,163"/>
              <polygon points="487,283 527,283 506.302,303"/>
            </g>
            <g className="lcd-element bottom-center">
              <polygon points="626.568,324 627.966,284 647.267,304"/>
              <polygon points="527.966,284 526.568,324 507.267,304"/>
              <polygon points="626.568,324 526.568,324 527.966,284 627.966,284"/>
            </g>
          </g>
          <g className="minute digit digit-2">
            <g className="lcd-element top-center">
              <polygon points="848.485,40 748.485,40 749.883,0 849.882,0"/>
              <polygon points="848.485,40 849.882,0 869.185,20"/>
              <polygon points="749.883,0 748.485,40 729.185,20"/>
            </g>
            <g className="lcd-element top-right">
              <polygon points="845.958,141 885.958,141 889.45,41 849.45,41"/>
              <polygon points="889.45,41 849.45,41 870.149,21"/>
              <polygon points="845.958,141 885.958,141 865.261,161"/>
            </g>
            <g className="lcd-element top-left">
              <polygon points="703.959,141 743.959,141 747.451,41 707.451,41"/>
              <polygon points="747.451,41 707.451,41 728.149,21"/>
              <polygon points="703.959,141 743.959,141 723.261,161"/>
            </g>
            <g className="lcd-element mid-center">
              <polygon points="843.526,182 743.527,182 744.924,142 844.925,142"/>
              <polygon points="843.526,182 844.925,142 864.226,162"/>
              <polygon points="744.924,142 743.527,182 724.226,162"/>
            </g>
            <g className="lcd-element bottom-right">
              <polygon points="841.001,283 881.001,283 884.493,183 844.493,183"/>
              <polygon points="884.493,183 844.493,183 865.19,163"/>
              <polygon points="841.001,283 881.001,283 860.302,303"/>
            </g>
            <g className="lcd-element bottom-left">
              <polygon points="699,283 739,283 742.492,183 702.492,183"/>
              <polygon points="742.492,183 702.492,183 723.19,163"/>
              <polygon points="699,283 739,283 718.302,303"/>
            </g>
            <g className="lcd-element bottom-center">
              <polygon points="838.569,324 839.966,284 859.267,304"/>
              <polygon points="739.966,284 738.568,324 719.267,304"/>
              <polygon points="838.569,324 738.568,324 739.966,284 839.966,284"/>
            </g>
          </g>
          <g className="lcd-element dots">
            <path d="M945.657,121c-0.289,8.284-7.24,15-15.523,15c-8.285,0-14.766-6.716-14.477-15s7.24-15,15.523-15
              C939.466,106,945.946,112.716,945.657,121z"/>
            <path d="M942.515,211c-0.289,8.284-7.24,15-15.523,15c-8.285,0-14.766-6.716-14.477-15s7.24-15,15.523-15
              C936.323,196,942.804,202.716,942.515,211z"/>
          </g>
          <g className="second digit digit-1">
            <g className="lcd-element top-center">
              <polygon points="1109.485,40 1009.485,40 1010.882,0 1110.882,0"/>
              <polygon points="1109.485,40 1110.882,0 1130.185,20"/>
              <polygon points="1010.882,0 1009.485,40 990.185,20"/>
            </g>
            <g className="lcd-element top-right">
              <polygon points="1106.958,141 1146.958,141 1150.45,41 1110.45,41"/>
              <polygon points="1150.45,41 1110.45,41 1131.149,21"/>
              <polygon points="1106.958,141 1146.958,141 1126.261,161"/>
            </g>
            <g className="lcd-element top-left">
              <polygon points="964.958,141 1004.958,141 1008.45,41 968.45,41"/>
              <polygon points="1008.45,41 968.45,41 989.149,21"/>
              <polygon points="964.958,141 1004.958,141 984.261,161"/>
            </g>
            <g className="lcd-element mid-center">
              <polygon points="1104.526,182 1004.526,182 1005.925,142 1105.925,142"/>
              <polygon points="1104.526,182 1105.925,142 1125.226,162"/>
              <polygon points="1005.925,142 1004.526,182 985.226,162"/>
            </g>
            <g className="lcd-element bottom-right">
              <polygon points="1102.001,283 1142.001,283 1145.493,183 1105.493,183"/>
              <polygon points="1145.493,183 1105.493,183 1126.19,163"/>
              <polygon points="1102.001,283 1142.001,283 1121.302,303"/>
            </g>
            <g className="lcd-element bottom-left">
              <polygon points="960.001,283 1000.001,283 1003.493,183 963.493,183"/>
              <polygon points="1003.493,183 963.493,183 984.19,163"/>
              <polygon points="960.001,283 1000.001,283 979.302,303"/>
            </g>
            <g className="lcd-element bottom-center">
              <polygon points="1099.569,324 1100.966,284 1120.267,304"/>
              <polygon points="1000.966,284 999.569,324 980.267,304"/>
              <polygon points="1099.569,324 999.569,324 1000.966,284 1100.966,284"/>
            </g>
          </g>
          <g className="second digit digit-2">
            <g className="lcd-element top-center">
              <polygon points="1321.485,40 1221.485,40 1222.882,0 1322.882,0"/>
              <polygon points="1321.485,40 1322.882,0 1342.185,20"/>
              <polygon points="1222.882,0 1221.485,40 1202.185,20"/>
            </g>
            <g className="lcd-element top-right">
              <polygon points="1318.958,141 1358.958,141 1362.45,41 1322.45,41"/>
              <polygon points="1362.45,41 1322.45,41 1343.149,21"/>
              <polygon points="1318.958,141 1358.958,141 1338.261,161"/>
            </g>
            <g className="lcd-element top-left">
              <polygon points="1176.958,141 1216.958,141 1220.45,41 1180.45,41"/>
              <polygon points="1220.45,41 1180.45,41 1201.149,21"/>
              <polygon points="1176.958,141 1216.958,141 1196.261,161"/>
            </g>
            <g className="lcd-element mid-center">
              <polygon points="1316.526,182 1216.526,182 1217.925,142 1317.925,142"/>
              <polygon points="1316.526,182 1317.925,142 1337.226,162"/>
              <polygon points="1217.925,142 1216.526,182 1197.226,162"/>
            </g>
            <g className="lcd-element bottom-right">
              <polygon points="1314.001,283 1354.001,283 1357.493,183 1317.493,183"/>
              <polygon points="1357.493,183 1317.493,183 1338.19,163"/>
              <polygon points="1314.001,283 1354.001,283 1333.302,303"/>
            </g>
            <g className="lcd-element bottom-left">
              <polygon points="1172.001,283 1212.001,283 1215.493,183 1175.493,183"/>
              <polygon points="1215.493,183 1175.493,183 1196.19,163"/>
              <polygon points="1172.001,283 1212.001,283 1191.302,303"/>
            </g>
            <g className="lcd-element bottom-center">
              <polygon points="1311.569,324 1312.966,284 1332.267,304"/>
              <polygon points="1212.966,284 1211.569,324 1192.267,304"/>
              <polygon points="1311.569,324 1211.569,324 1212.966,284 1312.966,284"/>
            </g>
          </g>
        </svg>
      </Container>
    );
  }
}

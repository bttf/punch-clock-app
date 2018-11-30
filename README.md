# punch-clock

> An electron app that allows you to clock the time you spend working on projects

![](/assets/punch-clock-01.png?raw=true)

This project was motivated by the need to measure how much time I spend on programming projects, for example making sure I spend at least an hour a day on some.

## Download

Check out the releases page for the latest builds

https://github.com/bttf/punch-clock/releases

## Quick how-to
1. Open the app
1. Create a project
2. Optionally enter a memo to describe how your time will be spent
3. Hit Start!

You can start, pause, resume, and stop the clock. If the app is closed without stopping the clock, it will 'keep counting', and remain in progress when re-opened (there are no background jobs, as the app utilizes timestamps to measure time elapsed). If the app is closed after pausing the clock, it will treat it as if you stopped the clock.

Logs of previous timings will appear in the left-hand window, and can be individually deleted using the delete link when hovering your cursor over them.

This was built with electron and React, and utilizes the local filesystem to create `.timecard` files that store your data.

## Wanted features

- Ability to modify existing time logs (+/- time)
- More control around `.timecard` file (import, export, edit path)
- Use \~the cloud\~ (eventually)

## Getting Started

```bash
git clone https://github.com/bttf/punch-clock.git
cd punch-clock

# install dependencies
yarn
```

### Development Scripts

```bash
# run application in development mode
yarn dev

# compile source code and create webpack output
yarn compile

# `yarn compile` & create build with electron-builder
yarn dist

# `yarn compile` & create unpacked build with electron-builder
yarn dist:dir
```

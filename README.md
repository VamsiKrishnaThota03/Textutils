# TextUtils

A small React app for converting text to UPPERCASE or lowercase, with a light/dark theme toggle.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)

## Overview

TextUtils is a beginner React project built with function components and hooks (`useState`). You paste or type text into a textarea and transform it with one click. It also shows component props, state lifting, routing and dismissable alerts.

## Features

- Convert the textarea contents to UPPERCASE or lowercase.
- A dark/light mode switch in the navbar. It changes the page background and the text color, and shows an alert that disappears after 1.5 seconds.
- An About page (`/about`) with Bootstrap accordion content and its own style toggle.
- Client-side routing with React Router.

## Tech stack

- React 18 (hooks)
- React Router 6
- Bootstrap 5

## Project structure

```
Textutils/
├── public/
└── src/
    ├── App.js              # theme state, alerts, routes
    └── components/
        ├── Navbar.js       # nav links + dark-mode switch
        ├── TextUpper.js    # textarea and case-conversion buttons
        ├── Alert.js
        └── About.js
```

## Getting started

### Prerequisites

- Node.js 16 or later and npm

### Install and run

```bash
git clone https://github.com/VamsiKrishnaThota03/Textutils.git
cd Textutils
npm install
npm start        # http://localhost:3000
```

Other scripts:

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run build` | Production build in `build/`     |
| `npm test`      | Run the CRA test runner          |

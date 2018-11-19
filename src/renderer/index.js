import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app';

const appContainer = document.createElement('div');
appContainer.id = 'app';
document.body.appendChild(appContainer);

ReactDOM.render(<App />, appContainer);

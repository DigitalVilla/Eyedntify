import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './sass/main.scss'

document.addEventListener("touchstart", function(){}, true);
ReactDOM.render(<App />, document.getElementById('root'));

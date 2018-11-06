import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './js/components/app';
import registerServiceWorker from './js/registerServiceWorker';
import styles from './styles/main.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

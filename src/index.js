import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let model = { clicks: 5 };

ReactDOM.render(<App clicks={ model.clicks } />, document.getElementById('root'));
registerServiceWorker();

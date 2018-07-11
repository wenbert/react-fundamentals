import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';

let model = { clicks: 0 };

function render() {
    ReactDOM.render(<AuthorQuiz />,
        document.getElementById('root')
    );
}
render();
registerServiceWorker();

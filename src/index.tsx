import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'styled-components/macro';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

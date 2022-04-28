import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './UI/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Could not find root element.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { ThemeProvider } from './context/ThemeContext';
import { TodosProvider } from './context/TodosContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

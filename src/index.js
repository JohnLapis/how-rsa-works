import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TodoList from './TodoList';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);

setTimeout(() => {
  const slidesContainer = document.querySelector('#slides');
  window.s = slidesContainer;
  slidesContainer.parentNode.removeChild(slidesContainer);
}, 1000);

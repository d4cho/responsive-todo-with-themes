import React, { useEffect } from 'react';
import styles from './TodoItem.module.css';

import { ReactComponent as CheckSVG } from '../assets/images/icon-check.svg';
import { ReactComponent as CrossSVG } from '../assets/images/icon-cross.svg';
import { useThemeContext } from '../context/ThemeContext';
import { useTodosContext } from '../context/TodosContext';

const TodoItem = ({ filter }) => {
  const { darkTheme } = useThemeContext();

  const {
    todos,
    deleteTodo,
    toggleTodoCompleted,
    getTodos
  } = useTodosContext();

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTodos = () =>
    todos
      .filter((todo) => {
        if (filter === 'active') {
          return todo.completed === false;
        } else if (filter === 'completed') {
          return todo.completed === true;
        } else {
          return todo;
        }
      })
      .map((todo) => (
        <div
          key={todo.id}
          className={darkTheme ? styles.darkContainer : styles.lightContainer}>
          <span
            className={todo.completed ? styles.circleCompleted : styles.circle}
            onClick={() => toggleTodoCompleted(todo._id, !todo.completed)}>
            {todo.completed && <CheckSVG />}
          </span>
          <div className={styles.text}>{todo.text}</div>
          <span className={styles.cross} onClick={() => deleteTodo(todo._id)}>
            <CrossSVG />
          </span>
        </div>
      ));

  return renderTodos();
};

export default TodoItem;

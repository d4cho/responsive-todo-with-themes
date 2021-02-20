import React, { useState } from 'react';

import styles from './CreateTodo.module.css';
import { useThemeContext } from '../context/ThemeContext';
import { useTodosContext } from '../context/TodosContext';

const CreateTodo = () => {
  const [text, setText] = useState('');

  const { darkTheme } = useThemeContext();
  const { addTodo } = useTodosContext();

  const onSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      text
    };

    addTodo(newTodo);

    setText('');
  };

  return (
    <form style={{ width: '100%' }} onSubmit={onSubmit}>
      <input
        className={darkTheme ? styles.darkInput : styles.lightInput}
        type='text'
        placeholder='Create a new todo...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default CreateTodo;

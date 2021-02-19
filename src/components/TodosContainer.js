import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import styles from './TodosContainer.module.css';
import { useThemeContext } from '../context/ThemeContext';
import { useTodosContext } from '../context/TodosContext';
import TodoItem from './TodoItem';

const TodosContainer = () => {
  const [filter, setFilter] = useState('all');
  const selected = { color: 'blue' };

  const { darkTheme } = useThemeContext();
  const { todos, deleteCompletedTodos } = useTodosContext();

  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  const handleFilterChange = (option) => {
    setFilter(option);
  };

  return (
    <div className={styles.container}>
      <div
        className={
          darkTheme ? styles.darkTodosContainer : styles.lightTodosContainer
        }>
        <TodoItem filter={filter} />
      </div>
      <div className={darkTheme ? styles.darkFoot : styles.lightFoot}>
        <div>{todos.length} Todos</div>
        {!isMobile && (
          <div className={styles.views}>
            <div
              style={filter === 'all' ? selected : null}
              onClick={() => handleFilterChange('all')}>
              All
            </div>
            <div
              style={filter === 'active' ? selected : null}
              onClick={() => handleFilterChange('active')}>
              Active
            </div>
            <div
              style={filter === 'completed' ? selected : null}
              onClick={() => handleFilterChange('completed')}>
              Completed
            </div>
          </div>
        )}

        <div className={styles.clear} onClick={() => deleteCompletedTodos()}>
          Clear Completed
        </div>
      </div>
      {isMobile && (
        <div
          className={
            darkTheme ? styles.viewsMobileDark : styles.viewsMobileLight
          }>
          <div
            style={filter === 'all' ? selected : null}
            onClick={() => handleFilterChange('all')}>
            All
          </div>
          <div
            style={filter === 'active' ? selected : null}
            onClick={() => handleFilterChange('active')}>
            Active
          </div>
          <div
            style={filter === 'completed' ? selected : null}
            onClick={() => handleFilterChange('completed')}>
            Completed
          </div>
        </div>
      )}
    </div>
  );
};

export default TodosContainer;

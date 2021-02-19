import React, { createContext, useContext, useState } from 'react';

// inital state
const intialState = [
  { id: 1, text: 'Practice coding', completed: true },
  { id: 2, text: 'Play league', completed: false },
  { id: 3, text: 'Take a shower', completed: true }
];

// create context
const TodosContext = createContext();

// export context hook
export function useTodosContext() {
  return useContext(TodosContext);
}

// provider component
export function TodosProvider({ children }) {
  const [todos, setTodos] = useState(intialState);

  // actions
  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function toggleTodoCompleted(id) {
    const newTodos = [...todos];
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    setTodos(newTodos);
  }

  function addTodo(todo) {
    const newTodos = [...todos];
    newTodos.push(todo);
    setTodos(newTodos);
  }

  function deleteCompletedTodos() {
    const newTodos = todos.filter((todo) => todo.completed === false);
    setTodos(newTodos);
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        deleteTodo,
        toggleTodoCompleted,
        addTodo,
        deleteCompletedTodos
      }}>
      {children}
    </TodosContext.Provider>
  );
}

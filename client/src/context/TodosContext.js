import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// inital state
const intialState = [];

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
  async function getTodos() {
    try {
      const response = await axios.get('/api/todos');
      const todos = response.data.data;
      setTodos(todos);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`/api/todos/${id}`);
      const newTodos = todos.filter((todo) => todo._id !== id);
      setTodos(newTodos);
    } catch (err) {
      console.log(err);
    }
  }

  async function addTodo(todo) {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    try {
      const response = await axios.post('/api/todos', todo, config);
      const newTodos = [...todos];
      newTodos.push(response.data.data);
      setTodos(newTodos);
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleTodoCompleted(id, completed) {
    try {
      await axios.patch(`/api/todos/${id}`, { completed });

      const newTodos = [...todos];
      const index = newTodos.findIndex((todo) => todo._id === id);
      newTodos[index].completed = completed;
      setTodos(newTodos);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCompletedTodos() {
    try {
      await axios.delete('/api/todos', { params: { todoType: 'completed' } });

      const newTodos = todos.filter((todo) => todo.completed === false);
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        deleteTodo,
        toggleTodoCompleted,
        addTodo,
        deleteCompletedTodos,
        getTodos
      }}>
      {children}
    </TodosContext.Provider>
  );
}

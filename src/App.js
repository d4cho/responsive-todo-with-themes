import styles from './App.module.css';
import { useThemeContext } from './context/ThemeContext';
import Header from './components/Header';
import CreateTodo from './components/CreateTodo';
import TodosContainer from './components/TodosContainer';

const App = () => {
  const { darkTheme } = useThemeContext();

  return (
    <div className={darkTheme ? styles.darkContainer : styles.lightContainer}>
      <div className={darkTheme ? styles.darkImage : styles.lightImage}></div>
      <div className={styles.listContainer}>
        <Header />
        <CreateTodo />
        <TodosContainer />
        <span className={styles.text}>My Todo List</span>
      </div>
    </div>
  );
};

export default App;

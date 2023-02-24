import { useRoutes } from 'react-router-dom';
import Router from './router';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  const elements = useRoutes(Router);
  return elements;
}

export default App;

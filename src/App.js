import Router from './router';
import { useRoutes } from 'react-router-dom';

function App() {
  const elements = useRoutes(Router);
  return elements;
}

export default App;

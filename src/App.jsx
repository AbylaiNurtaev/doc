import Layout from './components/Layout/Layout';
import logo from './logo.svg';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

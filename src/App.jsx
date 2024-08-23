import Layout from './components/Layout/Layout';
import logo from './logo.svg';
import { Route, Routes, Link, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ArticlePage from './pages/ArticlePage/ArticlePage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}></Route>
          <Route path='/article/:title' element={<ArticlePage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

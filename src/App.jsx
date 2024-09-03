import Layout from './components/Layout/Layout';
import logo from './logo.svg';
import { Route, Routes, Link, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import AdminPage from './pages/AdminPage/AdminPage';
import AArticles from './pages/AArticles/AArticles';
import OfferPage from './pages/OfferPage/OfferPage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}></Route>
          <Route path='/article/:title' element={<ArticlePage/>}></Route>
        </Route>
        <Route path='/admin' element={<AdminPage/>}></Route>
        <Route path='/offer' element={<OfferPage/>}></Route>
        <Route path='/admin/AArticles' element={<AArticles/>}></Route>
        <Route path='/admin/AArticles/:title' element={<AArticles/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

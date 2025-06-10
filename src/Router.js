import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './components/Mainpage';

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          </Routes>
    </BrowserRouter>
  );
};


export default Router;
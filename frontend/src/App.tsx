import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/screen/header/Header';
import AboutUs from './pages/aboutUs/AboutUs';
import Home from './pages/home/Home';
import Statistics from './pages/statistics/Statistics';
import Search from './pages/search/Search';
import Login from './pages/authorization/Authorization';
import Footer from './components/screen/footer/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import AddPage from './pages/add/AddPage';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/editProfile/EditProfile';
import { useState } from 'react';
import UpBtn from './components/ui/upBtn/UpBtn';

function App() {
  const { authUser } = useAuthContext();

  const [isMainVisible, setIsMainVisible] = useState<boolean>(true);

  const handleVisibility = (isVisible: boolean) => {
    setIsMainVisible(isVisible);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={authUser ? <Header /> : null}>
          <Route
            path=''
            element={
              authUser ? (
                <Home handleVisibility={handleVisibility} />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            path='about-us'
            element={<AboutUs handleVisibility={handleVisibility} />}
          />
          <Route path='statistics' element={<Statistics handleVisibility={handleVisibility} />} />
          <Route
            path='search'
            element={<Search handleVisibility={handleVisibility} />}
          />
          <Route path='add' element={<AddPage handleVisibility={handleVisibility} />} />
          <Route
            path='login'
            element={authUser ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='signup'
            element={authUser ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='forgot-password'
            element={authUser ? <Navigate to='/' /> : <Login />}
          />
          <Route path='profile' element={<Profile handleVisibility={handleVisibility} />} />
          <Route path='edit-profile/' element={<EditProfile handleVisibility={handleVisibility} />} />
        </Route>
      </Routes>
      <Toaster />
      {authUser ? <Footer /> : null}
      {authUser ? <UpBtn isMainVisible={isMainVisible} /> : null}
    </BrowserRouter>
  );
}

export default App;

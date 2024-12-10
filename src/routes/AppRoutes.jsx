
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Home';
import HomeUser from '../pages/HomeUser';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homeuser" element={<HomeUser />} />
      </Routes>
   
  );
};

export default AppRoutes;

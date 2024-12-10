
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Home';
import Home from '../pages/Home';
import CourseList from '../components/CourseList';
import CourseDetail from '../components/CourseDetail';

const AppRoutes = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coursesuser" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
   
  );
};

export default AppRoutes;

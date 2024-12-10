import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Home';
import HomeUser from '../pages/HomeUser';
import Home from '../pages/Home';
import CourseList from '../components/CourseList';
import CourseDetail from '../components/CourseDetail';
import ProjectList from '../components/ProjectList';
import ProjectDetail from '../components/ProjectDetail';
import Comment from '../components/Comment';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/home" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/homeuser" element={<HomeUser />} />
			<Route path="/coursesuser" element={<CourseList />} />
			<Route path="/course/:id" element={<CourseDetail />} />
			<Route path="/projectuser" element={<ProjectList />} />
			<Route path="//project/:id" element={<ProjectDetail />} />
			<Route path="comment" element={<Comment />} />
		</Routes>
	);
};

export default AppRoutes;

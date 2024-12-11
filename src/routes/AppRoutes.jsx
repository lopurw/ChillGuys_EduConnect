import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import MyCourses from '../components/MyCourses';
import NavProfile from '../components/NavProfile';
import HomeEmployer from '../pages/HomeEmployer';
import VacancyDetail from '../components/VacancyDetail';
import AddVacancy from '../components/AddVacancy';
import EditVacancy from '../components/EditVacancy';
import VacancyList from '../components/VacancyList';
import HomeTeacher from '../pages/HomeTeacher';
import AddCoursePage from '../components/AddCoursePage'; // Import the AddCoursePage component

const AppRoutes = () => {
	const isAuthenticated = Boolean(localStorage.getItem('token')); // Check for authentication

	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/home" element={<Home />} />

			{/* Conditional rendering based on authentication */}
			{!isAuthenticated ? (
				<>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</>
			) : (
				<>
					<Route path="/homeuser" element={<HomeUser />} />
					<Route path="/coursesuser" element={<CourseList />} />
					<Route path="/course/:id" element={<CourseDetail />} />
					<Route path="/projectuser" element={<ProjectList />} />
					<Route path="/project/:id" element={<ProjectDetail />} />
					<Route path="/comment" element={<Comment />} />
					<Route path="/mycourses" element={<MyCourses />} />
					<Route path="/myprofile" element={<NavProfile />} />
					<Route path="/homeemployer" element={<HomeEmployer />} />
					<Route path="/vacancy/edit/:id" element={<EditVacancy />} />
					<Route path="/vacancy/:id" element={<VacancyDetail />} />
					<Route path="/addvacancy" element={<AddVacancy />} />
					<Route path="/vacancylist" element={<VacancyList />} />
					<Route path="/hometeacher" element={<HomeTeacher />} />
					{/* Add route for adding a course */}
					<Route path="/addcourse" element={<AddCoursePage />} /> {/* This is the new route */}
				</>
			)}

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default AppRoutes;

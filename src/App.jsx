
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<div className="App">
				<Navbar></Navbar>
				<AppRoutes />

			</div>
		</Router>
	);
};

export default App;
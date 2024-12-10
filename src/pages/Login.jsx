import classes from '../styles/Login.module.css';

const Login = () => {
	return (
		<div>
			{/* <h1>Login Page</h1> */}
			{/* Форма авторизации */}
			<form>
				<input type="email" placeholder="Почта" />
				<input type="password" placeholder="Пароль" />
				<button className={classes.button} type="submit">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;



const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      {/* Форма авторизации */}
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;



const Register = () => {
  return (
    <div>
      <h1>Register Page</h1>
      {/* Форма регистрации */}
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

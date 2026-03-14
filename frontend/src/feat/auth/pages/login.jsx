
const Login = () => (
  <main className="auth-page">
    <div className="auth-card">
      <div className="auth-card__header">
        <span className="auth-card__tag">Welcome Back</span>
        <h1 className="auth-card__title">Sign In</h1>
        <p className="auth-card__subtitle">Good to have you back</p>
      </div>
      <form className="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Your password" required />
        </div>
        <button type="submit" className="btn-primary">Sign In</button>
      </form>
      <p className="auth-card__footer">No account yet? <a href="/register">Register</a></p>
    </div>
  </main>
)
export default Login;
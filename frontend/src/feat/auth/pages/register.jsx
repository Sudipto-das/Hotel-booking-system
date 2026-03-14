// Register.jsx
const Register = () => (
  <main className="auth-page">
    <div className="auth-card">
      <div className="auth-card__header">
        <span className="auth-card__tag">Welcome</span>
        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Join us for an unforgettable stay</p>
      </div>
      <form className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="e.g. john_doe" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Min. 8 characters" required minLength={8} />
        </div>
        <button type="submit" className="btn-primary">Register</button>
      </form>
      <p className="auth-card__footer">Already have an account? <a href="/login">Sign in</a></p>
    </div>
  </main>
);


export default Register;
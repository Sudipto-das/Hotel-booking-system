
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Loader from "../../../components/Loader/Loader";

const Login = () => {
  const { handleLogin, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from state, default to /dashboard
  const from = location.state?.from || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(formData.email, formData.password);
      // Navigate to the original destination or default to /dashboard
      navigate(from, { replace: true });

    } catch (err) {
      console.error("Login error:", err);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-card__tag">Welcome Back</span>
          <h1 className="auth-card__title">Sign In</h1>
          <p className="auth-card__subtitle">Good to have you back</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Your password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-primary" >{loading ? <Loader /> : "Sign In"}</button>
        </form>
        <p className="auth-card__footer">No account yet? <a href="/register">Register</a></p>
      </div>
    </main>
  )
}
export default Login;
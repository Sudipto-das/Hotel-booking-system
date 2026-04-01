// Register.jsx

import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Loader from "../../../components/Loader/Loader";
const Register = () => {


  const { handleRegister, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
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
      await handleRegister(formData.username, formData.email, formData.password);
    } catch (err) {
      console.error("Registration error:", err);
    }


  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-card__tag">Welcome</span>
          <h1 className="auth-card__title">Create Account</h1>
          <p className="auth-card__subtitle">Join us for an unforgettable stay</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="e.g. john_doe" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Min. 8 characters" onChange={handleChange} required minLength={8} />
          </div>
          <button type="submit" className="btn-primary">{loading ? <Loader /> : "Register"}</button>
        </form>
        <p className="auth-card__footer">Already have an account? <a href="/">Sign in</a></p>
      </div>
    </main>
  )
};


export default Register;
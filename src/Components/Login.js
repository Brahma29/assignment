import React from "react";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({email : "", password : ""});
  const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email : credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
          //redirect
          localStorage.setItem('token', json.authToken);
          props.showAlert("Logged In Successfully", "success")
          navigate("/");
      }
      else{
        props.showAlert("Invalid Credentials", "danger")
      }
      }
      const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container">
        <h1 className="text-center my-3 text-white" style={{fontSize : "59px"}}>LogIn</h1>
        <div className="card mx-auto my-5 bg-dark" style={{width : "30rem"}}>
            <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name = "email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-white">
            Password
          </label>
          <input
            type="password"
            name = "password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            id="password"
          />
        </div>
        <button type="submit"  className="btn btn-primary">
          Submit
        </button>
        <Link type="button" className="btn btn-primary mx-3" to="/signup">Create Account</Link>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Login;

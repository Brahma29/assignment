import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup(props) {

  const [credentials, setCredentials] = useState({firstName : "", lastName : "", email : "",phone : "", address : "", password : ""});
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {firstName, lastName, email, password, address, phone} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({firstName, lastName, email, phone, address, password})
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
      //redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert("Account Created Successfully", "success")
      navigate("/");
  }
  else{
    props.showAlert("Enter Valid details", "danger")
  }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <>
    <h1 className="text-white text-center" style={{fontSize : "59px", marginTop : "-2%"}}>Sign Up</h1>
    <div
      className="container" 
      style={{ height: "75vh", paddingLeft: "16%", paddingTop : "1rem" }}
    >
      <div className="card bg-dark text-white" style={{ width: "45rem"}}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex">
              <label htmlFor="firstName" className="form-label w-25">
               First Name
              </label>
              <input
                type="text"
                className="form-control w-50 h-25"
                id="firstName"
                aria-describedby="firstName"
                onChange={onChange}
                name = "firstName"
                style={{marginLeft : "-5%"}}
              />
              <label htmlFor="exampleInputEmail1" className="form-label w-25" style={{marginLeft : "3%"}} >
                Last Name
              </label>
              <input
                type="text"
                className="form-control w-50 h-25"
                id="lastName"
                aria-describedby="lastName"
                name = "lastName"
                onChange={onChange}
                style={{marginLeft : "-5%"}}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-Mail
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name = "email"
                aria-describedby="emailHelp"
                onChange={onChange}Name
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name = "phone"
                aria-describedby="phone"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name = "address"
                aria-describedby="address"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name = "password"
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/login" className="btn btn-primary mx-3">LogIn</Link>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Signup;

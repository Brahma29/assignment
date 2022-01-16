import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';


const Dashboard = () => {
    const [credentials, setCredentials] = useState({});
    const [firstName, setFirstName] = useState("")
    const navigate = useNavigate();

    const getData = async ()=>{
            const response = await fetch("http://localhost:5000/api/auth/getUser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token" : localStorage.getItem('token')
                }
            });
            const data = await response.json()
          setCredentials(data);
          const {firstName:fName}=data;
          fName ? navigate("/"):navigate("/login") 
           
    }
    useEffect(() => {
        if(!localStorage.getItem('authToken')){
            getData();
        }else{
            navigate("/login")
        }
    }, [])


    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate("/login");
    } 
    
  return (
    <>
      <h1 className="my-3 text-center text-white" style={{ fontSize: "50px" }}>
        User Details
      </h1>
      <div className="my-4">
        <div
          class="card mx-auto"
          style={{ width: "50rem", height: "24rem", background: "#03071e" }}
        >
          <div class="card-body text-white d-flex">
              <div className="imageUser my-4">
              <i class="fas fa-user-circle fa-10x mx-5 my-4"></i>
              </div>
              <div className="d-flex flex-column">
            <h5 class="card-title mt-5" style={{fontSize : "25px"}}>Name : {credentials.firstName +" "+ credentials.lastName}</h5>
            <h5 class="card-title mt-2" style={{fontSize : "25px"}}>E-mail : {credentials.email} </h5>
            <h5 class="card-title mt-2" style={{fontSize : "25px"}}>Phone : {credentials.phone}</h5>
            <h5 class="card-title mt-2" style={{fontSize : "25px"}}>Address : {credentials.address} </h5>
            </div>
          </div>
            <div className="d-flex justify-content-end">
                <a className="btn btn-info mb-4 mx-5" onClick={handleLogout}>Log Out</a>
            </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

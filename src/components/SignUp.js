import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SignUp = () => {

    const [userDetails, setuserDetails] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify({ name: userDetails.name, email: userDetails.email, password: userDetails.password })

        });

        const json = await response.json();
        console.log(json)

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.AuthToken);
            history.push("/home");

        }
        else {
            
            alert("Invalid credentials");
         
        }
    }

    const onChange = (e) => {
        setuserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }


    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="name" >Full Name</label>
                    <input type="name" className="form-control my-1 " id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" required/>

                </div>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control my-1 " id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" required/>

                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control my-1" id="password" name="password" onChange={onChange} placeholder="Password" minLength={5} required />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="Password" className="form-control my-1" id="confirmPassword" name="confirmPassword" onChange={onChange} placeholder="Confirm Password" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary my-2" >Submit</button>
            </form>
        </div>
    )
}

export default SignUp

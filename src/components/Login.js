import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [userDetails, setuserDetails] = useState({ email: "", password: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify({ email: userDetails.email, password: userDetails.password })

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
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={userDetails.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={userDetails.password} onChange={onChange} id="password" name="password" required />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login

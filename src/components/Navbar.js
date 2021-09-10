import React from 'react'
import { Link , useLocation} from 'react-router-dom'

function Navbar() {
  
    let location = useLocation();
    React.useEffect(() => {
     console.log(location.pathname)
    }, [location]);


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">EnoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {/* Added uselocation | when we click on Navbar Home button then Home button will become Active and same as for others*/}

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home"? "active ": " "}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about"? "active ": " "}`} to="/about">about</Link>
                            </li>
                            
                           
                        </ul>
                        <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="SignUp" role="button">SignUp</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

import React from 'react'
import Logo1 from '../images/newlogo.png'
import { NavLink } from "react-router-dom";

// IMPORT THAT FROM APP 
import { UserContext } from '../App'
import { useContext } from 'react'

export const Navbar = (props) => {

    const mystyles = {
        backgroundColor: "rgb(34, 194, 42)",
        display: "block"
    }

    // USE CONTEXT 
    const { state, dispatch } = useContext(UserContext)
    console.log(state);

    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/">
                            <h5>
                                Dashboard
                            </h5>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/myprofile">
                            <h5>
                                My Profile
                            </h5>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/tandc">
                            <h5>
                                Terms and Conditions
                            </h5>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/Aboutus">
                            <h5>
                                About Us
                            </h5>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/userSignout">
                            <h5>
                                Signout
                            </h5>
                        </NavLink>
                    </li>
                </>
            )
        }
        else {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/">
                            <h5>
                                Dashboard
                            </h5>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/myprofile">
                            <h5>
                                My Profile
                            </h5>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/tandc">
                            <h5>
                                Terms and Conditions
                            </h5>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/Aboutus">
                            <h5>
                                About Us
                            </h5>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/userSignin">
                            <h5>
                                Signin
                            </h5>
                        </NavLink>
                    </li>
                </>
            )
        }
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark " style={mystyles}>
                <div className="container-fluid">
                    <img src={Logo1} className=" img-responsive mx-3 my-0.5" style={{ height: "45px" }} />
                    <NavLink className="navbar-brand" to="#">Bit-Chat</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <RenderMenu/>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">
                                    <h5>
                                        Dashboard
                                    </h5>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/myprofile">
                                    <h5>
                                        My Profile
                                    </h5>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/tandc">
                                    <h5>
                                        Terms and Conditions
                                    </h5>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" to="/Aboutus">
                                    <h5>
                                        About Us
                                    </h5>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" to="/userSignin">
                                    <h5>
                                        Signin
                                    </h5>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" to="/userSignout">
                                    <h5>
                                        Signout
                                    </h5>
                                </NavLink>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

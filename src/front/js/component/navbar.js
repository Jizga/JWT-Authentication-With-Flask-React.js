import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/navbar.scss";

export const Navbar = () => {
	const { actions } = useContext(Context);
	return (
		<nav className="navbar navbar-dark bg-dark mb-3 myNavbar">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<i className="fas fa-home ml-5 fa-2x" />
				</span>
			</Link>
			<div>
				<Link to="/login">
					<span className="navbar-brand mb-0 h1 mr-5">Login</span>
				</Link>
				<Link to="/sign_up">
					<span className="navbar-brand mb-0 h1 mr-5">Sign Up</span>
				</Link>
				<Link to="/login">
					<span className="navbar-brand mb-0 h1 mr-5" onClick={() => actions.logOutUser()}>
						Log Out
					</span>
				</Link>
			</div>
		</nav>
	);
};

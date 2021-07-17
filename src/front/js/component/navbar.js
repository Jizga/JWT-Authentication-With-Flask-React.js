import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div>
				<Link to="/login">
					<span className="navbar-brand mb-0 h1">Login</span>
				</Link>
				<Link to="/sign_up">
					<span className="navbar-brand mb-0 h1">Sign Up</span>
				</Link>
				<Link to="/login">
					<button className="btn btn-outline-primary" onClick={() => actions.logOutUser()}>
						Log Out
					</button>
				</Link>
			</div>
		</nav>
	);
};

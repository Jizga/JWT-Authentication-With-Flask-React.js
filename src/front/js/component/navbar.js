import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link>
			</div>
			<div>
				<Link to="/login">
					<span className="navbar-brand mb-0 h1">Login</span>
				</Link>
				<Link to="/sing_up">
					<span className="navbar-brand mb-0 h1">Sing Up</span>
				</Link>
			</div>
		</nav>
	);
};

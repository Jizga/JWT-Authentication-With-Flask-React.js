import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Login = () => {
	const { actions } = useContext(Context);
	let history = useHistory();

	const [formValue, setFormValue] = useState({
		email: "",
		password: ""
	});

	//Función para recoger los cambios en los inputs
	const inputHandelChange = e => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	const handlerSubmit = e => {
		// Para que el formulario no se envíe al iniciar la vista
		e.preventDefault();
		// Función de logueo
		actions.signInUser(formValue);
	};

	// Ir al home una vez logueado
	if (actions.isUserAuthentificted()) {
		history.push("/private");
	}

	return (
		<div className="container row text-center mt-5  d-flex justify-content-center">
			<h1 className="col-6">Login</h1>
			<form onSubmit={handlerSubmit} className="col-6 p-5 mt-3 myBox text-white">
				<div className="form-grup row mt-2">
					<label htmlFor="email" className="col-4">
						Email
					</label>
					<input
						className="col-6"
						type="email"
						name="email"
						id="email"
						placeholder="example@gamil.com"
						onChange={inputHandelChange}
						required
					/>
				</div>
				<div className="form-grup row mt-2">
					<label htmlFor="password" className="col-4">
						Password
					</label>
					<input
						className="col-6"
						type="password"
						name="password"
						placeholder="Enter yor password"
						onChange={inputHandelChange}
						required
					/>
				</div>
				<div>
					<button type="submit" className="btn btn-outline-primary btn-lg btn-block  mt-4">
						Sign in
					</button>
				</div>
			</form>
		</div>
	);
};

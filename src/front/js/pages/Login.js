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
		history.push("/");
	}

	return (
		<div className="container bg-warning pt-3">
			<form onSubmit={handlerSubmit}>
				<div className="form-grup">
					<label htmlFor="email"> Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="example@gamil.com"
						onChange={inputHandelChange}
						required
					/>
				</div>
				<div className="form-grup">
					<label htmlFor="password"> password </label>
					<input
						type="password"
						name="password"
						placeholder="Enter yor password"
						onChange={inputHandelChange}
						required
					/>
				</div>
				<div>
					<button type="submit" className="btn btn-success">
						Sign in
					</button>
				</div>
			</form>
		</div>
	);
};

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// URL del backend
import { API_BASE_URL } from "../constants";

export const SignUp = () => {
	// Para ir al home tras habernos registrado
	let history = useHistory();
	const [formValue, setFormValue] = useState({
		name: "",
		lastName: "",
		email: "",
		password: ""
	});

	//Función para recoger los cambios en los inputs
	const inputHandelChange = e => {
		//"[e.target.name]" corresponde a los name de los inputs del form"
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	const handlerSubmit = e => {
		// Para que el formulario no se envíe al iniciar la vista
		e.preventDefault();

		// Crear el nuevo usuario --->>> Se envía directamente a la DB,
		// por eso no hace falta guardarlo en el Flux
		const raw = JSON.stringify(formValue);

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: raw,
			redirect: "follow"
		};

		fetch(`${API_BASE_URL}/api/sign_up`, requestOptions)
			.then(response => response.json())
			.then(result => {
				console.log("New user was created: ", result);
				// Para ir al home tras habernos registrado
				history.push("/");
			})
			.catch(error => console.log("error", error));
	};

	return (
		<div className="container row text-center mt-5  d-flex justify-content-center">
			<h1 className="col-6">Sing Up</h1>
			<form onSubmit={handlerSubmit} className="col-6 p-5 mt-3 myBox text-white">
				<div className="form-grup row">
					<label htmlFor="name" className="col-4">
						Name
					</label>
					<input
						className="col-6"
						type="text"
						name="name"
						id="name"
						placeholder="Enter your name"
						onChange={inputHandelChange}
						required
					/>
				</div>
				<div className="form-grup row mt-2">
					<label htmlFor="lastName" className="col-4">
						Last Name
					</label>
					<input
						className="col-6"
						type="text"
						name="lastName"
						id="lastName"
						placeholder="Enter your last name"
						onChange={inputHandelChange}
						required
					/>
				</div>
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
						password
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
						Sign up
					</button>
				</div>
			</form>
		</div>
	);
};

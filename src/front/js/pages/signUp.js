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
		<div className="container bg-warning pt-3">
			<form onSubmit={handlerSubmit}>
				<div className="form-grup">
					<label htmlFor="name"> Name</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Enter your name"
						onChange={inputHandelChange}
						required
					/>
				</div>
				<div className="form-grup">
					<label htmlFor="lastName"> Last Name</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						placeholder="Enter your last name"
						onChange={inputHandelChange}
						required
					/>
				</div>
				<div className="form-grup">
					<label htmlFor="email"> Email</label>
					<input
						t
						ype="email"
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
						Sign up
					</button>
				</div>
			</form>
		</div>
	);
};

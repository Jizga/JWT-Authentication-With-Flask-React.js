import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

export const SingUp = () => {
	const { store, actions } = useContext(Context);
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

	console.log(formValue);

	const handlerSubmit = e => {
		console.log(e);
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
						Sing up
					</button>
				</div>
			</form>
		</div>
	);
};

import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Private = () => {
	const { store } = useContext(Context);

	// Necesito hacer una ternaria porque por una décima de segundo el store está vacío hasta que se rellena
	// con los datos del localStorage tras la recarga

	return (
		<div className="container bg-warning pt-3">
			<h1> Welcome at your profile {store.user ? store.user.user.name : null}</h1>
			<div>
				<h4>Name: {store.user ? store.user.user.name : null}</h4>
				<h4>Last name: {store.user ? store.user.user.last_name : null}</h4>
				<h4>Email: {store.user ? store.user.user.email : null}</h4>
			</div>
		</div>
	);
};

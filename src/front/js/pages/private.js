import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/private.scss";

export const Private = () => {
	const { store } = useContext(Context);

	// Necesito hacer una ternaria porque por una décima de segundo el store está vacío hasta que se rellena
	// con los datos del localStorage tras la recarga

	return (
		<div className="container pt-3 mt-5 myProfile">
			<div className="row cont">
				<h1 className="col-12"> Welcome at your profile {store.user ? store.user.user.name : null}</h1>
				<div className="col-11 text-white p-5 myInfo">
					<div className="row mt-2">
						<h4 className="col-4">Name: </h4>
						<h4 className="col-4">{store.user ? store.user.user.name : null}</h4>
					</div>
					<div className="row mt-2">
						<h4 className="col-4">Last name:</h4>
						<h4 className="col-4">{store.user ? store.user.user.last_name : null}</h4>
					</div>
					<div className="row mt-2">
						<h4 className="col-4">Email:</h4>
						<h4 className="col-4">{store.user ? store.user.user.email : null}</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

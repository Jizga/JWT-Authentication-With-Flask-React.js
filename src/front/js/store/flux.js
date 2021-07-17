// URL del backend
import { API_BASE_URL } from "../constants";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: []
		},
		actions: {
			signInUser: userValues => {
				// Estructura del método POST de Postman:
				// Se saca directamente del Postman
				const raw = JSON.stringify(userValues);

				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: raw,
					redirect: "follow"
				};

				fetch(`${API_BASE_URL}/api/sign_in`, requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log("User login");
						// El result es el token del usuario logueado
						setStore({ user: result });
					})
					.catch(error => console.log("error", error));
			}
		}
	};
};

export default getState;

// URL del backend
import { API_BASE_URL } from "../constants";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: []
		},
		actions: {
			singUpNewUser: userValues => {
				// Estructura del método POST de Postman:
				// Se saca directamente del Postman
				/*const raw = JSON.stringify(userValues);

				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: raw,
					redirect: "follow"
				};

				fetch(`${API_BASE_URL}/api/sign_up`, requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log("New user was created");

						usersList.push(result);

						setStore({ user:  });
					})
					.catch(error => console.log("error", error));*/
			}
		}
	};
};

export default getState;

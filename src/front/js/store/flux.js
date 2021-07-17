// URL del backend
import { API_BASE_URL } from "../constants";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			accessToken: null
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
					.then(data => {
						console.log("User login");
						console.log(data);
						setStore({ accessToken: data["access_token"], user: data });
					})
					.catch(error => console.log("error", error));
			},
			// Comprobar que el usuario está logueado
			isUserAuthentificted: () => {
				const store = getStore();
				return store.accessToken != null;
			}
		}
	};
};

export default getState;

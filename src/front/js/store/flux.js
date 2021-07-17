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
				const store = getStore();
				let localStoreUser;
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
						setStore({ accessToken: data["access_token"], user: data });

						localStoreUser = localStorage.setItem("store.user", JSON.stringify(store.user));
					})
					.catch(error => console.log("error", error));
			},
			// Comprobar que el usuario está logueado
			isUserAuthentificted: () => {
				const store = getStore();
				return store.accessToken != null;
			},
			getUserAuthentificted: () => {
				let logedUser = JSON.parse(localStorage.getItem("store.user"));

				if (logedUser) {
					setStore({ user: logedUser });
				}
			},
			logOutUser: () => {
				const store = getStore();

				store.user = null;
				localStorage.setItem("store.user", JSON.stringify(store.user));

				store.accessToken = null;
				localStorage.setItem("store.accessToken", JSON.stringify(store.accessToken));
			}
		}
	};
};

export default getState;

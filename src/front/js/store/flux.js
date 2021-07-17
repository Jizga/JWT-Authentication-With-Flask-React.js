// URL del backend
import { API_BASE_URL } from "../constants";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			user: null
		},
		actions: {
			signInUser: userValues => {
				const store = getStore();

				let newStore;
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
						newStore = data;

						setStore({ user: newStore });

						localStoreUser = localStorage.setItem("store.user", JSON.stringify(store.user));
					})
					.catch(error => console.log("error", error));
			},
			// Comprobar que el usuario está logueado
			isUserAuthentificted: () => {
				const store = getStore();
				return store.user != null;
			},
			getUserAuthentificted: () => {
				let logedUser = JSON.parse(localStorage.getItem("store.user"));

				if (logedUser) {
					// Rellena el store con la información del localStorage
					setStore({ user: logedUser });
				}
			},
			logOutUser: () => {
				const store = getStore();
				store.user = null;
				localStorage.clear();
			}
		}
	};
};

export default getState;

import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = React.createContext({});

const App = ({ Component, pageProps }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [uid, setUid] = useState("");

	useEffect(() => {
		const cookieValue = Cookies.get("UID");
		setUid(cookieValue);

		if (!cookieValue) {
			setIsLoggedIn(false);
		} else {
			setIsLoggedIn(true);
		}
	}, []);
	return (
		<UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, uid, setUid }}>
			<Component {...pageProps} />
		</UserContext.Provider>
	);
};

export default App;

import React, { useContext, useState } from "react";
import Link from "next/link";
import styles from "../styles/login.module.css";
import Navbar from "../components/nav.component";
import { UserContext } from "./_app";
import Cookies from "js-cookie";

const Register = () => {
	const { setIsLoggedIn, setUid } = useContext(UserContext);

	const [UserName, setUserName] = useState("");
	const [Password, setPassword] = useState("");
	const [isError, setIsError] = useState(false);
	const [alertText, setAlertText] = useState("");
	const [isAlert, setIsAlert] = useState(false);

	const handleUsernameChange = (e) => {
		setUserName(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleRegister = async (event) => {
		event.preventDefault();
		setIsAlert(false);
		setAlertText("");
		setIsError(false);

		try {
			const response = await fetch("http://localhost:3000/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: UserName,
					password: Password,
				}),
			});
			const json = await response.json();

			if (response.ok) {
				Cookies.set("UID", json.uid, { expires: 4 });
				setIsLoggedIn(true);
				setUid(json.uid);
				setIsAlert(true);
				setAlertText("Registration is Successful");
			} else {
				setIsError(true);
				setIsAlert(true);
				setAlertText(json.error);
			}
		} catch (error) {
			setIsError(true);
			setIsAlert(true);
			setAlertText(true);
		}
	};

	const handleAlert = (e) => {
		e.preventDefault();
		setIsAlert(false);
		setAlertText("");
		setIsError(false);
	};

	return (
		<>
			<Navbar></Navbar>
			<div className={styles.container}>
				<form className={styles.form}>
					{isAlert ? (
						<div className={styles.alert} style={{ backgroundColor: isError ? "#DC143C" : "#7FFF00" }}>
							<h4>{alertText}</h4>
							<button onClick={handleAlert}>
								<h4>X</h4>
							</button>
						</div>
					) : (
						<></>
					)}

					<h1 className={styles.title}>Register</h1>
					<input type="text" placeholder="Email" className={styles.input} value={UserName} onChange={handleUsernameChange} />
					<input type="password" placeholder="Password" className={styles.input} value={Password} onChange={handlePasswordChange} />
					<button className={styles.button} onClick={handleRegister}>
						Submit
					</button>
					<Link href="/login" className={styles.register}>
						<p>Already a member? Login</p>
					</Link>
				</form>
			</div>
		</>
	);
};
export default Register;

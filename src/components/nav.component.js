import { UserContext } from "@/pages/_app";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "../styles/Navbar.module.css";
import Cookies from "js-cookie";

const Navbar = () => {
	const { isLoggedIn, setUid, setIsLoggedIn } = useContext(UserContext);

	const handleLogout = () => {
		Cookies.remove("UID");
		setUid("");
		setIsLoggedIn(false);
		alert("Logged Out");
	};

	return (
		<nav className={styles.navbar}>
			<Link href="/" className={styles.brand}>
				Ticked
			</Link>
			<div className={styles.centerNav}>
				<Link href={isLoggedIn ? "/todo" : "/login"} className={styles.navItem}>
					<div>Todo</div>
				</Link>
				<Link href={isLoggedIn ? "/timetable" : "/login"} className={styles.navItem}>
					<div>Timetable</div>
				</Link>
				<Link href={isLoggedIn ? "/habbit" : "/login"} className={styles.navItem}>
					<div>Habbit</div>
				</Link>
			</div>
			<div className={styles.rightNav}>
				{isLoggedIn ? (
					<div className={styles.navItem} onClick={handleLogout}>
						Logout
					</div>
				) : (
					<>
						<Link href="/login" className={styles.navItem}>
							<div>Login</div>
						</Link>
						<Link href="/register" className={styles.navItem}>
							<div>Register</div>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;

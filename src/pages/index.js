import React, { useRef, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navbar from "../components/nav.component";

export default function Home() {

	return (
		<>
			<Head>
				<title>Ticked</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar></Navbar>
			<div className={styles.content} >
				<div className={styles.content} >
					<div>
						<h1 style={{ fontFamily: "var(--primary-font)", fontSize: "3rem", color: "#333", marginBottom: "2rem" }}>Streamline Your Task Management</h1>
						<h4 style={{ fontFamily: "Open Sans", fontSize: "1.25rem", color: "#555", lineHeight: "1.5", marginBottom: "2rem" }}>Ticked is the all-in-one platform for managing your tasks, schedule, and plans. With our intuitive to-do list, flexible timetable, and powerful planner, you will never miss a beat. Say goodbye to sticky notes and scattered to-dos, and hello to a streamlined and organized life with Ticked.</h4>
					</div>
					<img className={styles.heroImg} style={{ width: "50%", marginLeft: "3rem" }} src="/progressTracking.svg" alt="Progress Tracking Hero Image"></img>
				</div>
			</div>
		</>
	);
}

import { UserContext } from "@/pages/_app";
import React, { useContext, useState } from "react";
import styles from "../styles/Habbit.module.css";

function Habbits(props) {
	const { uid } = useContext(UserContext);
	var name = props.habitName;
	var description = props.habitDescription;
	var id = props.habitId;
	var initialCount = props.count;
	// Progress Shit
	const [progress, setProgress] = useState(initialCount);

	const EditFunction = props.editFunc;

	const handleDelete = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/habit/remove", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid,
					docId: id,
				}),
			});

			const data = await res.json();

			if (data.success === true) {
				// alert("Deleted");
				window.location.reload(false);
			} else {
				console.error(data.error);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const sendEdit = (e) => {
		e.preventDefault();

		EditFunction(id, name, description);
	};

	const handleProgressAdd = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/habit/track", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid,
					habitId: id,
				}),
			});

			const data = await res.json();

			if (data.success === true) {
				setProgress(progress + 14.28571428571429);
			} else {
				console.error(data.error);
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<li className={styles.habbit}>
			<div className={styles.habtiMain}>
				<div className={styles.habbitName}>{name}</div>
				<div className={styles.habbitDescription}>{description}</div>
				<div className={styles.habbitButtons}>
					<button className={styles.editButton} onClick={sendEdit}>
						Edit
					</button>
					<button className={styles.deleteButton} onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
			<div className={styles.progress}>
				<div className={styles.progressContainer}>
					<div class={styles.progressBar} style={{ width: progress.toString() + "%" }} id="myBar">
						<span className={styles.progressText} id="progressText">
							{Math.round(progress)}%
						</span>
					</div>
				</div>
				<button className={styles.progressAdd} onClick={handleProgressAdd}>
					+
				</button>
			</div>
		</li>
	);
}

export default Habbits;

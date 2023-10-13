import { UserContext } from "@/pages/_app";
import React, { useContext, useState } from "react";
import styles from "../styles/Todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faX } from "@fortawesome/free-solid-svg-icons";

function Todos(props) {
	const { uid } = useContext(UserContext);
	// var uid = "vqPe4eLwRSVSQU3BgTiBeEEh6CU2";
	var taskName = props.taskName;
	var taskId = props.id;
	// var status = props.state;
	const [states, setStates] = useState(props.state);

	const handleTaskDelete = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/todo/remove", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					docId: taskId,
					status,
					uid: uid,
				}),
			});

			const daata = await res.json();

			if (daata.success === true) {
				// alert("Deleted");
				window.location.reload(false);
			} else {
				console.error(daata.error);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleDone = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/todo/track", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					docId: taskId,
					status: props.state,
				}),
			});

			const daata = await res.json();

			// alert(states);
			if (daata.success === true) {
				setStates(!states);
				// window.location.reload(false);
			} else {
				console.error(daata.error);
			}
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<>
			<div className={styles.todoContainer}>
				<h1 className={styles.todoName} style={{ textDecoration: states ? "line-through" : "none" }}>
					{taskName}
				</h1>
				<div>
					{/* <h3>{taskId}</h3> */}
					<button type="submit" className={styles.done} onClick={handleDone}>
						<FontAwesomeIcon icon={faCircleCheck} className={styles.iconButton} />
					</button>
					<button type="submit" className={styles.done} onClick={handleTaskDelete}>
						<FontAwesomeIcon icon={faX} className={styles.iconButton} />
					</button>
				</div>
			</div>
		</>
	);
}

export default Todos;

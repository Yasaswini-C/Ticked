import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Timetable.module.css";

function TimetableRow({ id, time, monday, tuesday, wednesday, thursday, friday, saturday, sunday, editFunc }) {
	const sendEdit = (e) => {
		e.preventDefault();
		var values = { time, monday, tuesday, wednesday, thursday, friday, saturday, sunday };

		editFunc(id, values);
	};

	const handleDelete = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/timetable/remove", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					docId: id,
				}),
			});

			const data = await res.json();

			if (data.success === true) {
				alert("Deleted");
				window.location.reload(false);
			} else {
				console.log(data.error);
			}
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<tr>
			<td>{time}</td>
			<td>{monday}</td>
			<td>{tuesday}</td>
			<td>{wednesday}</td>
			<td>{thursday}</td>
			<td>{friday}</td>
			<td>{saturday}</td>
			<td>{sunday}</td>
			<td>
				<div className={styles.toolsDiv}>
					<button onClick={sendEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
					<button onClick={handleDelete}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			</td>
		</tr>
	);
}

export default TimetableRow;

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/nav.component";
import styles from "../styles/Timetable.module.css";
import TimetableRow from "../components/timetablerow.component";
import { UserContext } from "./_app";

function Timetable() {
	const { uid } = useContext(UserContext);
	const [rows, setRows] = useState([]);
	const [timeTableSettings, setTimeTableSettings] = useState({});

	const [showForm, setShowForm] = useState(false);
	const [Edit, setEdit] = useState(false);
	const [editId, setEditId] = useState("");

	const addRow = (e) => {
		e.preventDefault();
		// Code to add a new row to the rows array
	};
	const handleForm = (e) => {
		e.preventDefault();

		setShowForm(true);
	};
	const handleFormClose = (e) => {
		e.preventDefault();

		setShowForm(false);
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setTimeTableSettings((prevState) => ({ ...prevState, [name]: value }));
	};
	const handleFormAdd = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/timetable/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid: uid,
					values: timeTableSettings,
				}),
			});

			const data = await res.json();

			if (data.success === true) {
				var newRow = { id: data.id, values: data.values, time: data.time };
				rows.push(newRow);
				setTimeTableSettings({});
				setShowForm(false)
				console.log(rows);
			} else {
				console.error(data.error);
			}
		} catch (error) {
			console.error(data.error);
		}
	};

	const getData = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/timetable/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid: uid,
				}),
			});

			const data = await res.json();

			if (data.success === true) {
				setRows(data.array);
				console.log(data);
			} else {
				console.error(data.error);
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getData();
	}, [uid]);

	// Updates

	const handleEdit = (id, values) => {
		setEdit(true);
		setEditId(id);
		setShowForm(true);
		setTimeTableSettings(values);
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/timetable/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					timetableId: editId,
					newValues: timeTableSettings,
				}),
			});

			const data = await res.json();

			if (data.success === true) {
				alert("Updated" + data.id);
				setEdit(false);
				setEditId("");
				setShowForm(false);
				setTimeTableSettings({});
				window.location.reload(false);
			} else {
				console.error(data.error);
				setEdit(false);
				setEditId("");
				setShowForm(false);
				setTimeTableSettings({});
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<Navbar></Navbar>

			<table className={styles.timetable}>
				<thead>
					<tr>
						<th>Time</th>
						<th>Monday</th>
						<th>Tuesday</th>
						<th>Wednesday</th>
						<th>Thursday</th>
						<th>Friday</th>
						<th>Saturday</th>
						<th>Sunday</th>
						<th>Tools</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => (
						<TimetableRow key={index} editFunc={handleEdit} time={row.time} monday={row.values.monday} tuesday={row.values.tuesday} wednesday={row.values.wednesday} thursday={row.values.thursday} friday={row.values.friday} saturday={row.values.saturday} sunday={row.values.sunday} id={row.id} />
					))}
				</tbody>
			</table>

			{showForm ? (
				<form className={styles.addRowForm}>
					<label>Time</label>
					<input type="time" name="time" onChange={handleInputChange} value={timeTableSettings.time}></input>
					<label>Monday</label>
					<input type="text" name="monday" onChange={handleInputChange} value={timeTableSettings.monday}></input>
					<label>Tuesday</label>
					<input type="text" name="tuesday" onChange={handleInputChange} value={timeTableSettings.tuesday}></input>
					<label>Wednesday</label>
					<input type="text" name="wednesday" onChange={handleInputChange} value={timeTableSettings.wednesday}></input>
					<label>Thursday</label>
					<input type="text" name="thursday" onChange={handleInputChange} value={timeTableSettings.thursday}></input>
					<label>Friday</label>
					<input type="text" name="friday" onChange={handleInputChange} value={timeTableSettings.friday}></input>
					<label>Saturday</label>
					<input type="text" name="saturday" onChange={handleInputChange} value={timeTableSettings.saturday}></input>
					<label>Sunday</label>
					<input type="text" name="sunday" onChange={handleInputChange} value={timeTableSettings.sunday}></input>

					<div className={styles.formDiv}>
						{Edit ? <button onClick={handleUpdate}>Update Row</button> : <button onClick={handleFormAdd}>Add Row</button>}
						<button onClick={handleFormClose}>Close</button>
					</div>
				</form>
			) : (
				<button className={styles.addRowButton} onClick={handleForm}>
					Add Row
				</button>
			)}
		</>
	);
}

export default Timetable;

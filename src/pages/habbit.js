import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Habbit.module.css";
import Navbar from "../components/nav.component";
import Habbits from "../components/habbits.component";
import { UserContext } from "./_app";

function HabbitTracker() {
	const [habits, setHabits] = useState([]);
	const [habitName, setHabitName] = useState("");
	const [habitDescription, setHabitDescription] = useState("");
	const { uid, isLoggedIn } = useContext(UserContext);
	const [Edit, setEdit] = useState(false);
	const [habitEditId, setHabitEditId] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/habit/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid,
					habitName,
					habitDescription,
				}),
			});

			const data = await res.json();

			if (data.success === true) {
				setHabits([...habits, { id: data.docId, name: data.habitName, description: data.habitDescription, date: data.date, count: data.count }]);
				setHabitName("");
				setHabitDescription("");
			} else {
				console.error(data.error);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const getData = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/habit/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				setHabits(data.array);
			} else {
				console.error(data.error);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleEdit = (id, name, description) => {
		setEdit(true);
		setHabitName(name);
		setHabitDescription(description);
		setHabitEditId(id);
	};

	const handleUpdate = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/habit/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					habitId: habitEditId,
					newName: habitName,
					newDescription: habitDescription,
				}),
			});

			const data = await res.json();

			if (data.success === true) {
				alert("Updated" + data.id);
				setHabitDescription("");
				setHabitName("");
				setHabitEditId("");
				setEdit(false);
			} else {
				console.error(data.error);
				setHabitDescription("");
				setHabitName("");
				setHabitEditId("");
				setEdit(false);
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getData();
	}, [uid]);

	return (
		<>
			<Navbar></Navbar>
			<div className={styles.habbitContainer}>
				<form className={styles.form} onSubmit={Edit ? handleUpdate : handleSubmit}>
					<div className={styles.inputLable}>
						<h4 className={styles.lable} htmlFor="habitName">
							Habit Name:
						</h4>
						<input type="text" id="habitName" className={styles.input} value={habitName} onChange={(event) => setHabitName(event.target.value)} />
					</div>
					<div className={styles.inputLable}>
						<h4 className={styles.lable} htmlFor="habitDescription">
							Habit Description:
						</h4>
						<input type="text" id="habitDescription" className={styles.input} value={habitDescription} onChange={(event) => setHabitDescription(event.target.value)} />
					</div>
					<button className={styles.button} type="submit">
						{Edit ? "Save Changes" : "Add Habit"}
					</button>
				</form>
				<ul className={styles.habbitList}>
					<li className={styles.habbitHead}>
						<div className={styles.habbitName}>Habbit Name</div>
						<div className={styles.habbitDescription}>Habbit Description</div>
						<div className={styles.habbitButtons}>Tools</div>
					</li>

					{habits?.map((habbit, index) => (
						<Habbits key={index} habitId={habbit.id} habitName={habbit.name} habitDescription={habbit.description} editFunc={handleEdit} count={habbit.count}></Habbits>
					))}
				</ul>
			</div>
		</>
	);
}

export default HabbitTracker;

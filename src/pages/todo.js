import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./_app";
import styles from "../styles/Todo.module.css";
import Navbar from "../components/nav.component";
import Todo from "../components/todos.component";

const Todos = () => {
	const { uid } = useContext(UserContext);
	const [Todos, setTodos] = useState([]);
	const [NewTask, setNewTask] = useState("");

	const getData = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/todo/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid: uid,
				}),
			});

			var indz = await res.json();

			if (res.ok) {
				setTodos(indz.array);
				console.log(indz.array);
			} else {
				console.error(indz);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getData();
	}, [uid]);

	const handleNewTask = (e) => {
		setNewTask(e.target.value);
	};

	const addTask = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/todo/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					taskName: NewTask,
					uid: uid,
					state: false,
				}),
			});

			const data = await res.json();

			if (data.success === true) {
				var newArray = Todos;
				newArray.push({
					uid: uid,
					task: data.taskName,
					id: data.docId,
					state: data.state,
				});
				setTodos(newArray);
				setNewTask("");
			} else {
				alert(false + data.error);
				console.error(error);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Navbar></Navbar>
			<div className={styles.tpage}>
				<img className={styles.todoimg} style={{ width: "40%"}} src="/undraw_to_do.svg" alt="To do image"></img>
				<div className={styles.container}>
					{/* <h2>To Do list</h2> */}
					
					<div className={styles.form}>
						<input type="text" className={styles.task} placeholder="Enter a task.." value={NewTask} onChange={handleNewTask}></input>
						<button type="submit" className={styles.button} onClick={addTask}>
							Add
						</button>
					</div>
					<ul className={styles.todolists}>
						{Todos.map((tota, index) => {
							return <Todo key={index} id={tota.id} taskName={tota.task} state={tota.state}></Todo>;
						})}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Todos;

import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore/lite";

export default async function add(req, res) {
	const { uid, habitName, habitDescription } = req.body;

	var currentDate = new Date();
	var dd = String(currentDate.getDate()).padStart(2, "0");
	var mm = String(currentDate.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = currentDate.getFullYear();

	currentDate = yyyy + "-" + mm + "-" + dd;

	if (!habitName && !habitDescription) {
		res.status(400).json({ success: false, error: "Habit Name and Description are required" });
	}

	try {
		const docRef = await addDoc(collection(db, "habits"), {
			user: uid,
			name: habitName,
			description: habitDescription,
			date: currentDate,
			count: 0,
		});

		res.status(200).json({
			success: true,
			docId: docRef.id,
			habitName,
			habitDescription,
			currentDate,
			count: 0,
		});
	} catch (err) {
		console.log(err);
		res.status(200).json({
			error: err,
		});
	}
}

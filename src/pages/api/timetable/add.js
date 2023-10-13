import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore/lite";

export default async function add(req, res) {
	const { values, uid } = req.body;

	if ((!values, !uid)) {
		res.status(400).json({
			success: false,
			error: "UserID or Values should be provided",
		});
	}

	try {
		const { time, ...newJson } = values;

		const docRef = await addDoc(collection(db, "timetable"), {
			uid: uid,
			values: newJson,
			time: values.time,
		})
			.then((doc) => {
				res.status(200).json({
					success: true,
					id: doc.id,
					uid: uid,
					values: newJson,
					time: values.time,
				});
			})
			.catch((err) => {
				res.status(400).json({
					success: false,
					error: err,
				});
			});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			success: false,
			error: err,
		});
	}
}

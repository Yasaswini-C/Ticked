import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore/lite";

export default async function add(req, res) {
	const { taskName, state, uid } = req.body;

	if (!taskName) {
		res.status(400).json({ success: false, error: "Taskname is required" });
	}

	try {
		const docRef = await addDoc(collection(db, "users"), {
			user: uid,
			task: taskName,
			state,
		});

		res.status(200).json({
			success: true,
			docId: docRef.id,
			taskName: taskName,
			state,
		});
	} catch (err) {
		console.log(err);
		res.status(200).json({
			success: false,
			error: err,
		});
	}
}

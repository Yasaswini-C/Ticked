import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore/lite";

export default async function update(req, res) {
	const { timetableId, newValues } = req.body;

	try {
		const docRef = doc(db, "timetable", timetableId);

		await updateDoc(docRef, {
			values: newValues,
		})
			.then(() => {
				res.status(200).json({
					success: true,
					id: docRef.id,
				});
			})
			.catch((err) => {
				res.status(400).json({
					success: false,
					error: err,
				});
			});
	} catch (err) {
		res.status(400).json({
			success: false,
			error: err,
		});
	}
}

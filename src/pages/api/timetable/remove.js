import { auth, db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore/lite";

export default async function remove(req, res) {
	const { docId } = req.body;
	console.log(docId);

	try {
		await deleteDoc(doc(db, "timetable", docId))
			.then(() => {
				res.status(200).json({
					success: true,
				});
			})
			.catch((err) => {
				console.error(err);
				res.status(400).json({
					success: false,
					error: err,
				});
			});
	} catch (err) {
		console.log(err);
		res.status(200).json({
			success: false,
			error: err,
		});
	}
}

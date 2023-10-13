import { db } from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore/lite";

export default async function update(req, res) {
	const { docId, status } = req.body;
	console.log(status);

	try {
		const docRef = doc(db, "users", docId);

		await updateDoc(docRef, {
			state: !status,
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

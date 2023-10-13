import { db } from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore/lite";

export default async function update(req, res) {
	const { habitId } = req.body;

	try {
		const docRef = doc(db, "habits", habitId);
		const docSnap = await getDoc(docRef);

		var newCount = docSnap.data().count + 14.28571428571429;

		await updateDoc(docRef, {
			count: newCount,
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

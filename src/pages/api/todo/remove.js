import { auth, db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore/lite";

export default async function remove(req, res) {
	const { docId, uid } = req.body;

	try {
		await deleteDoc(doc(db, "users", docId)).then(() => {
			console.log("Deleted");
			res.status(200).json({
				success: true,
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

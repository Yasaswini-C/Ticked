import { auth, db } from "../firebase";
import { collection, getDocs, where, query } from "firebase/firestore/lite";

export default async function get(req, res) {
	const { uid } = req.body;

	try {
		const userRef = collection(db, "timetable");
		const q = query(userRef, where("uid", "==", uid));

		const querySnapshot = await getDocs(q);

		var array = [];
		querySnapshot.docs.forEach((doc) => {
			var daa = doc.data();
			daa.id = doc.id;
			console.log(doc.id);
			array.push(daa);
		});

		res.status(200).json({
			success: true,
			array,
		});
	} catch (err) {
		console.log(err);
		res.status(200).json({
			error: err,
		});
	}
}

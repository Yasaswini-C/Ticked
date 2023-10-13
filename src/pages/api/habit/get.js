import { collection, getDocs, where, query } from "firebase/firestore/lite";
import { auth, db } from "../firebase";

export default async function get(req, res) {
	const { uid } = req.body;

	try {
		const userRef = collection(db, "habits");
		const q = query(userRef, where("user", "==", uid));

		const querySnapshot = await getDocs(q);

		var array = [];
		querySnapshot.docs.forEach((doc) => {
			var daa = doc.data();
			daa.id = doc.id;
			array.push(daa);
		});

		// console.log(array);
		res.status(200).json({
			array,
		});
	} catch (err) {
		console.log(err);
		res.status(200).json({
			error: err,
		});
	}
}

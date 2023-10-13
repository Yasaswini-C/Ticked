import { app, auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";

export default async function get(req, res) {
	const { uid } = req.body;

	try {
		const usersRef = collection(db, "users");
		const q = query(usersRef, where("user", "==", uid));

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
		res.status(400).json({
			error: err,
		});
	}
}

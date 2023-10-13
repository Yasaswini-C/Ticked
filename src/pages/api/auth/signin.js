import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function signin(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			res.status(200).json({ user: userCredential, uid: userCredential.user.uid });
		})
		.catch((err) => {
			res.status(400).json({
				error: err,
			});
			console.log(err);
		});
}

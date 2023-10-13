import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default async function signup(req, res) {
	const { email, password } = req.body;

	// console.log(email, password);

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}

	try {
		await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
			res.status(200).json({ user: userCredential.user, uid: userCredential.uid });
		});
	} catch (error) {
		switch (error.code) {
			case "auth/invalid-email":
				return res.status(400).json({ error: "Invalid email format" });
			case "auth/weak-password":
				return res.status(400).json({ error: "Password must be at least 6 characters" });
			case "auth/email-already-in-use":
				return res.status(400).json({ error: "Email already in use" });
			default:
				return res.status(400).json({ error });
		}
	}
}

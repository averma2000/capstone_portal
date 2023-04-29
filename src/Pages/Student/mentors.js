import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
import "../../StyleSheets/LoginRegister.css";
import {
	addDoc,
	collection,
	getDocs,
	query,
	where,
	updateDoc,
	doc,
	getDoc,
} from "firebase/firestore";

const Mentor = () => {
	const [gMentor, setgMentor] = useState("pending");
	const [allMentor, setAllMentor] = useState([]);
	const currUserEmail = auth.currentUser.email;

	const getGroupId = async (email) => {
		const userRef = collection(db, "Users");
		const q = query(userRef, where("email", "==", email));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			console.log("No user found with email:", email);
		} else {
			const userDoc = querySnapshot.docs[0];
			const userData = userDoc.data();
			const gid = userData.GroupId;
			// console.log("My group", gid);

			const groupRef = doc(db, "Groups", gid);
			const groupDoc = await getDoc(groupRef);
			const valmentor = groupDoc.data().mentor;
			// console.log(valmentor);
			setgMentor(valmentor);
		}
	};

	const getAllMentor = async () => {
		const usersRef = collection(db, "Users");
		const q = query(usersRef, where("userType", "==", "teacher"));
		const querySnapshot = await getDocs(q);
		const mentorList = [];
		querySnapshot.forEach((doc) => {
			mentorList.push(doc.data());
		});
		setAllMentor(mentorList);
	};

	useEffect(() => {
		getAllMentor();
		console.log(allMentor);
		// getGroupId(currUserEmail);
	}, []);

	const mentor = getAllMentor(currUserEmail);

	// console.log("all my mentors", allMentor);
	if (gMentor == "pending") {
		return (
			<div className="page">
				<h1 className="reqbtnsection">Mentor not aloted to group</h1>
				<br />
				<hr />
				<br />
				<br />
				<div className="reqbtnsection">
					<select name="mentor" id="mentor">
						{allMentor.map((mentor) => (
							<option key={mentor.id}>
								<h2>
									Name: {mentor.name} --- Email: {mentor.email}
								</h2>
								{/* <p>{mentor.email}</p> */}
							</option>
						))}
					</select>
				</div>
				<div className="reqbtnsection">
					<div className="requestbtn">
						<button className="colorHilightBtn">Request</button>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="page">
				<h1>Mentor alloted to group</h1>
			</div>
		);
	}
};

export default Mentor;

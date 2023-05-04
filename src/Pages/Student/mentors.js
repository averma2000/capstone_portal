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
	arrayUnion,
} from "firebase/firestore";
import { Button } from "reactstrap";

const Mentor = () => {
	const [gMentor, setgMentor] = useState("pending");
	const [allMentor, setAllMentor] = useState([]);
	const [groupId, setGroupId] = useState("");
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
			console.log("My group", gid);
			setGroupId(gid);
			console.log(groupId);
			const groupRef = doc(db, "Groups", gid);
			const groupDoc = await getDoc(groupRef);
			const valmentor = groupDoc.data().mentorId;
			console.log("val mentor", valmentor);
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
		getGroupId(currUserEmail);
		getAllMentor();

		console.log(allMentor);
		// getGroupId(currUserEmail);
	}, []);

	const mentor = getAllMentor(currUserEmail);

	async function sendRequest(email) {
		const usersRef = collection(db, "Users");
		const q = query(usersRef, where("email", "==", email));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			// console.log(`No mentor found with email ${email}.`);
		} else {
			const mentorDoc = querySnapshot.docs[0];
			const mentorRef = doc(db, "Users", mentorDoc.id);
			await updateDoc(mentorRef, { requests: arrayUnion(groupId) });
		}
	}

	if (gMentor == "pending") {
		return (
			<div className="page">
				<h1 className="reqbtnsection">Mentor not aloted to group</h1>
				<br />
				<hr />
				<br />
				<br />
				<ul>
					{allMentor.map((mentor) => (
						<li key={mentor.id} className="listelement">
							{/* <h2>{group.name}</h2>
					<p>{group.description}</p> */}

							<div class="wrapper">
								<div class="container">
									<div class="card">
										<header class="card-header">
											<h2 class="card-title">{mentor.name}</h2>
										</header>
										<div class="card-body">
											<p class="card-content">{mentor.email}</p>
										</div>
										<footer class="card-footer">
											<Button
												href="#"
												class="card-link"
												onClick={sendRequest.bind(this, mentor.email)}
											>
												Request
											</Button>
										</footer>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
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

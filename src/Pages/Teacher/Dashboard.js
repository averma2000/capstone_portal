import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import {
	addDoc,
	collection,
	getDocs,
	query,
	where,
	updateDoc,
	doc,
	setDoc,
	getDoc,
	onSnapshot,
} from "firebase/firestore";
import "../../StyleSheets/teacherDashboard.css";

const Dashboard = () => {
	const currUserId = auth.currentUser.uid;
	const [mentorId, setMentorId] = useState(null);
	const [groups, setGroups] = useState([]);

	async function getIdByUid(uid) {
		const docRef = doc(db, "Users", uid);
		// const docSnap = await getDoc(docRef);
		const querySnapshot = await getDoc(docRef);
		const data = querySnapshot.data();
		console.log("Document id:", data.id);
		setMentorId(data.id);
	}

	useEffect(() => {
		getIdByUid(currUserId);
	}, [currUserId]);

	useEffect(() => {
		if (mentorId) {
			// const db = getFirestore();
			const q = query(
				collection(db, "Groups"),
				where("mentorId", "==", mentorId)
			);
			onSnapshot(q, (snapshot) => {
				const groupsData = [];
				snapshot.forEach((doc) => {
					groupsData.push({ id: doc.id, ...doc.data() });
				});
				setGroups(groupsData);
				console.log(groupsData);
			});
		}
		console.log("yeh grop", groups);
	}, [mentorId]);

	return (
		<div className="page">
			{groups.map((doc) => {
				return (
					<div className="wrapper">
						<div className="container">
							<div className="card">
								<header className="card-header">
									<h2 className="card-title">{doc.projectName}</h2>
								</header>
								<div className="card-body">
									<p className="card-content">{doc.projectDescription}</p>
								</div>
								<footer className="card-footer">
									<a href="#" className="card-link">
										View
									</a>
								</footer>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
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
import { Button } from "reactstrap";

const Teachers = () => {
	const [allMentor, setAllMentor] = useState([]);

	useEffect(() => {
		const getAllMentor = async () => {
			const usersRef = collection(db, "Users");
			const q = query(usersRef, where("userType", "==", "teacher"));
			const querySnapshot = await getDocs(q);
			const mentorList = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			setAllMentor(mentorList);
		};

		getAllMentor();
		console.log(allMentor);
		// getGroupId(currUserEmail);
	}, []);

	return (
		<div className="page">
			<h1>Welcome to Teacher page</h1>

			<h3>all the registered teacher will be display here</h3>
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
										<Button href="#" class="card-link">
											Delete
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
};

export default Teachers;

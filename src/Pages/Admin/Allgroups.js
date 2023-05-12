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
import { useNavigate } from "react-router-dom";

const AllGroups = () => {
	const [groups, setGroups] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchGroups() {
			const querySnapshot = await getDocs(collection(db, "Groups"));
			const groupsData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				name: doc.data().projectName,
				description: doc.data().projectDescription,
			}));
			setGroups(groupsData);
		}
		fetchGroups();
	}, []);
	return (
		<div className="page ">
			<h1>Welcome to All Groups Section</h1>

			<h3>all groups will be displayed here</h3>
			<ul>
				{groups.map((group) => (
					<li key={group.id} className="listelement">
						{/* <h2>{group.name}</h2>
						<p>{group.description}</p> */}

						<div class="wrapper">
							<div class="container">
								<div class="card">
									<header class="card-header">
										<h2 class="card-title">{group.name}</h2>
									</header>
									<div class="card-body">
										<p class="card-content">{group.description}</p>
									</div>
									<footer class="card-footer">
										<Button
											href="#"
											class="card-link"
											onClick={() => {
												navigate(`/groupdetails/${group.id}`);
											}}
										>
											View
										</Button>
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

export default AllGroups;

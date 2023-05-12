import React, { useEffect, useState } from "react";
import {
	collection,
	query,
	where,
	getDoc,
	doc,
	updateDoc,
	arrayRemove,
	arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { Button } from "reactstrap";

const Requests = () => {
	const [reqs, setReqs] = useState([]);
	const [groupInfo, setGroupInfo] = useState([]);
	const [groupId, setGroupId] = useState("");

	useEffect(() => {
		async function fetchRequest() {
			const docref = doc(db, "Users", auth.currentUser.uid);
			const docteach = await getDoc(docref);
			const req = docteach.data().requests;
			setReqs(req);
		}
		fetchRequest();

		// console.log("group", groupInfo);
	}, []);

	useEffect(() => {
		async function getGroupDocs() {
			for (let index = 0; index < reqs.length; index++) {
				const groupRef = doc(db, "Groups", reqs[index]);
				const docGroup = await getDoc(groupRef);
				console.log(docGroup.data().projectName);
				const name = docGroup.data().projectName;
				const description = docGroup.data().projectDescription;
				const gid = reqs[index];

				setGroupInfo((info) => [
					...info,
					{
						id: gid,
						projectName: name,
						projectDescription: description,
					},
				]);
			}
		}
		getGroupDocs();
	}, [reqs]);

	const approveRequest = async (teacherId, studentId) => {
		const docRef = doc(db, "Users", teacherId);

		// Remove the student ID from the requests array
		await updateDoc(docRef, {
			requests: arrayRemove(studentId),
		});

		// Add the student ID to the approved array
		await updateDoc(docRef, {
			approved: arrayUnion(studentId),
		});

		alert("Request approved successfully!");
	};

	const declineRequest = async (teacherId, studentId) => {
		const docRef = doc(db, "Users", teacherId);

		// Remove the student ID from the requests array
		await updateDoc(docRef, {
			requests: arrayRemove(studentId),
		});

		alert("Request declined successfully!");
	};
	return (
		<div className="page">
			<h1>Welcome to Request page</h1>

			<ul>
				{groupInfo.map((info) => (
					<li key={info.id} className="listelement">
						{/* <h2>{group.name}</h2>
					<p>{group.description}</p> */}

						<div class="wrapper">
							<div class="container">
								<div class="card">
									<header class="card-header">
										<h2 class="card-title">{info.projectName}</h2>
									</header>
									<div class="card-body">
										<p class="card-content">{info.projectDescription}</p>
									</div>
									<footer class="card-footer">
										<Button
											href="#"
											class="card-link"
											onClick={() =>
												approveRequest(auth.currentUser.uid, info.id)
											}
										>
											Approve
										</Button>
										<Button
											href="#"
											class="card-link"
											onClick={() =>
												declineRequest(auth.currentUser.uid, info.id)
											}
										>
											Decline
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

export default Requests;

import React, { useEffect, useState } from "react";
import { collection, query, where, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { Button } from "reactstrap";

const Requests = () => {
	const [reqs, setReqs] = useState([]);
	const [groupInfo, setGroupInfo] = useState([]);

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
										<Button href="#" class="card-link">
											Approve
										</Button>
										<Button href="#" class="card-link">
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

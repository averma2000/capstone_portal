import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuid } from "uuid";
import { Button } from "reactstrap";
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

import "../../StyleSheets/StudentGroup.css";
import "../../StyleSheets/MyGroup.css";

const Mygroup = () => {
	const navigate = useNavigate();
	const currUserEmail = auth.currentUser.email;
	const currUserUid = auth.currentUser.uid;
	console.log(currUserEmail);
	const [groupId, setGroupId] = useState("");
	const [Gid, setGid] = useState("");
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [documentRef, setDocumentRef] = useState("");

	const [modules, setModules] = useState([{ moduleName: "" }]);

	const handleCreateGroup = async (e) => {
		console.log("createGroup function called");
		const querySnapshot = await getDocs(
			query(collection(db, "Groups"), where("superUser", "==", currUserEmail))
		);
		if (querySnapshot.size === 0) {
			const docref = await addDoc(collection(db, "Groups"), {
				superUser: currUserEmail,
				user: [],
				mentorName: "pending",
				mentorId: "pending",
				modules: [],
			}).then((res) => {
				const userRef = doc(db, "Users", currUserUid);
				updateDoc(userRef, { ["power"]: true });
				updateDoc(userRef, { ["GroupId"]: res.id });
			});
		} else {
			console.log("A group with the same superUser already exists.");
		}

		navigate("/projectdetails");
	};

	const uRef = doc(db, "Users", currUserUid);
	// getDocs(uRef)
	// 	.then((doc) => {
	// 		if (doc.exists) {
	// 			const myGroupId = doc.data().GroupId;
	// 			console.log("My Group Id", myGroupId);
	// 		} else {
	// 			console.log("No such document!");
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.log("Error getting document:", error);
	// 	});

	// async function getGroupId() {
	// 	const querySnapshot = await getDocs(
	// 		query(collection(db, "Groups"), where("superUser", "==", currUserEmail))
	// 	);
	// 	console.log("My Group Id", querySnapshot);

	// 	if (querySnapshot.empty) {
	// 		console.log("No groups found for this user.");
	// 		setGid("null");
	// 	} else {
	// 		const groupDoc = querySnapshot.docs[0];
	// 		const groupId = groupDoc.uid;
	// 		// console.log("Group ID:", groupId);
	// 		setGid(groupId);
	// 	}
	// }

	const getGroupId = async (email) => {
		const userRef = collection(db, "Users");
		const q = query(userRef, where("email", "==", email));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			console.log("No user found with email:", email);
			setGid("null");
		} else {
			const userDoc = querySnapshot.docs[0];
			const userData = userDoc.data();
			const groupId = userData.GroupId;

			console.log("Gid", userData);

			setGid(groupId);
		}
	};

	const getGroupinfo = async (groupId) => {
		const groupRef = doc(db, "Groups", groupId); // replace 'db' with your Firestore database instance
		console.log("Group Ref:", groupRef);

		const groupDoc = await getDoc(groupRef);
		console.log("Group Doc:", groupDoc);

		if (groupDoc.exists()) {
			const { projectDescription, projectName } = groupDoc.data();
			console.log(`Project Name: ${projectName}`);
			console.log(`Project Description: ${projectDescription}`);
			setProjectDescription(projectDescription);
			setProjectName(projectName);
		} else {
			console.log("No such document!");
		}
	};

	useEffect(() => {
		getGroupId(currUserEmail);
		getGroupinfo(Gid);
	});

	const handleStudentAdd = () => {
		setModules([...modules, { ModuleName: "" }]);
	};
	const HndleStudentRemove = (index) => {
		const list = [...modules];
		list.splice(index, 1);
		setModules(list);
	};

	// console.log("gid value", Gid);
	if (Gid == "null") {
		return (
			<div className="mygroup">
				<form className="group-form ">
					<h1>Create Group</h1>
					<div className="action"></div>
					<br />
					<br />
					<br />
					<div className="action">
						<Button
							onClick={handleCreateGroup}
							className="colorHilightBtn createjoinbtn"
						>
							Create Group
						</Button>
					</div>
				</form>
			</div>
		);
	} else {
		return (
			<div className="page">
				<div className="myModulehead">
					<h2>Project details</h2>
				</div>

				<hr />
				<div className="myModulehead">
					<h3>
						<u>Project name</u> : {projectName}
					</h3>
				</div>
				<hr />
				<div className="myModulehead">
					<h3>
						<u>Project Description</u> : <br />
					</h3>
					<h3>{projectDescription}</h3>
				</div>
				<hr />
				<div className="myModulehead">
					<h3>Project Modules</h3>
				</div>
				<div className="myModules">
					{modules.map((singlemodule, index) => (
						<div className="student-info" key={index}>
							<div className="student-credentials">
								<input
									name="student"
									type="text"
									placeholder="Name"
									className="input-box student-cred-input"
								/>
								<button className="mybutton">Save </button>

								{modules.length > 1 && (
									<button
										type="button"
										className="Student-remove-btn"
										onClick={() => HndleStudentRemove(index)}
									>
										<span>X</span>
									</button>
								)}
							</div>
						</div>
					))}

					<div className="submitbtn">
						{modules.length < 10 && (
							<button onClick={handleStudentAdd} className="mybutton">
								Add Module
							</button>
						)}
					</div>
				</div>
			</div>
		);
	}
};

export default Mygroup;

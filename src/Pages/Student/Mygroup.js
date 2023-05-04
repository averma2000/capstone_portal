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
	arrayUnion,
} from "firebase/firestore";

import "../../StyleSheets/StudentGroup.css";
import "../../StyleSheets/MyGroup.css";

const Mygroup = () => {
	const navigate = useNavigate();
	const currUserEmail = auth.currentUser.email;
	const currUserUid = auth.currentUser.uid;
	// console.log(currUserEmail);

	const [Gid, setGid] = useState("");
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");

	const [moduleName, setModuleName] = useState("");
	const [allModule, setAllModule] = useState([]);

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
				remarks: [],
			}).then((res) => {
				const userRef = doc(db, "Users", currUserUid);
				updateDoc(userRef, { ["power"]: true });
				updateDoc(userRef, { ["GroupId"]: res.id });
			});
		} else {
			// console.log("A group with the same superUser already exists.");
		}

		navigate("/projectdetails");
	};

	const uRef = doc(db, "Users", currUserUid);

	const getGroupId = async (email) => {
		const userRef = collection(db, "Users");
		const q = query(userRef, where("email", "==", email));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			// console.log("No user found with email:", email);
			setGid("null");
		} else {
			const userDoc = querySnapshot.docs[0];
			const userData = userDoc.data();
			const groupId = userData.GroupId;

			// console.log("Gid", userData);

			setGid(groupId);
		}
	};

	const getGroupinfo = async (groupId) => {
		const groupRef = doc(db, "Groups", groupId);
		// console.log("Group Ref:", groupRef);

		const groupDoc = await getDoc(groupRef);
		// console.log("Group Doc:", groupDoc);

		if (groupDoc.exists()) {
			const { projectDescription, projectName } = groupDoc.data();
			// console.log(`Project Name: ${projectName}`);
			// console.log(`Project Description: ${projectDescription}`);
			setProjectDescription(projectDescription);
			setProjectName(projectName);
		} else {
			// console.log("No such document!");
		}
	};

	const addModule = async () => {
		const docRef = doc(db, "Groups", Gid);
		const moduleDoc = await getDoc(docRef);
		const moduleData = moduleDoc.data().modules;
		// console.log(typeof moduleData);
		const newModuleData = moduleName;
		updateDoc(docRef, {
			modules: arrayUnion(newModuleData),
		});

		alert("test");
	};

	const addStatus = async () => {
		const docRef = doc(db, "Groups", Gid);
		const moduleDoc = await getDoc(docRef);
		const moduleData = moduleDoc.data().modules;
		// console.log(typeof moduleData);
		const newModuleData = moduleName;
		updateDoc(docRef, {
			completed: arrayUnion(false),
		});

		alert("test");
	};

	const showModules = async () => {
		const docRef = doc(db, "Groups", Gid);
		const moduleDoc = await getDoc(docRef);
		const moduleData = moduleDoc.data().modules;
		setAllModule(moduleData);
	};
	console.log("module data", allModule);

	useEffect(() => {
		getGroupId(currUserEmail);
		getGroupinfo(Gid);
		showModules();
	}, []);

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
					<h3>added modules shown here</h3>
					<ol>
						{allModule.map((module) => (
							<li key={module.id} className="listelement">
								<h4>{module}</h4>
							</li>
						))}
					</ol>
				</div>
				<div className="myModules">
					<div className="student-info">
						<div className="student-credentials">
							<input
								name="student"
								type="text"
								placeholder="Name"
								className="input-box student-cred-input"
								value={moduleName}
								onChange={(e) => setModuleName(e.target.value)}
							/>
							<button className="mybutton" onClick={addModule}>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Mygroup;

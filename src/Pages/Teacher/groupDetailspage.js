import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

const GroupDetails = () => {
	const navigate = useNavigate();
	const currUserEmail = auth.currentUser.email;
	const currUserUid = auth.currentUser.uid;
	// console.log(currUserEmail);

	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [allRemarks, setAllRemarks] = useState([]);

	const [allModule, setAllModule] = useState([]);
	const [remark, setRemark] = useState("");

	const uRef = doc(db, "Users", currUserUid);
	// const location = useLocation();
	// setGid(location.state.id);
	// function getGroupId() {
	// 	console.log("location", Gid);
	// }

	const { id } = useParams();
	console.log("id", id);
	const getGroupinfo = async (groupId) => {
		const groupRef = doc(db, "Groups", groupId);
		// console.log("Group Ref:", groupRef);

		const groupDoc = await getDoc(groupRef);
		// console.log("Group Doc:", groupDoc);

		const { projectDescription, projectName, modules, remarks } =
			groupDoc.data();
		// console.log(`Project Name: ${projectName}`);
		// console.log(`Project Description: ${projectDescription}`);
		setAllModule(modules);
		setProjectDescription(projectDescription);
		setProjectName(projectName);
		setAllRemarks(remarks);
		console.log("modules", allRemarks);
	};

	const addRemark = async () => {
		alert("chala");
		const docRef = doc(db, "Groups", id);
		const moduleDoc = await getDoc(docRef);
		const moduleData = moduleDoc.data().remarks;
		console.log(moduleData);

		updateDoc(docRef, {
			remarks: arrayUnion(remark),
		});

		alert("test");
	};

	console.log(allModule);

	useEffect(() => {
		// getGroupId();
		getGroupinfo(id);
	}, []);

	console.log("all remarks", allRemarks);

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
							<h5>{</h5>
						</li>
					))}
				</ol>
			</div>
			<div className="myModules">
				<div className="student-info">
					<div className="student-credentials">
						<p>Remark For {allRemarks.length}</p>
						<br />
						<input
							name="student"
							type="text"
							placeholder="Remark"
							className="input-box student-cred-input"
							value={remark}
							onChange={(e) => setRemark(e.target.value)}
						/>
						<button className="mybutton" onClick={addRemark}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupDetails;

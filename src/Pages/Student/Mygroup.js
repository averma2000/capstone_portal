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
} from "firebase/firestore";

import "../../StyleSheets/StudentGroup.css";

const Mygroup = () => {
	const navigate = useNavigate();
	const currUserEmail = auth.currentUser.email;
	const currUserUid = auth.currentUser.uid;
	console.log(currUserEmail);
	const [groupId, setGroupId] = useState("");
	const [Gid, setGid] = useState("");
	const [documentRef, setDocumentRef] = useState("");

	const handleCreateGroup = async (e) => {
		console.log("createGroup function called");
		const querySnapshot = await getDocs(
			query(collection(db, "Groups"), where("superUser", "==", currUserEmail))
		);
		if (querySnapshot.size === 0) {
			const docref = await addDoc(collection(db, "Groups"), {
				superUser: currUserEmail,
				user: [],
				mentor: "pending",
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

	async function updateUserField(uid) {}

	async function getGroupId() {
		const querySnapshot = await getDocs(
			query(collection(db, "Groups"), where("superUser", "==", currUserEmail))
		);

		if (querySnapshot.empty) {
			console.log("No groups found for this user.");
			setGid("null");
		} else {
			const groupDoc = querySnapshot.docs[0];
			const groupId = groupDoc.uid;
			// console.log("Group ID:", groupId);
			setGid(groupId);
		}
	}
	useEffect(() => {
		getGroupId();
	});

	console.log("gid value", Gid);
	if (Gid == "null") {
		return (
			<div className="mygroup">
				<form className="group-form ">
					<h1>Create Group</h1>
					<div className="action"></div>
					<div className="action">
						<Button
							onClick={handleCreateGroup}
							className="colorHilightBtn createjoinbtn"
						>
							Create Group
						</Button>
					</div>
				</form>
				<form className="group-form ">
					<h1>Join Group</h1>
					<div className="content">
						<div className="input-field">
							<input
								type="number"
								placeholder="Group Id"
								autoComplete="groupid"
								name="groupid"
								id="groupid"
								value={groupId}
								onChange={(e) => setGroupId(e.target.value)}
							/>
						</div>
					</div>

					<div className="action">
						<Button className="colorHilightBtn createjoinbtn">
							Create Group
						</Button>
					</div>
				</form>
			</div>
		);
	} else {
		return (
			<div className="page">
				<h1>group id avalable</h1>
			</div>
		);
	}
};

export default Mygroup;

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "../../StyleSheets/LoginRegister.css";

const AddMembers = () => {
	return (
		<form className="login-form ">
			<h1>Add Participants</h1>

			<div className="content">
				<h4>First Participant</h4>
				<div className="input-field">
					<input type="text" placeholder="Email" name="r1" id="r1" />
				</div>
				<h4>Second Participant</h4>

				<div className="input-field">
					<input type="text" placeholder="Email" name="r2" id="r2" />
				</div>
				<h4>Third Participant</h4>

				<div className="input-field">
					<input type="text" placeholder="Email" name="r3" id="r3" />
				</div>
			</div>
			<div className="action">
				<Button className="colorHilightBtn">Submit</Button>
			</div>
		</form>
	);
};

export default AddMembers;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { Button } from "reactstrap";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import "../StyleSheets/LoginRegister.css";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("student");
	const [id, setId] = useState("");
	const [name, setName] = useState("");

	const [confirmpassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		console.log(email, password, userType);
	});

	const handleRegister = () => {
		if (!email || !password || !confirmpassword) {
			alert("Fill all fields");
			return;
		}
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (res) => {
				console.log(res);
				const user = res.user;

				addDoc(collection(db, "User"), {
					name: name,
					id:id,
					email: email,
					userType: userType,
				});

				navigate("/");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	function handleClick() {
		navigate("/login");
	}

	return (
		<div className="register-form">
			<form>
				<h1>Register</h1>
				<div className="content">
					<div className="input-field">
						<select
							name="userType"
							id="userType"
							value={userType}
							onChange={(e) => setUserType(e.target.value)}
						>
							<option value="student">Student</option>
							<option value="teacher">Teacher</option>
						</select>
					</div>

					<div className="input-field">
						<input
							type="text"
							placeholder="Name"
							name="Name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div className="input-field">
						<input
							type="number"
							placeholder="Id"
							name="Id"
							id="id"
							value={id}
							onChange={(e) => setId(e.target.value)}
						/>
					</div>

					<div className="input-field">
						<input
							type="email"
							placeholder="Email"
							name="Email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-field">
						<input
							type="password"
							placeholder="Password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="input-field">
						<input
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							id="confirmpassword"
							value={confirmpassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
				</div>
				<div className="action">
					<Button className="colorHilightBtn" onClick={handleRegister}>
						Register
					</Button>
					<button onClick={handleClick}>Sign in</button>
				</div>
			</form>
		</div>
	);
};

export default Register;

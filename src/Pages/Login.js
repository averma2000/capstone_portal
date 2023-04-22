import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "../StyleSheets/LoginRegister.css";
// import Email from "./Sidebar";

const Login = () => {
	const navigate = useNavigate();

	function handleClick() {
		navigate("/register");
	}

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("student");

	const Navigate = useNavigate();

	useEffect(() => {
		console.log(email, password, userType);
	});

	const handleLogin = () => {
		if (!email || !password) {
			alert("Fill all fields");
			return;
		}
		signInWithEmailAndPassword(auth, email, password)
			.then(async (res) => {
				console.log(res);
				const user = res.user;
				// <Email email={ email} />
				Navigate("/");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	return (
		<form className="login-form">
			<h1>Login</h1>

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
						<option value="admin">Admin</option>
					</select>
				</div>
				<div className="input-field">
					<input
						type="email"
						placeholder="Email"
						autoComplete="nope"
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="input-field">
					<input
						type="password"
						placeholder="Password"
						autoComplete="new-password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
			</div>
			<div className="action">
				<button onClick={handleClick}>Register</button>
				<Button className="colorHilightBtn" onClick={handleLogin}>
					Sign in
				</Button>
			</div>
		</form>
	);
};

export default Login;

import React, { useCallback, useEffect, useState } from "react";

import "@fontsource/rubik";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import Sidebar from "./Pages/Sidebar";
import Navbar from "./Pages/navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { auth } from "./firebaseConfig";

function App() {
	const [isAuthenticate, setIsAuthenticate] = useState(false);

	useEffect(() => {
		console.log("is", auth);
		// auth.signOut();
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsAuthenticate(true);
			} else {
				setIsAuthenticate(false);
			}
		});
	});

	if (!isAuthenticate) {
		return (
			<Router>
				<ToastContainer />
				

				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Router>
		);
	} else {
		return (
			<Router>
				<ToastContainer />
				<Navbar />
				<Sidebar />
				
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Router>
		);
	}
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../StyleSheets/Sidebar.css";
import {
	addDoc,
	collection,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const Sidebar = () => {
	const currUserEmail = auth.currentUser.email;
	console.log(currUserEmail);

	const [menuToRender, setMenuToRender] = useState([]);

	const navigate = useNavigate();

	const userType = "student";

	function addelement() {
		var completelist = document.getElementById("list");
		if (userType == "student") {
			studentMenu.forEach((e) => {
				completelist.innerHTML +=`<li className="side-bar tmargin">
				<a href="#">
					<span className="glyphicon glyphicon-list">&nbsp;</span>
					${e.title}
				</a>
			</li>`
			});
			
		}
	}

	// teacher Menu
	const teacherMenu = [
		{
			title: "Dashboard",
			onClick: () => navigate("/"),

			path: "/",
		},
		{
			title: "Requests",
			onClick: () => navigate("/applied-jobs"),

			path: "/applied-jobs",
		},
		{
			title: "Lists",
			onClick: () => navigate("/posted-jobs"),
			icon: <i className="ri-file-list-2-line"></i>,
			path: "/posted-jobs",
		},
		{
			title: "Logout",
			onClick: () => {},

			path: "/login",
		},
	];

	//student Menu
	const studentMenu = [
		{
			title: "My Group",
			onClick: () => navigate("/posted-jobs"),

			path: "/posted-jobs",
		},
		{
			title: "Mentor",
			onClick: () => navigate("/posted-jobs"),

			path: "/posted-jobs",
		},
		{
			title: "Logout",
			onClick: () => {},

			path: "/login",
		},
	];

	//Admin Menu
	const adminMenu = [
		{
			title: "All Groups",
			onClick: () => navigate("/"),

			path: "/",
		},

		{
			title: "Teachers",
			onClick: () => navigate("/admin/jobs"),
			icon: <i className="ri-file-list-2-line"></i>,
			path: "/admin/jobs",
		},
	];

	return (
		<div className="menu">
			<div className="container-fluid">
				<div className="col-md-3">
					<div id="sidebar">
						<div className="container-fluid tmargin">
							<h3 className="heading-text">Capstone Portal</h3>
						</div>

						<ul className="nav navbar-nav side-bar" id="list">
							{addelement()}
							<li className="side-bar tmargin">
								<a href="#">
									<span className="glyphicon glyphicon-list">&nbsp;</span>
									Dashboard
								</a>
							</li>
							<li className="side-bar">
								<a href="#">
									<span className="glyphicon glyphicon-flag">&nbsp;</span>Purok
								</a>
							</li>
							<li className="side-bar">
								<a href="#">
									<span className="glyphicon glyphicon-star">&nbsp;</span>
									Blotter
								</a>
							</li>
							<li className="side-bar">
								<a href="#">
									<span className="glyphicon glyphicon-certificate">
										&nbsp;
									</span>
									Officials
								</a>
							</li>

							<li className="side-bar">
								<a href="#">
									<span className="glyphicon glyphicon-signal">&nbsp;</span>
									Statistics
								</a>
							</li>
							<li className="side-bar">
								<a href="#">
									<span className="glyphicon glyphicon-cog">&nbsp;</span>
									Settings
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../StyleSheets/Sidebar.css";
import { auth } from "../firebaseConfig";
import getUserType from "./getUserType";

const Sidebar = () => {
	const currUserEmail = auth.currentUser.email;
	console.log(currUserEmail);

	//student Menu
	const studentMenu = [
		{
			title: "My Group",
			path: "/mygroup",
		},
		{
			title: "Mentor",
			path: "/mentor",
		},
	];

	// teacher Menu
	const teacherMenu = [
		{
			title: "Dashboard",
			path: "/dashboard",
		},
		{
			title: "Requests",
			path: "requests",
		},
		{
			title: "List",
			path: "/list",
		},
	];

	//Admin Menu
	const adminMenu = [
		{
			title: "All Groups",
			path: "/allgroups",
		},
		{
			title: "Teachers",
			path: "teachers",
		},
	];

	function addelement(temp) {
		let dbtype;

		if (temp == "student") {
			dbtype = studentMenu;
		}
		if (temp == "teacher") {
			dbtype = teacherMenu;
		}
		if (temp == "admin") {
			dbtype = adminMenu;
		}

		return dbtype;
	}

	const uType = addelement("teacher");

	return (
		<div className="menu">
			<div className="container-fluid">
				<div className="col-md-3">
					<div id="sidebar">
						<div className="container-fluid ">
							<h3 className="heading-text">Capstone Portal</h3>
						</div>

						<ul className="nav navbar-nav side-bar" id="list">
							{uType.map((item) => (
								<li
									className="side-bar tmargin sidebar-item"
									id="title"
									key={item.path}
								>
									<Link to={item.path}>{item.title}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

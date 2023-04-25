import React, { useState } from "react";

import { Button } from "reactstrap";
import "../../StyleSheets/StudentGroup.css";

const ProjectDetails = () => {
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");

	return (
		<form className="project-details">
			<h1>Login</h1>

			<div className="content">
				<div className="input-field">
					<h4>Project Name</h4>
					<input
						type="text"
						placeholder="Project Name"
						name="projectName"
						id="projectName"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
					/>
				</div>
				<div className="text-area ">
					<h4>Project Description</h4>
					<textarea
						type="text"
						placeholder="Project Description"
						name="projectDescription"
						id="projectDescription"
						rows="10"
						cols="41"
						value={projectDescription}
						onChange={(e) => setProjectDescription(e.target.value)}
					/>
				</div>
			</div>
			<div className="action">
				<Button className="colorHilightBtn createjoinbtn">Submit</Button>
			</div>
		</form>
	);
};

export default ProjectDetails;

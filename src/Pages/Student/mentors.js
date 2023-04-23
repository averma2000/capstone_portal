import React from "react";

const Mentor = () => {
	const gMentor = "123456";

	if (gMentor == "") {
		return (
			<div className="page">
				<h1>Mentor not aloted to group</h1>
			</div>
		);
	} else {
		return (
			<div className="page">
				<h1>Mentor alloted to group</h1>
			</div>
		);
	}
};

export default Mentor;

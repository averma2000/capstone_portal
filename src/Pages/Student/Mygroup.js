import React from "react";

const Mygroup = () => {
	const Gid = "123456";

	if (Gid == "") {
		return (
			<div className="page">
				<h1>group id not available</h1>
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

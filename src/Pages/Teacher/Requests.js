import React from "react";
import { Button } from "reactstrap";

const Requests = () => {
	const tableStyle = {
		border: "1px solid black",
	};
	const thStyle = {
		border: "1px solid black",
		backgroundColor: "#eee",
	};

	const tdStyle = {
		border: "1px solid black",
		padding: "8px",
	};
	return (
		<div className="page">
			<h1>Welcome to Request page</h1>

			<h3>all requests from any group will be displayed here</h3>

			<table style={tableStyle}>
				<tr>
					<th style={tableStyle}>Project Name</th>
					<th style={tableStyle}>project Description</th>
					<th style={tableStyle}>-</th>
					<th style={tableStyle}>-</th>
					<th style={tableStyle}>-</th>
				</tr>
				<tr>
					<td style={tdStyle}>project 1</td>
					<td style={tdStyle}>project description 1</td>
					<td style={tdStyle}>
						<button>View</button>
					</td>
					<td style={tdStyle}>
						<button>Accept</button>
					</td>
					<td style={tdStyle}>
						<button>Reject</button>
					</td>
				</tr>
				<tr>
					<td style={tdStyle}>project 2</td>
					<td style={tdStyle}>project description 1</td>
					<td style={tdStyle}>
						<Button>View</Button>
					</td>
					<td style={tdStyle}>
						<Button>Accept</Button>
					</td>
					<td style={tdStyle}>
						<Button>Reject</Button>
					</td>
				</tr>
			</table>
		</div>
	);
};

export default Requests;

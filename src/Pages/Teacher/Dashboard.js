import React from "react";
import "../../StyleSheets/teacherDashboard.css";

const Dashboard = () => {
	return (
		<div className="page">
			<div class="wrapper">
				<div class="container">
					<div class="card">
						<header class="card-header">
							<h2 class="card-title">Card</h2>
						</header>
						<div class="card-body">
							<p class="card-content">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
								nec dolor sed leo sollicitudin molestie. Integer a imperdiet
								eros. In sagittis augue mauris, nec congue ipsum dignissim eu.
								Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
								posuere cubilia Curae; Vestibulum ante ipsum primis in faucibus
								orci luctus et ultrices posuere cubilia Curae; Aenean non mauris
								enim.
							</p>
						</div>
						<footer class="card-footer">
							<a href="#" class="card-link">
								Action
							</a>
						</footer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

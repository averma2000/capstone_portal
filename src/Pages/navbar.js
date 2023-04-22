import React ,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../StyleSheets/Sidebar.css";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Button } from "reactstrap";
import {auth} from "../firebaseConfig"


const Navbar = () => {

    const [isAuthenticate, setIsAuthenticate] = useState("");
    const nav = useNavigate();

    useEffect(() =>{
        auth.onAuthStateChanged(user =>{
          if(user){
            setIsAuthenticate(user)
          }else{
            setIsAuthenticate("")
          }
        })
      },[])

	async function handleLogout() {
		await auth.signOut();

		setIsAuthenticate(false);
		nav("/login");
	}

	return (
		<nav className="navbar navbar-inverse navbar-fixed-top mynavbar">
			<div className="container">
				<div className="navbar-header">
					<button
						className="navbar-toggle"
						data-toggle="collapse"
						data-target=".navbar-collapse"
					>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="navbar-brand" href="/">
						Dashboard
					</a>
				</div>
				<div className="collapse navbar-collapse">
					<ul className="nav navbar-nav navbar-right">
						<li>
							<a href="#">
								<span className="glyphicon glyphicon-user">&nbsp;</span>Hello
								User
							</a>
						</li>
						<li className="active">
							<a title="View Website" href="#">
								<span className="glyphicon glyphicon-globe"></span>
							</a>
						</li>
						<li>
							<Button className="logoutbtn" onClick={handleLogout}>Logout</Button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

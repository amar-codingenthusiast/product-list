import React from "react";
import { Link, NavLink, useNavigate} from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
	return (
		<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Product List
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/"
							>
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/about">
								About
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/contacts">
								Contacts
							</NavLink>
						</li>
					</ul>
					{localStorage.getItem("token") ? (
						<>
							<button
								className="btn btn-primary"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/login");
                                }}
							>
								Log out
							</button>
						</>
					) : (
						<NavLink
							className="btn btn-primary"
							role="button"
							to="/login"
						>
							Login
						</NavLink>
					)}
				</div>
			</div>
		</nav>
	);
}

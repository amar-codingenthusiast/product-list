import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate();
	const [cred, setCred] = useState({
		email: "eve.holt@reqres.in",
		password: "pistol",
	});
	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const [hidePassword, setHidePassword] = useState(true);

	const onChange = (e) => {
		setCred({ ...cred, [e.target.name]: e.target.value });
	};

	const login = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`https://reqres.in/api/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: cred.email,
					password: cred.password,
				}),
			});
			const json = await response.json();
			if (response.ok && json.token) {
				localStorage.setItem("token", json.token);
				setMessage("Login successful!");
				setIsError(false);
				setTimeout(() => {
					navigate("/");
				}, 2000);
			} else {
				setMessage("Login failed. Please check your credentials.");
				setIsError(true);
			}
		} catch (error) {
			setMessage("An error occurred. Please try again later.");
			setIsError(true);
		}
	};

	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: "80.8vh" }}
		>
			<div
				style={{
					height: "370px",
					width: "350px",
					padding: "10px",
					borderRadius: "10px",
					boxShadow: "0 0 10px black",
				}}
			>
				<h4
					style={{ textAlign: "center", textDecoration: "underline" }}
				>
					Login Page
				</h4>
				<form onSubmit={login}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address*
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="your email"
							value={cred.email}
							onChange={onChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password*
						</label>
						<input
							type={hidePassword ? "password" : "text"}
							className="form-control"
							id="password"
							name="password"
							placeholder="your password"
							value={cred.password}
							onChange={onChange}
							required
						/>
					</div>
                    <div className="mb-3 form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="passwordCheck"
							style={{ cursor: "pointer" }}
							checked={hidePassword}
							onChange={() => setHidePassword(!hidePassword)}
						/>
						<label
							className="form-check-label"
							htmlFor="passwordCheck"
							style={{ cursor: "pointer" }}
						>
							Hide password
						</label>
					</div>
					<button
						type="submit"
						className="btn btn-primary"
					>
						Login
					</button>
					{message && (
						<div
							className={`alert mt-3 p-2 ${isError ? "alert-danger" : "alert-success"}`}
							role="alert"
						>
							{message}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

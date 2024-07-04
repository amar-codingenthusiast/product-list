import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import { Contacts } from "./Components/Contacts";
import { Login } from "./Components/Login";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";

function App() {
	return (
		<Router basename="product-list">
			<Navbar/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/login" element={<Login />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddProduct } from "./AddProduct";
import { Search } from "./Search";

export const Home = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/login");
		}
		const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
		setProducts(storedProducts);
		setFilteredProducts(storedProducts);
		// eslint-disable-next-line
	}, []);

	const addProduct = (newProduct) => {
		const isDuplicate = products.some(
			(product) =>
				product.name.toLowerCase() === newProduct.name.toLowerCase()
		);
		if (isDuplicate) {
			setErrorMessage("Product name already exists.");
			setTimeout(() => {
				setErrorMessage("");
			}, 2000);
		} else {
			const updatedProducts = [...products, newProduct];
			setProducts(updatedProducts);
			setFilteredProducts(updatedProducts);
			localStorage.setItem("products", JSON.stringify(updatedProducts));
			setErrorMessage("");
		}
	};

	const deleteProduct = (index) => {
		const updatedProducts = products.filter((_, i) => i !== index);
		setProducts(updatedProducts);
		setFilteredProducts(updatedProducts);
		localStorage.setItem("products", JSON.stringify(updatedProducts));
	};

	const handleSearch = (query) => {
		if (query) {
			const filtered = products.filter((product) =>
				product.name.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredProducts(filtered);
		} else {
			setFilteredProducts(products);
		}
	};

	return (
		<div className="container my-3">
			<AddProduct addProduct={addProduct} errorMessage={errorMessage} />
			<hr />
			<div className="col-12 d-flex justify-content-between align-items-center mb-3">
				<h2>Product List</h2>
				<Search search={handleSearch} />
			</div>
			<div className="col-12" style={{ minHeight: "57.3vh" }}>
				{filteredProducts.length === 0 ? (
					<div
						className="d-flex justify-content-center align-items-center"
						style={{ height: "50vh" }}
					>
						<h2>No Product Found</h2>
					</div>
				) : (
					<div>
						{filteredProducts.map((product, index) => (
							<div key={index} className="col-12 mb-2">
								<div className="card">
									<div className="card-body d-flex justify-content-between align-items-center gap-4">
										<h5 style={{ width: "200px" }}>
											{product.name}
										</h5>
										<b style={{ width: "100px" }}>
											&#8377;{product.price}
										</b>
										<button
											className="btn btn-danger"
											onClick={() => deleteProduct(index)}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

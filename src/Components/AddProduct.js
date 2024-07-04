import { useState } from "react";

export const AddProduct = ({ addProduct, errorMessage }) => {
	const [newProduct, setNewProduct] = useState({ name: "", price: "" });

	const handleChange = (e) => {
		setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newProduct.name && newProduct.price) {
			addProduct(newProduct);
			setNewProduct({ name: "", price: "" });
		}
	};

	return (
		<div className="d-flex justify-content-between align-items-center">
			<h2>Add A New Product</h2>
			<form
				className="row align-items-center ms-3 my-3"
				style={{ flexGrow: 1 }}
				onSubmit={handleSubmit}
			>
				<div className="col-6">
					<input
						type="text"
						className="form-control"
						placeholder="Product name"
						name="name"
						value={newProduct.name}
						onChange={handleChange}
					/>
				</div>
				<div className="col-4">
					<input
						type="number"
						className="form-control"
						placeholder="Price"
						name="price"
						value={newProduct.price}
						onChange={handleChange}
					/>
				</div>
				<div className="col-2">
					<button type="submit" className="btn btn-primary w-100">
						Add
					</button>
				</div>
			</form>
			{errorMessage && (
				<div
					style={{
						position: "absolute",
						top: "130px",
						right: "420px",
						color: "red",
					}}
				>
					{errorMessage}
				</div>
			)}
		</div>
	);
};

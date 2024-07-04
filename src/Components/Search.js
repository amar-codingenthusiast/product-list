export const Search = ({ search }) => {
	return (
		<form className="d-flex" role="search">
			<input
				className="form-control"
				type="search"
				placeholder="Search by name"
				aria-label="Search"
				onChange={(e) => search(e.target.value)}
			/>
		</form>
	);
};

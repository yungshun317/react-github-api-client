import React, { useState, useEffect } from "react";

// [4] Create the custom hook for reusability
export function useFetch(uri) {
    // Success
	const [data, setData] = useState();
	// Error
	const [error, setError] = useState();
	// Pending
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!uri) return;
		fetch(uri)
		    .then(data => data.json())
		    .then(setData)
		    .then(() => setLoading(false))
		    .catch(setError);
	}, [uri]);

	return {
		loading,
		data,
		error
	};
}
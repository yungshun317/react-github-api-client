import React, { useState, useEffect, useCallback, useMemo } from "react";

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

// [7] Iterate through any array of objects
export const useIterator = (
	items = [],
	initialIndex = 0
) => {
    const [i, setIndex] = useState(initialIndex);
    
    // `useCallback` returns its function when the dependencies change
    const prev = useCallback(() => {
    	if (i === 0) return setIndex(items.length - 1);
    	setIndex(i - 1);
    }, [i]);

    const next = useCallback(() => {
    	if (i === items.length - 1) return setIndex(0);
    	setIndex(i + 1);
    }, [i]);

    // `useMemo` calls its function and returns the result
    const item = useMemo(() => items[i], [i]);

    return [item || items[0], prev, next];
}
import React, { useState, useEffect } from "react";

import { useFetch } from "./hooks";

/* [2] Cache data locally for offline usage and performance bump
const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function GitHubUser({ login }) {
	const [data, setData] = useState(loadJSON(`user:${login}`));

	useEffect(() => {
		if (!data) return;
		if (data.login === login) return;
		const { name, avatar_url, location } = data;
        saveJSON(`user:${login}`, {
        	name,
        	login,
        	avatar_url,
        	location
        });
    }, [data]);

    // [1] `fetch` will be called after the render
    useEffect(() => {
    	if (!login) return;
    	if (data && data.login === login) return;
		fetch(`https://api.github.com/users/${login}`)
		    .then(response => response.json())
		    .then(setData)
		    .catch(console.error);
	}, [login]);

	if (data) return <pre>{JSON.stringify(data, null, 2)}</pre>;
	return null;
}
*/

// [3] Handle promise states
function GitHubUser({ login }) {
	const { loading, data, error } = useFetch(
		`https://api.github.com/users/${login}`
	);

	if (loading) return <h1>loading...</h1>;
	if (error) return <pre>{JSON.stringify(data, null, 2)}</pre>;

	return (
		<div className="githubUser">
		    <img
		        src={data.avatar_url}
		        alt={data.login}
		        style={{ width: 200 }}
		    />
		    <div>
		        <h1>{data.login}</h1>
		        {data.name && <p>{data.name}</p>}
		        {data.location && <p>{data.location}</p>}
		    </div>
		</div>
	)
}

export default function App() {
	return <GitHubUser login="yungshun317" />;
}
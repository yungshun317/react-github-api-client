import React from "react";

import RepoMenu from "./RepoMenu";
import Fetch from "./Fetch";

// [9] Request a list of a GitHub user's repositories and pass it to `RepoMenu` once received
export default function UserRepositories({
	login,
	selectedRepo,
	onSelect = f => f
}) {
	return (
		<Fetch
		    uri={`https://api.github.com/users/${login}/repos`}
		    renderSuccess={({ data }) => (
		    	<RepoMenu
		    	    login={login}
		    	    repositories={data}
		    	    selectedRepo={selectedRepo}
		    	    onSelect={onSelect}
		    	/>
		    )}
		/>
	);
}
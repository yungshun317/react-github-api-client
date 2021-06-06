import React, { useState, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "regenerator-runtime/runtime";

// [10] 
export default function RepositoryReadme({ repo, login }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [markdown, setMarkdown] = useState("");

	const loadReadme = async (login, repo) => {
		setLoading(true);
		const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
		const { download_url } = await fetch(uri).then(res => res.json());
        const markdown = await fetch(download_url).then(res => res.text());
		setMarkdown(markdown);
		setLoading(false);
	};

	useEffect(() => {
		//if (!repo || !login) return;
		loadReadme(login, repo).catch(setError);
	}, [repo]);

	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
	if (loading) return <p>Loading...</p>;

	return <ReactMarkdown children={markdown} />;
}
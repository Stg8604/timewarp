import React, { FC } from "react";

const NotFound: FC = () => {
	return (
		<div className="notFound">
			<div className="noise"></div>
			<div className="overlay"></div>
			<div className="terminal">
				<h1>
					<span className="text-[#4bd0e8]">Error</span>{" "}
					<span className="errorcode">404</span>
				</h1>
				<p className="output">
					The page you are looking for might have been removed, had its name
					changed or is temporarily unavailable.
				</p>
				<p className="output">
					Please try to <a href="/">return to the homepage</a>.
				</p>
				<p className="output">Good luck.</p>
			</div>
		</div>
	);
};

export default NotFound;

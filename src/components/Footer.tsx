import React, { FC } from "react";

const Footer: FC = () => {
	return (
		<div className="orbitron flex items-center justify-between p-6 bg-black">
			<div className="flex flex-col items-center justify-center">
				<div>Abhinav Reddy</div>
				<div>+91 88707 44029</div>
			</div>
			<div>
				MADE WITH ❤️ BY{" "}
				<a href="https://delta.nitt.edu" className="text-[#25B016]">
					DELTA FORCE
				</a>
			</div>
			<div className="flex flex-col items-center justify-center">
				<div>Raghavan</div>
				<div>+91 99401 07606</div>
			</div>
		</div>
	);
};

export default Footer;

import React from "react";

interface CardProps {
	onClick: () => void;
}

const Card: React.FC<CardProps> = ({ onClick }) => {
	return (
		<>
			<img
				className="hover:scale-110 duration-75"
				src="assets/Dashboard/lobby.svg"
				alt=""
				style={{
					width: "40%",
					position: "relative",
					left: "-0.05%",
					top: "-2%",
					cursor: "pointer",
				}}
				onClick={onClick}
			/>
		</>
	);
};

export default Card;

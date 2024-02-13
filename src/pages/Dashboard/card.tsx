import React from "react";

interface CardProps {
	onClick: () => void;
}

const Card: React.FC<CardProps> = ({ onClick }) => {
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
					height: "auto",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						height: "auto",
					}}
				>
					<img
						className="hover:scale-110 duration-75"
						src="assets/Dashboard/lobby.svg"
						alt=""
						style={{
							width: "43%",
							position: "relative",
							left: "-0.05%",
							top: "-2%",
							cursor: "pointer",
						}}
						onClick={onClick}
					/>
				</div>
			</div>
		</>
	);
};

export default Card;

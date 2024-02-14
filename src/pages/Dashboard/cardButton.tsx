import React from "react";

interface CardButtonProps {
	text: string;
	onClick: () => void;
}

const CardButton: React.FC<CardButtonProps> = ({ text, onClick }) => {
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
						className="shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] rounded-[12%]"
						src="assets/Dashboard/card.svg"
						alt=""
						style={{ width: "65%" }}
					/>
					<img
						src="assets/Dashboard/button.svg"
						alt=""
						style={{
							width: "25%",
							position: "relative",
							top: "-48%",
							left: "0.1%",
							cursor: "pointer",
							scale: "1.2",
						}}
						onClick={onClick}
					/>
					<text
						onClick={onClick}
						style={{
							zIndex: "2",
							position: "relative",
							top: "-60%",
							fontSize: "95%",
							fontFamily: "pixelifySans",
							borderStyle: "none",
							fontWeight: "bold",
							userSelect: "none",
							cursor: "pointer",
							border: "none",
							color: "white",
						}}
					>
						{text}
					</text>
				</div>
			</div>
		</>
	);
};

export default CardButton;

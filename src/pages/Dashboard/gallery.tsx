import React, { useEffect, useState } from "react";

interface GalleryProps {
	onClick: () => void;
}

const sceneAssetsMap: { [key: string]: string } = {
	"Nature's Sound": "assets/Dashboard/WaterMorse.svg",
	Lobby: "assets/Dashboard/play.svg",
	"Mysterious Music": "assets/Dashboard/Sound.svg",
	Cipher: "assets/Dashboard/RevEng.svg",
	"Cryptic Paintings": "assets/Dashboard/Steg.svg",
	"Email": "assets/Dashboard/Computer.svg",
	"He Who Emotes": "assets/Dashboard/Emoji.svg",
	InterceptorX: "assets/Dashboard/Interceptor.svg",
	"Turret Defence": "assets/Dashboard/trap.svg",
	Tutorial: "assets/Dashboard/Tutorial.svg"
};

const Gallery: React.FC<GalleryProps> = ({ onClick }) => {
	const [scene, setScene] = useState<string>("Lobby");

	useEffect(() => {
		setScene(localStorage.getItem("scene") ?? "Lobby");
	}, []);
	return (
		<>
			{true && (
				<img
					className="hover:scale-110 duration-75"
					src={sceneAssetsMap[scene]}
					alt=""
					style={{
						width: "40%",
						position: "relative",
						left: "-1%",
						top: "-8%",
						cursor: "pointer",
					}}
					onClick={onClick}
				/>
			)}
		</>
	);
};

export default Gallery;

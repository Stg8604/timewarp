import React, { useEffect, useState } from "react";

interface GalleryProps {
	onClick: () => void;
}

const sceneAssetsMap: { [key: string]: string } = {
	WaterMorse: "assets/Dashboard/WaterMorse.svg",
	Lobby: "assets/Dashboard/lobby.svg",
	SoundPuzzle: "assets/Dashboard/Sound.svg",
	Cipher: "assets/Dashboard/RevEng.svg",
	Steg: "assets/Dashboard/Steg.svg",
	Computer: "assets/Dashboard/Computer.svg",
	Emoji: "assets/Dashboard/Emoji.svg",
	InterceptorX: "assets/Dashboard/Interceptor.svg",
};

const Gallery: React.FC<GalleryProps> = ({ onClick }) => {
	const [scene, setScene] = useState<string>("Lobby");

	useEffect(() => {
		setScene(localStorage.getItem("scene") ?? "Computer");
	}, []);
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
					{true && (
						<img
							className="hover:scale-110 duration-75"
							src={sceneAssetsMap[scene]}
							alt=""
							style={{
								width: "43%",
								position: "relative",
								left: "-1%",
								top: "-8%",
								cursor: "pointer",
							}}
							onClick={onClick}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Gallery;

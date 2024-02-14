import React, { FC, useEffect, useState } from "react";
import Glow from "/assets/glow3.png";
import Tick from "/assets/tick.mp3";
import P1 from "/assets/player.png";
import P3 from "/assets/pShoot.png";
import { motion } from "framer-motion";

const Home: FC = () => {
	const audio = new Audio(Tick);
	const [text, setText] = useState("TIME WARP");
	const [current, setCurrent] = useState("TIME WARP");
	const [anim, setAnim] = useState(false);
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	useEffect(() => {
		let iterations = -12;
		// audio.play()
		const interval = setInterval(() => {
			let temp = "";
			for (let i = 0; i < current.length; i++) {
				if (i * 12 < iterations) {
					temp += text[i];
					if (i == current.length - 1) {
						setAnim(true);
						setText("TIME WARP");
					}
				} else if (text[i] == " ") {
					temp += " ";
				} else {
					temp += letters[Math.floor(Math.random() * 26)];
				}
			}
			setText(temp);
			if (iterations >= text.length * 30) {
				clearInterval(interval);
				// audio.pause()
			}
			iterations += 1;
		}, 20);

		return () => {
			clearInterval(interval);
			setText("TIME WARP");
			setAnim(false);
		};
	}, []);

	return (
		<div className="w-full flex justify-center items-center mono text-[80px] h-[calc(100vh-70px)] relative ">
			<div className="relative flex flex-col justify-center items-center">
				<div className="mb-[12rem] text-[5.5rem]">
					<span>{text.slice(0, 4)}</span>
					<span className="text-[#22D1EE]">{text.slice(4, 9)}</span>
				</div>
				<div>
					{anim && (
						<motion.div
							initial={{
								y: -30,
								opacity: 0,
							}}
							whileInView={{
								y: -205,
								opacity: 1,
							}}
							viewport={{
								once: true,
							}}
							transition={{
								ease: "easeInOut",
								duration: 1.5,
							}}
							className="mono absolute text-[1.6rem] w-full left-0 text-center"
						>
							1S AND 0S THROUGH TIME
						</motion.div>
					)}
				</div>
				{/* <span>
        TIME &nbsp;
     </span>
     <span className='text-[#22D1EE]'>
        WARP
     </span> */}
				<img
					src={Glow}
					alt="glow"
					className="scale-[3] absolute top-[-200px] right-[-200px]"
				/>
			</div>
			{anim && (
				<div>
					<img
						src={P1}
						className="absolute bottom-[0px] right-[-150px] transition-all opacity-0 fadeInEle"
					/>
					<img
						src={P3}
						className="scale-[0.8] absolute bottom-[-100px] left-[-150px] transition-all opacity-0 fadeInEle"
					/>
				</div>
			)}
		</div>
	);
};

export default Home;

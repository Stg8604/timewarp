import { FC } from "react";
import Gamers from "/assets/Gamers.png";
import PlayerRun from "/assets/player1.png";
import Glow from "/assets/glow3.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Time: FC = () => {
	const navigate = useNavigate();
	return (
		<div className="mont p-5 h-[80vh] relative flex items-center">
			<motion.div
				initial={{
					x: -100,
					opacity: 0,
				}}
				whileInView={{
					x: 0,
					opacity: 1,
				}}
				viewport={{
					once: true,
				}}
				transition={{
					ease: "easeInOut",
					duration: 1.5,
				}}
				className="w-[60%] flex justify-center relative"
			>
				<div className="relative">
					<img
						src={PlayerRun}
						alt="gameplay"
						className="absolute top-[-350px] left-[-70px] "
					/>
					<img src={Gamers} alt="gameplay" className="" />
				</div>
			</motion.div>
			<motion.div
				initial={{
					x: 100,
					opacity: 0,
				}}
				whileInView={{
					x: 0,
					opacity: 1,
				}}
				viewport={{
					once: true,
				}}
				transition={{
					ease: "easeInOut",
					duration: 1.5,
				}}
				className="w-[40%] flex flex-col gap-2 pl-8 pb-8"
			>
				<div className="items-start justify-center text-[3.2rem]">
					<span className="text-[#22D1EE] mr-3">Unscramble</span>
					<span>The Clues</span>
				</div>
				<div className="Outfit font-thin w-[80%]">
					Use any tool in your disposal
				</div>
				<div className="eleHover w-[200px] mt-10">
					<button
						className="landingButton flex p-2 w-full justify-center items-center gap-2 text-black text-[1.2rem] font-light mont"
						onClick={() => navigate("/login")}
					>
						Get Crackin' Now
					</button>
				</div>
			</motion.div>

			<img
				src={Glow}
				alt="glow"
				className=" w-[180%] h-[180%] absolute top-[-315px] left-[-330px] z-[1]"
			/>
		</div>
	);
};

export default Time;

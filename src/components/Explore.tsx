import { FC } from "react";
import Gameplay from "/assets/gamePlay.png";
import Glow from "/assets/glow2.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Explore: FC = () => {
	const navigate = useNavigate();
	return (
		<div className="mont p-10 flex h-[70vh] relative">
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
				className="w-[50%] flex flex-col gap-2"
			>
				<div className="flex flex-col items-start justify-center text-[4rem]">
					<span>Explore</span>
					<span className="text-[#22D1EE]">Timelines</span>
				</div>
				<div className="Outfit font-thin w-[80%]">
					Aenean non vulputate quam, eu dictum est. Aliquam erat volutpat.
					Suspendisse bibendum felis ullamcorper mauris ullamcorper
				</div>
				<div className="eleHover w-[200px] mt-10">
					<button
						className="landingButton flex pt-2 pb-2 w-full justify-center items-center gap-2 text-black text-[1.2rem] font-light mont"
						onClick={() => navigate("/login")}
					>
						Go To Lobby
					</button>
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
				className="w-[50%] flex justify-center relative"
			>
				<div>
					<img src={Gameplay} alt="gameplay" className="" />
				</div>
			</motion.div>
			<img
				src={Glow}
				alt="glow"
				className=" w-[140%] h-[140%] absolute top-[-250px] right-[-115px] z-[-1]"
			/>
		</div>
	);
};

export default Explore;

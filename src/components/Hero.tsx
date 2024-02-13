import { FC } from "react";
import Player from "/assets/player.png";
import Glow from "/assets/glow4.png";
import Polygon from "/assets/Ploygon.png";
import ArrowRight from "/assets/arrow-right.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero: FC = () => {
	const navigate = useNavigate();
	return (
		<div className="h-[95vh] p-10 relative flex w-screen">
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ y: 0, opacity: 1 }}
				viewport={{
					once: true,
				}}
				transition={{ ease: "easeOut", duration: 1.2 }}
				className="w-[60%] h-full flex flex-col gap-[7rem] justify-center items-start"
			>
				<div className="text-[4rem] font-bold leading-[70px] tracking-wider">
					CODE YOUR WAY THROUGH
				</div>
				<div className="text-[1.2rem] font-thin w-[80%]">
					Hurry to join the journey and solve the puzzles as fast as you can
				</div>
			</motion.div>
			<div className="w-full h-[100vh] absolute top-0 left-0 flex justify-center items-center ">
				<motion.div
					initial={{
						scale: 0,
					}}
					whileInView={{
						scale: 1,
					}}
					viewport={{
						once: true,
					}}
					transition={{
						delay: 1.8,
						duration: 1,
					}}
				>
					<img src={Player} alt="hero" className="mb-20" />
				</motion.div>
				<img
					src={Glow}
					alt="glow"
					className="w-[140%] h-[140%] absolute top-[-20%] right-[-30%]"
				/>
			</div>
			<motion.div
				initial={{ opacity: 0, y: 75 }}
				whileInView={{ y: 0, opacity: 1 }}
				viewport={{
					once: true,
				}}
				transition={{ ease: "easeOut", duration: 1.5 }}
				className="w-[40%] relative flex justify-center items-center"
			>
				{/* <div> */}
				<img
					src={Polygon}
					alt="glow"
					className="ml-[140px] mb-[140px] absolute z-[-1]"
				/>
				<div className="relative">
					<div className="glass pt-2 pl-2 pb-2 pr-12 flex flex-col items-start justify-start  relative clipBox">
						<div className="text-[2rem] font-thin">FEBRUARY</div>
						<div className="text-[#22D1EE] text-[3rem] ml-4 font-thin">15</div>
						<div className="w-[calc(50%+1px)] h-[calc(40%+1px)] absolute bottom-0 right-0 border-2 z-[1] border-[#ffffff27] bg-transparent"></div>
					</div>
					<div className="eleHover absolute bottom-0 right-0 w-[calc(50%+1px)] h-[calc(40%+1px)] flex justify-center items-center pt-4 pl-4">
						<button
							className=" absolute flex bottom-[1px] pt-2 pb-2 left-[10px] w-[200%] justify-center items-center gap-2 text-[1.2rem] font-thin mont"
							onClick={() => navigate("/login")}
						>
							Join The Journey
							<img src={ArrowRight} alt="arrow" className="ml-1 opacity-0" />
						</button>
					</div>
				</div>

				{/* </div> */}
			</motion.div>
		</div>
	);
};

export default Hero;

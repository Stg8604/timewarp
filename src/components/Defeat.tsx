import { FC } from "react";
// import Shoot from '../assets/Shoot1.png'
import Complete from "/assets/complete.png";
import Glow from "/assets/glow2.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Defeat: FC = () => {
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
					<span className="text-[#22D1EE]">Race</span>
					<span>Against Time</span>
				</div>
				<div className="Outfit font-thin w-[80%]">
					Nothing is unsolvable, with enough time. But will there be enough time
					?
				</div>
				<div className="eleHover w-[260px] mt-10">
					<button
						className="landingButton flex p-2 w-full justify-center items-center gap-2 text-black text-[1.2rem] font-light mont"
						onClick={() => navigate("/login")}
					>
						Are You Ready ?
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
				<div className=" relative">
					<img src={Complete} alt="gameplay" className="" />
					{/* <img src={PlayerEnemies} alt='gameplay' className='scale-[0.8] absolute top-[-25%] left-[-60px]' /> */}
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

export default Defeat;

import { FC } from "react";
import P1 from "/assets/p1.png";
import P2 from "/assets/p2.png";
import P3 from "/assets/p3.png";
import Glow from "/assets/glow4.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const End: FC = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col justify-center items-center h-[65vh] mt-[14rem]">
			<div className="w-[600px] flex justify-center items-center noSelect">
				<motion.div
					className="absolute z-10 translate-x-[-100px] flex justify-center items-center"
					initial={{
						y: 50,
						x: -100,
						opacity: 0,
					}}
					whileInView={{
						y: 0,
						x: -100,
						opacity: 1,
					}}
					viewport={{
						once: true,
					}}
					transition={{
						ease: "easeInOut",
						duration: 1.5,
					}}
				>
					<img src={P1} />
				</motion.div>
				<motion.div
					initial={{
						y: 50,
						x: 0,
						opacity: 0,
					}}
					whileInView={{
						x: -150,
						y: 0,
						opacity: 1,
					}}
					viewport={{
						once: true,
					}}
					transition={{
						ease: "easeInOut",
						duration: 1.5,
					}}
					className="absolute translate-x-[-150px] z-0 flex justify-center items-center noSelect"
				>
					<img src={P2} />
				</motion.div>
				<motion.div
					initial={{
						y: 50,
						x: 0,
						opacity: 0,
					}}
					whileInView={{
						x: 40,
						y: 0,
						opacity: 1,
					}}
					viewport={{
						once: true,
					}}
					transition={{
						ease: "easeInOut",
						duration: 1.5,
					}}
					className="absolute translate-x-[40px] z-0 flex justify-center items-center noSelect"
				>
					<img src={P3} />
				</motion.div>

				<div className="h-[800px] w-[100vw] overflow-hidden absolute flex justify-center items-center">
					<img src={Glow} className="absolute z-0" />
				</div>
			</div>
			<div className="eleHover w-[300px] ml-[120px] mt-[200px]">
				<button
					className="landingButton flex pt-2 pb-2 w-full absolute justify-center items-center gap-2 text-black text-[1.2rem] font-light mont"
					onClick={() => navigate("/login")}
				>
					Begin
				</button>
			</div>
		</div>
	);
};

export default End;

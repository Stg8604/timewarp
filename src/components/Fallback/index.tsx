import Glow from "/assets/glow4.png";

const Fallback = () => {
	return (
		<div className=" h-screen w-full  text-white relative flex justify-center items-center">
			<h1 className="orbitron text-[2rem] w-[80%] text-center">
				You Clipped into the never Ending VOID. Try something Different
			</h1>
			<img
				src={Glow}
				className="scale-[2] absolute top-0 left-0 w-full h-full"
			/>
		</div>
	);
};

export default Fallback;

import { useAppDispatch } from "@stores/hooks";
import { toggleInfo } from "../../../slices/Steg/steg";
import StegInfoImage from "/assets/steg/scrolls.png";

const StegInfo = (props: { text: string }) => {
	const dispatch = useAppDispatch();

	return (
		<div className="absolute flex justify-center items-center h-screen w-screen z-50">
			<div className="relative">
				<img
					src={StegInfoImage}
					alt="Steg Info"
					className="w-[50vh] rounded-lg"
				/>
				<div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-white text-center">
					<div style={{ maxWidth: "80%", marginBottom: "3rem" }}>
						<span className="font-pixelifySans" style={{ color: "black" }}>
							{props.text}
						</span>
					</div>
					<div>
						<button
							onClick={() => dispatch(toggleInfo())}
							className="bg-red/70 px-2 py-1 mx-auto rounded-lg"
						>
							CLOSE
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StegInfo;

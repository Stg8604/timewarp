import { useAppDispatch } from "@stores/hooks";

const HintBox = (props: {
	text: string;
	onClose: () => void;
	image: string;
}) => {
	const dispatch = useAppDispatch();

	return (
		<div className="absolute flex justify-center items-center h-screen w-screen z-50 bg-black/30">
			<div className=" bg-black/50 backdrop-blur-sm border border-black select-none animate-fadeIn font-pixelifySans leading-5 text-white text-center flex flex-col gap-5 w-[50vh] rounded-lg px-10 py-5">
				<span>{props.text}</span>
				<div>
					<img src={props.image}></img>
				</div>
				<button
					onClick={() => props.onClose()}
					className="bg-red text-white px-2 py-1 mx-auto rounded-lg"
				>
					CLOSE
				</button>
			</div>
		</div>
	);
};

export default HintBox;

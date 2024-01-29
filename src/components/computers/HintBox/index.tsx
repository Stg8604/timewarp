import { useAppDispatch } from "@stores/hooks";
import { toggleInfo } from "../../../slices/computer/computer";

const HintBox = (props: { text: string }) => {
	const dispatch = useAppDispatch();

	return (
		<div className="absolute flex justify-center items-center h-screen w-screen z-50">
			<div className=" bg-computerhintbox border border-black select-none animate-fadeIn font-pixelifySans leading-5 text-grey text-center flex flex-col gap-5 w-[50vh] rounded-lg px-10 py-5">
				<span>{props.text}</span>
				<button
					onClick={() => dispatch(toggleInfo())}
					className="bg-red text-white px-2 py-1 mx-auto rounded-lg"
				>
					CLOSE
				</button>
			</div>
		</div>
	);
};

export default HintBox;

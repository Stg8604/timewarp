import { useAppDispatch } from "@stores/hooks";
import { toggleInfo, toggleLore } from "@slices/Lobby/Lobby";

const TextBox = (props: { text: string; type: string }) => {
	const dispatch = useAppDispatch();

	return (
		<div className="absolute flex justify-center items-center h-screen w-screen z-50">
			<div className=" bg-tutorialUiBlue/80 border border-whites select-none animate-fadeIn font-pixelifySans leading-5 text-white text-center flex flex-col gap-5 w-[50vh] rounded-lg px-10 py-5">
				<span>{props.text}</span>
				<button
					onClick={() => {
						if (props.type === "info") dispatch(toggleInfo());
						else if (props.type === "lore") dispatch(toggleLore());
					}}
					className="bg-red/70 px-2 py-1 mx-auto rounded-lg"
				>
					CLOSE
				</button>
			</div>
		</div>
	);
};

export default TextBox;

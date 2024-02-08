import compbg from "/assets/Emoji/compbg.svg";
type MainPortalProps = {
	ClueHeading: string;
	ClueText: string;
	handleClose: () => void;
};
const MainPortal = (props: MainPortalProps) => {
	return (
		<>
			<div className="absolute h-full w-full flex flex-col justify-center items-center bg-black/30 z-50">
				<div className=" flex flex-col gap-5 justify-center items-center bg-tutorialUiBlue/80 border border-whites backdrop-blur-sm text-white rounded-md h-[50vh] w-[90vh] aspect-square font-pixelifySans">
					<div className="font-pixelifySans">{props.ClueHeading}</div>
					<pre>{props.ClueText}</pre>
					<button
						onClick={props.handleClose}
						className="bg-red/70 px-2 py-1 mx-auto rounded-lg"
					>
						CLOSE
					</button>
				</div>
			</div>
		</>
	);
};

export default MainPortal;

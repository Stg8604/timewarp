import { useAppDispatch } from "@stores/hooks";
import { toggleLeverInfo } from "../../../slices/computer/computer";

const MSTweight = (props: { text: string }) => {
	const dispatch = useAppDispatch();

	// const userEdgeList = useAppSelector(
	// 	(state) => state.computer.params.userEdgeList as Edge[]
	// );

	// const handleSubmit = () => {
	// 	const tempPuzzleSol = computeTempPuzzleSol(userEdgeList);
	// 	dispatch(updateUserParams(tempPuzzleSol));
	// 	dispatch(toggleLeverInfo());
	// };

	// const computeTempPuzzleSol = (edges: Edge[]) => {
	// 	const tempPuzzleSol = edges.map((edge) => ({
	// 		...edge,
	// 		weight: Math.random() * 10,
	// 	}));

	// 	console.log("tempPuzzleSol:", tempPuzzleSol);
	// 	return tempPuzzleSol;
	// };

	return (
		<div className="absolute flex justify-center items-center h-screen w-screen z-50">
			<div className=" bg-computerhintbox border border-black select-none animate-fadeIn font-pixelifySans leading-5 text-grey text-center flex flex-col gap-5 w-[50vh] rounded-lg px-10 py-5">
				<span>{props.text}</span>
				<button
					onClick={() => dispatch(toggleLeverInfo())}
					className="bg-green text-white px-2 py-1 mx-auto rounded-lg"
				>
					SUBMIT
				</button>
				<button
					onClick={() => dispatch(toggleLeverInfo())}
					className="bg-red text-white px-2 py-1 mx-auto rounded-lg"
				>
					CLOSE
				</button>
			</div>
		</div>
	);
};

export default MSTweight;

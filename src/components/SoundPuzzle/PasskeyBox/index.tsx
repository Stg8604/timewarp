import { useAppDispatch } from "@stores/hooks";
import { useState } from "react";
import { togglePortalKey } from "../../../slices/SoundPuzzle/soundPuzzle";
import { checkSolution } from "../../../slices/SoundPuzzle/soundPuzzleActions";
import { Toast } from "../..";
import { TOAST_ERROR, TOAST_SUCCESS } from "@utils/ToastStatus";

const PasskeyBox = () => {
	const [passkey, setPasskey] = useState("");
	const dispatch = useAppDispatch();

	return (
		<div className="absolute h-full w-full flex flex-col justify-center items-center">
			<div className=" flex flex-col gap-5 justify-center items-center bg-black/50 border border-tutorialPortalGreen backdrop-blur-sm text-white rounded-md w-[40vh] aspect-square font-pixelifySans">
				<span className="text-xl">ENTER PASSKEY</span>
				<input
					type="number"
					value={passkey}
					onChange={(e) => {
						if (e.target.value.length <= 4) {
							setPasskey(e.target.value);
						}
					}}
					className=" text-xl text-center tracking-[0.3em] border border-white rounded-md w-[50%] bg-black/0 outline-none"
				/>
				<div className="flex flex-row gap-5">
					<button
						onClick={async () => {
							if (!passkey) return;
							checkSolution(passkey)
								.then((res) => {
									if (res.correct) {
										Toast(TOAST_SUCCESS, "Correct PassKey!");
									} else {
										Toast(TOAST_ERROR, "Incorrect PassKey!");
									}
								})
								.catch((err) => {
									console.log(err);
									Toast(TOAST_ERROR, "Incorrect PassKey!");
								});
						}}
						className=" bg-tutorialUiBlue px-2 py-1 mx-auto rounded-lg"
					>
						SUBMIT
					</button>
					<button
						onClick={() => {
							dispatch(togglePortalKey());
						}}
						className="bg-red/70 px-2 py-1 mx-auto rounded-lg"
					>
						CLOSE
					</button>
				</div>
			</div>
		</div>
	);
};

export default PasskeyBox;

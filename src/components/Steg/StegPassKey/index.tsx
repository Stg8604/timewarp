import { useAppDispatch } from "@stores/hooks";
import { useState } from "react";
import { togglePortalKey } from "../../../slices/Steg/steg";
import { checkStegPasskey } from "../../../slices/Steg/stegActions";
import { Toast } from "../..";
import { TOAST_ERROR, TOAST_SUCCESS } from "@utils/ToastStatus";
import { useNavigate } from "react-router-dom";

const StegPasskeyBox = () => {
	const [passkey, setPasskey] = useState("");
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (
		<div className="absolute h-full w-full flex flex-col justify-center items-center">
			<div className=" flex flex-col gap-5 justify-center items-center bg-black/50 border border-tutorialPortalGreen backdrop-blur-sm text-white rounded-md w-[40vh] aspect-square font-pixelifySans">
				<span className="text-xl">ENTER PASSKEY</span>
				<input
					value={passkey}
					onChange={(e) => {
						setPasskey(e.target.value);
					}}
					className=" text-xl text-center tracking-[0.3em] border border-white rounded-md w-[50%] bg-black/0 outline-none"
				/>
				<div className="flex flex-row gap-5">
					<button
						onClick={async () => {
							const res = await dispatch(
								checkStegPasskey({
									solution: passkey,
								})
							);
							if (res.payload) {
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								const ans: any = res.payload;
								if (ans.correct == true) {
									Toast(TOAST_SUCCESS, "Correct PassKey!");
									// Add Dispatch to change scene to lobby here
									setTimeout(() => {
										window.location.reload();
									}, 1000);
								} else {
									Toast(TOAST_ERROR, "Incorrect PassKey!");
								}
							}
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

export default StegPasskeyBox;

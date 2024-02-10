type PasskeyBoxProps = {
	passkey: string;
	setPasskey: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: () => void;
	handleClose: () => void;
};

const PasskeyBox = (props: PasskeyBoxProps) => {
	return (
		<div className="absolute h-full w-full flex flex-col justify-center items-center bg-black/30">
			<div className=" flex flex-col gap-5 justify-center items-center bg-black/50 backdrop-blur-sm text-white rounded-md w-[40vh] aspect-square font-pixelifySans">
				<span className="text-md">Do You Want To Submit</span>
				<input
					type="string"
					value={props.passkey}
					onChange={(e) => {
						props.setPasskey(e.target.value);
					}}
					className=" text-xl text-center tracking-[0.3em] border border-white rounded-md w-[50%] bg-black/0 outline-none"
				/>
				<div className="flex flex-row gap-5">
					<button
						onClick={props.handleSubmit}
						className=" bg-tutorialUiBlue px-2 py-1 mx-auto rounded-lg"
					>
						SUBMIT
					</button>
					<button
						onClick={props.handleClose}
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

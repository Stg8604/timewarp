import compbg from "/assets/Emoji/compbg.svg";
import "./styles.modules.css";
type MainPortalProps = {
	handleClose: () => void;
};

const MainPortal = (props: MainPortalProps) => {
	const strin: string = `🏁 🍇
  <input/> ➡️ 🖍🆕num
  ↪️ num 🚮 4 ◀️ 1 🍇
    num ✖️ 6 ➡️ num  
  🍉
  🙅↪️ num 🚮 4 ◀️ 3 🍇
    num 🚮 4 ➡️ counter
    🔂 i 🆕⏩ 0 10 counter❗️ 🍇
      num ➕ i ➡️ num
    🍉
  🍉
  🙅 🍇
    num 🚮 4 ➡️ counter
    🔁 num &lt; 80 🍇
       num * counter ➡️ num
    🍉
  🍉
  num ➕ 22 ➡️ num
  ↪️ num 🚮 4 ◀️ 2 🍇
    num ✖️ ((num 🚮 4) ➕ 1 ) ➡️ num  
  🍉
  🙅 🍇
    🔁 num &lt; 140 🍇
       num ➖ 24 ➡️ num
    🍉
  🍉
  num ➕ 22 ➡️ num
  ↪️ num 🚮 4 ◀️ 3 🍇
    num 🚮 4 ➡️ counter
    🔂 i 🆕⏩ 0 20 counter❗️ 🍇
      num ➖ (2 * i) ➡️ num
    🍉
  🍉
  🙅 🍇
    num 🚮 4 ➡️ counter
    🔂 i 🆕⏩ 0 10 counter❗️ 🍇
      num ➕ i ➡️ num
    🍉
  🍉
  ↪️ num ◀️ 0 🍇
    num * -1 ➡️ num
  🍉
  😀 🔤🧲num🧲🔤❗️`;
	return (
		<>
			<div className="absolute h-full w-full flex flex-col justify-center items-center bg-black/30 z-50 ">
				<div className=" flex flex-col gap-5 justify-center items-center bg-tutorialUiBlue/80 border border-whites backdrop-blur-sm text-white rounded-md h-[90vh] w-[60vh] aspect-square font-pixelifySans">
					<div className="overflow-y-auto max-h-[90%] w-full p-4">
						<pre className="text-[0.7rem] mt-4">{strin}</pre>
					</div>
					<button
						onClick={props.handleClose}
						className="bg-red/70 px-2 py-1 mx-auto rounded-lg h-[10%] mb-8"
					>
						CLOSE
					</button>
				</div>
			</div>
		</>
	);
};

export default MainPortal;

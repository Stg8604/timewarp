import popup from "../../assets/popup.svg";
import { LevelProps } from "@components/index";
import { LevelProps2 } from "@components/index";

const LevelSelector = ({
	title1,
	title2,
	title3,
	currentTime,
	switchScene,
}: {
	title1: string;
	title2: string;
	title3: string;
	currentTime: string;
	switchScene: (key: string) => void;
}) => {
	return (
		<>
			<div className=" absolute top-0 left-0 flex flex-row gap-8 justify-center w-full h-screen bg-[#0000004b] items-center">
				<div className="w-[600px] h-[470px] relative">
					{/* <div className="md:w-[600px] md:h-[470px] w-[400px] h-[312px] relative"> */}
					<img
						src={popup}
						className="absolute  h-[87%] sm:h-[100%] top-0 tran left-0 w-[600px] "
					/>
					<div className="flex flex-col mt-16 items-center">
						<LevelProps title={title1} switchScene={switchScene} />
						<LevelProps title={title2} switchScene={switchScene} />
						<LevelProps title={title3} switchScene={switchScene} />
						<LevelProps2 text={currentTime} type={currentTime} />
					</div>
				</div>
			</div>
		</>
	);
};
export default LevelSelector;

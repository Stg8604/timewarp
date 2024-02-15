import popup from "../../assets/popup.svg";
import { LevelProps } from "@components/index";
import { LevelProps2 } from "@components/index";

const RedoTutorial = ({
	switchScene,
}: {
	switchScene: (key: string) => void;
}) => {
	return (
		<>
			<div className=" absolute top-0 left-0 flex flex-row gap-8 justify-center w-full h-screen bg-[#0000004b] items-center">
				<div className="w-[600px] h-[470px] relative p-[90px]">
					{/* <div className="md:w-[600px] md:h-[470px] w-[400px] h-[312px] relative"> */}
					<img
						src={popup}
						className="absolute  h-[87%] sm:h-[100%] top-0 tran left-0 w-[600px] "
					/>
					<div className=" items-center flex flex-col h-full justify-between p-8">
						<div className=" text-darkBrown z-50 text-center font-pixelifySans w-[95%]">
							Want to train your time traveling skills?
						</div>

						<LevelProps title={"Tutorial"} switchScene={switchScene} />
						<div className="mb-7">
							<LevelProps2 type={"tutorial"} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default RedoTutorial;

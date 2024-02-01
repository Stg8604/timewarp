import { toggleInventory } from "@slices/Player/Player";
import { useAppDispatch } from "@stores/hooks";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	return (
		<div>
			<div
				onClick={() => {
					dispatch(toggleInventory());
				}}
				className="absolute hover:scale-105 bg-tutorialUiBlue text-white cursor-pointer top-5 left-5 px-4 py-1 font-pixelifySans rounded-full"
			>
				Inventory
			</div>
			<a
				onClick={() => navigate("/dashboard")}
				className="absolute hover:scale-105 bg-tutorialUiBlue text-white cursor-pointer top-5 right-5 px-4 py-1 font-pixelifySans rounded-full"
			>
				Main Menu
			</a>
		</div>
	);
};

export default BackBtn;

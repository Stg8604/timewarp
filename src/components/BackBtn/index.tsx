import { useNavigate } from "react-router-dom";

const BackBtn = () => {
	const navigate = useNavigate();
	return (
		<a
			onClick={() => navigate("/dashboard")}
			className="absolute hover:scale-105 bg-tutorialUiBlue text-white cursor-pointer top-5 right-5 px-4 py-1 font-pixelifySans rounded-full"
		>
			Main Menu
		</a>
	);
};

export default BackBtn;

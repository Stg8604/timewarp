import { useAppSelector } from "@stores/hooks";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
	const isLoggedIn = useAppSelector((state) => state.user.loggedIn);
	const navigate = useNavigate();
	return (
		<div className="h-30px text-[1.2rem]  w-full text-white flex items-center justify-between p-6 ">
			<div className="flex justify-start items-center w-[80%] gap-8">
				<div className="font-semibold">Time Warp</div>
				<div className="text-[1.1rem]">Docs</div>
				<div className="text-[1.1rem]">Leaderboard</div>
			</div>
			<div className="eleHover">
				<button
					className="landingButton flex p-2 pl-6 pr-6 w-full  justify-center items-center gap-2 text-black text-[1.2rem] font-light mont"
					onClick={() => navigate("/login")}
				>
					{isLoggedIn ? "Play" : "Login"}
				</button>
			</div>
		</div>
	);
};

export default Navbar;

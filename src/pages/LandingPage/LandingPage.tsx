import React, { FC } from "react";
import Navbar from "../../components/Navbar";
import Home from "../../components/Home";
import Hero from "../../components/Hero";
import Explore from "../../components/Explore";
import Time from "../../components/Time";
import Defeat from "../../components/Defeat";
import End from "../../components/End";
import Footer from "../../components/Footer";
import { useAppSelector } from "@stores/hooks";

interface LandingPageProps {}

const LandingPage: FC<LandingPageProps> = () => {
	return (
		<div className="w-screen min-h-[100vh] overflow-x-hidden text-white landing mobileView">
			<div className="overflow-hidden h-[100vh]">
				<Navbar />
				<Home />
			</div>
			<Hero />
			<Explore />
			<Time />
			<Defeat />
			<End />
			<Footer />
		</div>
	);
};

export default LandingPage;

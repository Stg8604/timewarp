import { NavigationButtons } from "@components/index";
import { Bars, Loader, UserBar } from "@components/index";
import { getLeaderBoard } from "@slices/index";
import { status } from "../../../slices/Status/statusActions";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { toggleLeaderboard } from "@slices/Lobby/Lobby";
import { IconX } from "@tabler/icons-react";

import styles from "./leaderboard.module.css";

const Leaderboard = () => {
	const dispatch = useAppDispatch();
	const ranking = useAppSelector((state) => state.leaderboard.ranking);
	const userName = useAppSelector((state) => state.status.userName);

	const [page, setPage] = useState<number>(1);
	const [pageData, setPageData] = useState<LeaderBoardResponse[]>([]);

	useEffect(() => {
		(async () => {
			await dispatch(status());
			await dispatch(getLeaderBoard());
		})();
	}, []);
	const userRankDetails = ranking.find((item) => item.userName === userName);

	const ranksPerPage = 6;

	const maxPage = Math.ceil(ranking.length / ranksPerPage);
	useEffect(() => {
		setPageData(ranking.slice((page - 1) * ranksPerPage, page * ranksPerPage));
	}, [page]);

	const isFetching = useAppSelector((state) => state.leaderboard.isFetching);

	return (
		<>
			{isFetching && <Loader />}

			{!isFetching && (
				<div className="absolute flex justify-center items-center h-screen w-screen overflow-x-hidden z-50">
					<div className=" bg-tutorialUiBlue/80 animate-fadeIn leading-5 text-black text-center flex flex-col gap-5 h-screen w-screen items-center justify-center">
						<div className={`${styles.heading} font-pressStart2P`}>
							LEADERBOARD
						</div>

						<div className={styles.BoxPseudo}>
							<div className={styles.Box}>
								{userRankDetails && (
									<UserBar userRankDetails={userRankDetails} />
								)}
								{pageData &&
									pageData
										.filter(
											(entry) => entry.userName !== userRankDetails?.userName
										)
										.map((data, index) => (
											<Bars
												data={data}
												index={index + (page - 1) * ranksPerPage}
												key={index}
											/>
										))}
								{!pageData.length &&
									!(page - 1) &&
									ranking
										.filter(
											(entry) => entry.userName !== userRankDetails?.userName
										)
										.slice(0, ranksPerPage)
										.map((data, index) => (
											<Bars data={data} key={index} index={index} />
										))}
							</div>
							<div className={styles.Nav}>
								<NavigationButtons
									page={page}
									setPage={setPage}
									maxPage={maxPage}
								/>
							</div>
						</div>

						<button
							onClick={() => dispatch(toggleLeaderboard())}
							className="px-2 py-1 mx-auto rounded-lg border absolute top-5 right-5 bg-white"
						>
							<IconX size={24} color="black" />
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Leaderboard;

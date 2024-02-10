import { NavigationButtons } from "@components/index";
import { Bars, Loader, UserBar } from "@components/index";
import { getLeaderBoard } from "@slices/index";
import { status } from "../../slices/Status/statusActions";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";

const LeaderBoard = () => {
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
				<div className={styles.base}>
					<div className={`${styles.heading} font-pressStart2P`}>
						LEADERBOARD
					</div>
					<div className={styles.BoxPseudo}>
						<div className={styles.Box}>
							{userRankDetails && <UserBar userRankDetails={userRankDetails} />}
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
				</div>
			)}
		</>
	);
};

export default LeaderBoard;

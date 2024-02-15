import { NavigationButtons } from "@components/index";
import { Bars, Loader, UserBar } from "@components/index";
import { getLeaderBoard } from "@slices/index";
import { status } from "../../slices/Status/statusActions";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { useEffect, useState } from "react";
import leaderBg from "../../assets/Leaderboard/greenbg.svg";
import header from "../../assets/Leaderboard/header.svg";
import styles from "./styles.module.css";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const LeaderBoard = () => {
	const dispatch = useAppDispatch();
	const ranking = useAppSelector((state) => state.leaderboard.ranking);
	const userName = useAppSelector((state) => state.status.userName);
	const navigate = useNavigate();
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
				<div
					className={styles.base}
					style={{
						background: `url(${leaderBg}) no-repeat center center fixed`,
					}}
				>
					<div
						className={`${styles.image} absolute top-0 left-0 ml-4 mt-4 text-right mb-[1vh] border-2 border-solid font-pressStart2P bg-[#F5F5AC] shadow-[4px_4px_3px_1px_rgb(0,0,0,0.5)] p-[3px] rounded-3xl`}
					>
						<Button
							onClick={() => {
								navigate("/dashboard");
							}}
							className="text-black cursor-pointer"
						>
							Lobby
						</Button>
					</div>

					<div
						className={`${styles.heading} font-pressStart2P`}
						style={{
							background: `url(${header}) no-repeat`,
						}}
					>
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

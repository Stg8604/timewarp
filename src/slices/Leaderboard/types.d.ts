interface LeaderBoardInitalState {
	isFetching: boolean;
	ranking: LeaderBoardResponse[];
	isError: boolean;
}

interface LeaderBoardResponse {
	score: string;
	userName: string;
	rank: string;
}

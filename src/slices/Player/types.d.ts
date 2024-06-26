interface PlayerState {
	day: number;
	tutorialCompleted: boolean | undefined;
	score: number;
	totalScore: number;
	isFetching: boolean;
	inventoryOpen: boolean;
}

interface Status {
	totalScore: number;
	userName: string;
	day: number;
	tutorialCompleted?: boolean;
	score: number;
	inventory: [string, string][];
	puzzleCompletionList: {
		[key: string]: boolean;
	};
}

interface ILobbyState {
	isInfoOpen: boolean;
	isLeaderboardOpen: boolean;
	isLoreOpen: boolean;
	isPastPortalOpen: boolean;
	isPresentPortalOpen: boolean;
	isFuturePortalOpen: boolean;
	isTutorialOpen: boolean;
}

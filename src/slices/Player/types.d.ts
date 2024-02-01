interface PlayerState {
	playerMovementSpeed: number;
	fireballPower: number;
	day: number;
	tutorialCompleted: boolean | undefined;
	score: number;
	isFetching: boolean;
	inventoryOpen : boolean
}

interface Status {
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
}

interface PlayerState {
	playerMovementSpeed: number;
	fireballPower: number;
	day: number;
	tutorialCompleted: boolean;
	score: number;
	isFetching: boolean;
}

interface Status {
	day: number;
	tutorialCompleted: boolean;
	score: number;
}
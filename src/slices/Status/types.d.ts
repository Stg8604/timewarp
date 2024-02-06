interface StatusState {
	day: number;
	tutorialComplete: boolean | undefined;
	score: number;
	puzzleCompletionList: {
		[key: string]: boolean;
	};
	inventory: [string, string][];
}

interface EmojiPuzzleState {
	isMainPortalOpen: boolean;
	isPortalKeyOpen: boolean;
	isProp1Open: boolean;
	isProp2Open: boolean;
	isProp3Open: boolean;
	isProp4Open: boolean;
	isHintBoxOpen: boolean;
	correct: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: { [key: string]: any };
}

interface EmojiResponseDTO {
	inputKey: number;
	correct: boolean;
	score: number;
	message: string;
}

interface EmojiFlagDTO {
	solution: string;
}

interface APIError {
	message: string;
	correct: boolean;
}

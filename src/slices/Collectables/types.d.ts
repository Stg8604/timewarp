interface AllCollectablesResponse {
	userCollection: {
		id: integer;
		count: integer;
	}[];
}

interface PuzzleCollectablesResponse {
	collectables: {
		id: integer;
		collected: boolean;
	}[];
}

interface PuzzleUpdateCollectableResponse {
	collectables: {
		id: integer;
		collected: boolean;
	}[];
	score: integer;
	bonusScore: integer;
}

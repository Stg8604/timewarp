interface TrapsStatusResponse {
	isCompleted: boolean;
	score: integer;
	message: string;
}

interface TrapsCompleteResponse {
	isCompleted: boolean;
	score: integer;
	totalScore: integer;
	message: string;
}

interface TrapsEncodedFlagResponse {
	encodedFlag: string;
}

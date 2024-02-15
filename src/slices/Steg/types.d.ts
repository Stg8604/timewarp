interface CheckPasskeyResponse {
	correct: number;
}

interface PasskeyDetails {
	solution: string;
}

interface APIError {
	day?: number;
	message: string;
	score: number;
	totalScore: number;
}

interface InitResponse {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inputkey: any;
	correct: boolean;
	score: number;
	totalScore: number;
	message: string;
}

interface GetImageResponse {
	left: boolean;
	right: boolean;
	leftPainting: number[];
	rightPainting: number[];
}

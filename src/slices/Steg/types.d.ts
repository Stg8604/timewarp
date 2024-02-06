interface CheckPasskeyResponse {
	correct: number;
}

interface PasskeyDetails {
	solution: string;
}

interface APIError {
	message: string;
}

interface InitResponse {
	correct: boolean;
	score: number;
	message: string;
}

interface GetImageResponse {
	left: boolean;
	right: boolean;
	leftPainting: number[];
	rightPainting: number[];
}

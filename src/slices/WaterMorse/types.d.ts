interface WaterMorseStatusResponse {
	audioID: number;
	isCompleted: boolean;
	score: number;
	message: string;
}

interface WaterMorseFlagBody {
	solution: string;
}

interface WaterMorseFlagResponse {
	audioID: number;
	correct: boolean;
	score: number;
	message: string;
}

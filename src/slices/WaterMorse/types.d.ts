interface WaterMorseStatusResponse {
	audioID: number;
	isCompleted: boolean;
	score: number;
	message: string;
	error ?: string;
}

interface WaterMorseFlagBody {
	solution: string;
}

interface WaterMorseFlagResponse {
	audioID: number;
	correct: boolean;
	score: number;
	totalScore: number;
	message: string;
}

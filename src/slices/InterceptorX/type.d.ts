interface InterceptStatusData {
	isCompleted: boolean;
	score: number;
	timeCompleted: Date;
}

interface InterceptCheckResponseDTO {
	correct: boolean;
	score: number;
	totalScore: number;
	message: string;
}

interface InterceptFlagDTO {
	solution: string;
}

interface InterceptStatusResponseDTO {
	isCompleted: boolean;
	message: string;
}

interface APIError {
	message: string;
	correct: boolean;
	totalScore: number;
	score: number;
}

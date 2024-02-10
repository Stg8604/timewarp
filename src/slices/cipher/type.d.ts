interface RevEngStatusData {
	isCompleted: boolean;
	score: number;
	timeCompleted: Date;
}

interface RevEngCheckResponseDTO {
	correct: boolean;
	score: number;
	message: string;
}

interface RevEngFlagDTO {
	solution: string;
}

interface RevEngStatusResponseDTO {
	isCompleted: boolean;
	message: string;
}

interface APIError {
	message: string;
	correct: boolean;
}

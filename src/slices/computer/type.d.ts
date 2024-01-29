interface MstWeightResponse {
	correct: boolean;
	score: number;
	message: string;
	mapId: number;
}

interface EdgeDTO {
	source: number;
	target: number;
}

interface MSTFlagDTO {
	edges: EdgeDTO[];
}

interface APIError {
	message: string;
	correct: boolean;
}

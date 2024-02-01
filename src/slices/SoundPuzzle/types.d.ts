interface SoundPuzzleState {
	isPortalKeyOpen: boolean;
	clipsOrder: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: { [key: string]: any };
	isHintBoxOpen: boolean;
}

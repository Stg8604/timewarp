interface Edge {
	source: number;
	target: number;
}

interface IReactPy {
	seederParams: {
		moduleName: string;
		className: string;
		params: { [key: string]: string | number | Edge[] };
		file: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		dispatch: (params: any) => any;
	}[];
	defaultInput: string;
}

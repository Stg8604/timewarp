/* eslint-disable */

interface Edge {
	source: number;
	target: number;
}

interface IReactPy {
	seederParams: {
		moduleName: string;
		className: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		params: { [key: string]: any };
		file: string;
		dispatch:
			| ((params: {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					[key: string]: any;
			  }) => UnknownAction)
			| null;
	}[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaultInput: any;
}

// interface IReactPy {
// 	seederParams: {
// 		moduleName: string;
// 		className: string;
// 		params: { [key: string]: string | number | number[] | null };
// 		file: string;
// 		dispatch:
// 			| ((params: { [key: string]: string | number }) => UnknownAction)
// 			| null;
// 	}[];
// 	defaultInput: string;
// }

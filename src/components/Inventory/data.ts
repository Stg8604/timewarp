const baseCoords = [97, 136];
const xSum = 84;
const ySum = 86;
const coords: [number, number][] = [];
for (let i = 0; i < 3; i++) {
	for (let j = 0; j < 5; j++) {
		coords.push([baseCoords[0] + xSum * j, baseCoords[1] + ySum * i]);
	}
}

export { coords };

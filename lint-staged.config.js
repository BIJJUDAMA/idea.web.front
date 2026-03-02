export default {
	"*.{js,jsx,ts,tsx}": [
		"bunx biome check --write",
		"bunx biome format --write",
		"bunx biome lint --write",
	],
};

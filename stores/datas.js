import { createSlice } from "@reduxjs/toolkit";
import { RandomNumber } from "../api/RandomNumber";
// import store from ".";

// Stateの初期状態
const initialState = {
	screen: "A",
	panel: [
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
		{ isDead: false, restTurn: 5, defaultTurn: 5 },
	],
	max: 8,
	min: 3,
	level: 1,
	isInited: false,
};

const slice = createSlice({
	name: "datas",
	initialState,
	reducers: {
		updateSinglePanel: (state, action) => {
			if (state.panel[action.payload].isDead) {
				return state;
			}
			state.panel[action.payload].isDead = true;
			state.panel[action.payload].restTurn = RandomNumber(state.max, state.min);
			for (let i = 0; i < state.panel.length; i++) {
				const panel = state.panel[i];

				if (!panel.isDead && panel.restTurn !== 0) {
					panel.restTurn--;
				}
			}
			for (let i = 0; i < state.panel.length; i++) {
				const panel = state.panel[i];
				if (!panel.isDead) {
					if (panel.restTurn == 0) {
						panel.restTurn = RandomNumber(state.max, state.min);

						let list;
						if (i == 3 || i == 7 || i == 11) {
							list = [i - 4, i - 1, i + 4];
						} else if (i == 4 || i == 8 || i == 12) {
							list = [i - 4, i + 1, i + 4];
						} else {
							list = [i - 4, i - 1, i + 1, i + 4];
						}
						list = list.filter((n) => 0 <= n && n <= 15);
						list = list.filter((n) => state.panel[n].isDead);

						//  list = list.filter(
						// 	(n) =>
						// 		(n == 4 * i - 1 ? n !== i + 1 : n == n) &&
						// 		(n == 4 * i ? n !== i - 1 : n == n)
						// );
						const random = RandomNumber(list.length, 0);
						if (list.length > 0) {
							const number = list[random];
							console.log("🚀 ~ file: datas.js ~ line 56 ~ number", number);
							state.panel[number].isDead = false;
						}
						console.log(
							"🚀 ~ file: datas.js ~ line 1 ~ list2.length",
							i,
							list,
							random,
							list.length
						);
					}
				}
			}
		},
		initPanels: (state, action) => {
			state.isInited = true;
			for (let i = 0; i < state.panel.length; i++) {
				state.panel[i].isDead = false;
				const random = RandomNumber(state.max, state.min);
				console.log("🚀 ~ file: datas.js ~ line 80 ~ random", random);
				state.panel[i].restTurn = random;
				state.panel[i].defaultTurn = random;
			}
		},
		levelHandler: (state, action) => {
			if (action.payload && state.level < 5) {
				state.max--;

				state.level++;
				if (state.level > 4) {
					state.min = 1;
				} else if (state.level > 2) {
					state.min = 2;
				} else {
					state.min = 3;
				}
				for (let i = 0; i < state.panel.length; i++) {
					state.panel[i].isDead = false;
					const random = RandomNumber(state.max, state.min);
					console.log("🚀 ~ file: datas.js ~ line 80 ~ random", random);
					state.panel[i].restTurn = random;
					state.panel[i].defaultTurn = random;
				}
			} else if (!action.payload && state.level > 1) {
				state.max++;
				state.level--;
				if (state.level > 4) {
					state.min = 1;
				} else if (state.level > 2) {
					state.min = 2;
				} else {
					state.min = 3;
				}
				for (let i = 0; i < state.panel.length; i++) {
					state.panel[i].isDead = false;
					const random = RandomNumber(state.max, state.min);
					console.log("🚀 ~ file: datas.js ~ line 80 ~ random", random);
					state.panel[i].restTurn = random;
					state.panel[i].defaultTurn = random;
				}
			}
		},
		navigate: (state, action) => {
			state.screen = action.payload;
		},
	},
});

export default slice.reducer;
// Action Creatorsをエクスポートする
export const actions = slice.actions;

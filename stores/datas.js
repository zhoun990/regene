import { createSlice } from "@reduxjs/toolkit";
import { RandomNumber } from "../api/RandomNumber";
// import store from ".";

// Stateの初期状態
const initialState = {
	panel: [
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
		{ isDead: false, restTurn: 5, count: 0 },
	],
	stage: {},
	max: 8,
	min: 3,
	level: 1,
	isInited: false,
	count: 0,
	askedReview2: false,
	askedReview4: false,
};

const slice = createSlice({
	name: "datas",
	initialState,
	reducers: {
		updateSinglePanel: (state, action) => {
			if (state.panel[action.payload].isDead) {
				return state;
			} else {
				state.count++;
			}
			state.panel[action.payload].isDead = true;
			if (
				state.stage.panel[action.payload].turn[
					state.panel[action.payload].count + 1
				]
			) {
				state.panel[action.payload].restTurn =
					state.stage.panel[action.payload].turn[
						state.panel[action.payload].count + 1
					];
				state.panel[action.payload].count++;
			} else {
				const random = RandomNumber(state.stage.max, state.stage.min);
				state.panel[i].restTurn = random;
			}
			for (let i = 0; i < state.panel.length; i++) {
				const panel = state.panel[i];

				if (!panel.isDead && panel.restTurn !== 0) {
					panel.restTurn--;
				}
			}
			for (let i = 0; i < state.panel.length; i++) {
				const panel = state.panel[i];
				const stage = state.stage.panel[i];
				if (!panel.isDead) {
					if (panel.restTurn == 0) {
						if (stage.turn[panel.count + 1]) {
							panel.restTurn = stage.turn[panel.count + 1];
							panel.count++;
						} else {
							const random = RandomNumber(state.stage.max, state.stage.min);
							panel.restTurn = random;
						}
						let list;
						const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
						if (
							num.filter((item) => {
								item * state.stage.row == i + 1;
							}).length !== 0
						) {
							list = [i - state.stage.row, i - 1, i + state.stage.row];
						} else if (
							num.filter((item) => {
								item * state.stage.row == i;
							}).length !== 0
						) {
							list = [i - state.stage.row, i + 1, i + state.stage.row];
						} else {
							list = [i - state.stage.row, i - 1, i + 1, i + state.stage.row];
						}
						list = list.filter((n) => 0 <= n && n <= state.panel.length - 1);
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
					}
				}
			}
		},
		initPanels: (state, action) => {
			state.isInited = true;
			state.count = 0;
			state.stage = action.payload;
			for (let i = 0; i < state.panel.length; i++) {
				state.panel[i].isDead = action.payload.panel[i].isDead;
				if (action.payload.panel[i].turn[0]) {
					state.panel[i].restTurn = action.payload.panel[i].turn[0];
				} else {
					const random = RandomNumber(action.payload.max, action.payload.min);
					state.panel[i].restTurn = random;
				}
			}
		},
		levelHandler: (state, action) => {
			state.count = 0;
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
				}
			}
		},

		reviewHandler: (state, action) => {
			if (action.payload == "1") {
				// state.askedReview2 = true;
			} else if (action.payload == "2") {
				state.askedReview2 = true;
			} else if (action.payload == "3") {
				// state.askedReview2 = true;
			} else if (action.payload == "4") {
				state.askedReview4 = true;
			} else if (action.payload == "5") {
				// state.askedReview5 = true;
			}
		},
	},
});

export default slice.reducer;
// Action Creatorsをエクスポートする
export const actions = slice.actions;

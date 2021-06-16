import { createSlice } from "@reduxjs/toolkit";
import { RandomNumber } from "../api/RandomNumber";
// import store from ".";

// Stateの初期状態
const initialState = {
	loading: false,
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
	isPlaying: false,
	log: {},
	stageName: "",
	isLogedIn: false,
	maxPoint: 100,
	pointInterval: 10,
	en: 0,
	team: ["gbPXeTFVXu43LXa8JgWN", "gz84TLYabKvgIYqwOhk4"],
	card: {
		gbPXeTFVXu43LXa8JgWN: {
			id: "gbPXeTFVXu43LXa8JgWN",
			n: [2, 0],
			fragment: 30,
			lv: 2,
			params: [23, 44, 12, 32],
			skill: "testSkill",
			skillLv: 3,
			passive_1: "testPassive1",
			passive_2: "testPassive2",
			inheritedPassive_1: "testInheritedPassive1",
			inheritedPassive_2: "testInheritedPassive2",
			inheritedCharacter_1: [1, 0],
			inheritedCharacter_2: [1, 0],
		},
		gz84TLYabKvgIYqwOhk4: {
			id: "gz84TLYabKvgIYqwOhk4",
			n: [1, 0],
			fragment: 30,
			lv: 2,
			params: [30, 24, 26, 13],
			skill: "testSkill",
			skillLv: 3,
			passive_1: "testPassive1",
			passive_2: "testPassive2",
			inheritedPassive_1: "testInheritedPassive1",
			inheritedPassive_2: "testInheritedPassive2",
			inheritedCharacter_1: [1, 0],
			inheritedCharacter_2: [1, 0],
		},
	},
	resultHistory: [],
	relocate: {},
	stamina: 100,
	activeSkill: "",
};

const slice = createSlice({
	name: "datas",
	initialState,
	reducers: {
		updateSinglePanel: (state, action) => {
			if (action.payload == "skip") {
				state.count++;
				state.stamina += 30;
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
				var date = new Date();
				var time = date.getTime();
				const logPanel = [
					{
						panel: state.panel,
						count: state.count,
						time: time,
						i: "skip",
					},
				];
				const newLog = state.log.data.concat(logPanel);
				state.log = {
					stageName: state.log.stageName,
					max: state.log.max,
					min: state.log.min,
					data: newLog,
				};
			} else if (action.payload.skill) {
				if (action.payload.skill == "Two Panels Turn Over") {
				} else if (action.payload.skill == "") {
					state.activeSkill = action.payload.skill;
				}
			} else if (state.panel[action.payload].isDead) {
			} else if (state.stamina >= state.panel[action.payload].restTurn) {
				state.count++;
				state.panel[action.payload].isDead = true;
				state.stamina = state.stamina - state.panel[action.payload].restTurn;
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
					state.panel[action.payload].restTurn = random;
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
				var date = new Date();
				var time = date.getTime();
				const logPanel = [
					{
						panel: state.panel,
						count: state.count,
						time: time,
						i: action.payload,
					},
				];
				const newLog = state.log.data.concat(logPanel);
				state.log = {
					stageName: state.log.stageName,
					max: state.log.max,
					min: state.log.min,
					data: newLog,
				};
			}
		},
		initPanels: (state, action) => {
			console.log("🚀 ~ file: datas.js ~ line 175 ~ initPanels");
			// state.isInited = true;
			state.count = 0;
			state.stage = action.payload.stage;
			state.isPlaying = true;
			state.stageName = action.payload.name;
			state.stamina = 100;
			const array = [];
			for (let i = 0; i < action.payload.stage.panel.length; i++) {
				const isDead = action.payload.stage.panel[i].isDead;
				let restTurn;
				if (action.payload.stage.panel[i].turn[0]) {
					restTurn = action.payload.stage.panel[i].turn[0];
				} else {
					const random = RandomNumber(
						action.payload.stage.max,
						action.payload.stage.min
					);
					restTurn = random;
				}
				array.push({ isDead: isDead, restTurn: restTurn, count: 0 });
			}
			state.panel = array;
			var date = new Date();
			var time = date.getTime();
			state.log = {
				stageName: state.stageName,
				max: state.stage.max,
				min: state.stage.min,
				data: [{ panel: state.panel, count: state.count, time: time }],
			};
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
		gameEnd: (state, action) => {
			console.log("🚀 ~ file: datas.js ~ line 220 ~ gameEnd");
			state.isPlaying = false;
		},
		login: (state, action) => {
			state.isLogedIn = true;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setEn: (state, action) => {
			state.en = action.payload;
		},
		setCharacter: (state, action) => {
			state.card[action.payload.id] = action.payload;
		},
		loading: (state, action) => {
			// state.loading = !state.loading;
			state.loading = action.payload.loading;
			if (action.payload.loading) {
				state.relocate = action.payload.relocate;
			}
		},
		setTeam: (state, action) => {
			// state.loading = !state.loading;
			const array = [];
			for (let i = 0; i < action.payload.length; i++) {
				array.push(action.payload[i].id);
			}
			state.team = array;
		},
		addResult: (state, action) => {
			state.resultHistory = action.payload;
		},
		resultHistory: (state, action) => {
			state.resultHistory[state.resultHistory.length] = action.payload;
		},
		setStamina: (state, action) => {
			if (state.stamina + action.payload < 0) {
				state.stamina = 0;
			} else if (state.stamina + action.payload > 100) {
				state.stamina = 100;
			} else {
				state.stamina += action.payload;
			}
		},
	},
});

export default slice.reducer;
// Action Creatorsをエクスポートする
export const actions = slice.actions;

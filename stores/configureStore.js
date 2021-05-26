import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import datasReducer from "./datas";

const config = {
	// 保存データのrootキー
	key: "root",
	// React NativeなのでAsyncStorageを使用
	storage: AsyncStorage,
	// loadingReducerは保存しないようにする、whitelistも可能
	blacklist: [],
	debug: true, //to get useful logging
};

const middleware = [];

if (__DEV__) {
	// middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, {
	datas: datasReducer,
});
const enhancers = [applyMiddleware(...middleware)];

const persistConfig = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
	// console.log("テスト", store.getState());
});
const configureStore = () => {
	return { persistor, store };
};

export default configureStore;

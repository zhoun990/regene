import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Main } from "./screens/mainScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./stores/configureStore";
import { Entrance } from "./screens/entranceScreen";

const { persistor, store } = configureStore();
export default function App() {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
}
function Router() {
	const state = useSelector((state) => state.datas);
	if (state.screen == "A") {
		return <Entrance />;
	} else if (state.screen == "B") {
		return <Main />;
	} else {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Text>Not Found Page</Text>
			</SafeAreaView>
		);
	}
}

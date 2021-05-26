import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Main } from "./screens/mainScreen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./stores/configureStore";

const { persistor, store } = configureStore();
export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

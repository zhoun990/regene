// import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	LogBox,
	Platform,
	SafeAreaView,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./stores/configureStore";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { translations } from "./utils/tranclations";
import { enableScreens } from "react-native-screens";
import { actions } from "./stores/datas";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Screen
import { EntranceScreen } from "./screens/Entrance/screens/EntranceScreen";
import { HomeScreen } from "./screens/base/Home/screens/HomeScreen";
import { StageSelectScreen } from "./screens/base/Home/screens/StageSelectScreen";
import { MainScreen } from "./screens/Play/screens/MainScreen";

//Screen end
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

enableScreens();
if (Platform.OS !== "web") {
	LogBox.ignoreLogs([
		"Constants.installationId has been deprecated in favor of generating and storing your own ID. Implement it using expo-application's androidId on Android and a storage API such as expo-secure-store on iOS and localStorage on the web. This API will be removed in SDK 44.",
	]);
}
i18n.translations = translations;
i18n.locale = Localization.locale;
i18n.fallbacks = true;
const { persistor, store } = configureStore();
export default function App() {
	return (
		<Provider store={store}>
			<StatusBar barStyle={"dark-content"} />
			<Router />
		</Provider>
	);
}
function Router() {
	const state = useSelector((state) => state.datas);
	const dispatch = useDispatch();
	return (
		<NavigationContainer>
			<Stack.Navigator
				headerMode="none"
				screenOptions={{ animationEnabled: false }}
			>
				<Stack.Screen
					name="Entrance"
					component={EntranceScreen}
					// options={{ headerShown: false }}
				/>
				<Stack.Screen name="BaseTabs" component={BaseTabs} />
				<Stack.Screen name="GameScreens" component={GameScreens} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
const BaseTabs = () => {
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					height: 150,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "white",
				}}
			>
				<View>
					<Text style={{ fontSize: 33, color: "#7d0b98" }}>Header</Text>
				</View>
			</View>
			<Tab.Navigator>
				<Tab.Screen name="HomeScreens" component={HomeScreens} />
			</Tab.Navigator>
		</View>
	);
};
const HomeScreens = () => {
	return (
		<Stack.Navigator
			headerMode="none"
			screenOptions={{ animationEnabled: false }}
		>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="StageSelect" component={StageSelectScreen} />
		</Stack.Navigator>
	);
};
function GameScreens() {
	return (
		<Stack.Navigator
			headerMode="none"
			screenOptions={{ animationEnabled: false }}
		>
			<Stack.Screen name="Main" component={MainScreen} />
			{/* <Stack.Screen name="Result" component={Result} /> */}
		</Stack.Navigator>
	);
}

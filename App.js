// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import firebase, { auth, db } from "./api/Firebase/firebase";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	LogBox,
	Platform,
	SafeAreaView,
	Alert,
	Dimensions,
	ImageBackground,
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
import * as SplashScreen from "expo-splash-screen";
import { Forque, Button } from "./custom/CustomComponents";

//Screen
import { EntranceScreen } from "./screens/Entrance/screens/EntranceScreen";
import { HomeScreen } from "./screens/base/Home/screens/HomeScreen";
import { StageSelectScreen } from "./screens/base/Home/screens/StageSelectScreen";
import { StageConfirmScreen } from "./screens/base/Home/screens/StageConfirmScreen";
import { MainScreen } from "./screens/Play/screens/MainScreen";
import { RankingScreen } from "./screens/Play/screens/RankingScreen";
import { ResultScreen } from "./screens/Play/screens/ResultScreen";
import { CharacterScreen } from "./screens/base/Character/screens/CharacterScreen";
import { CharacterListScreen } from "./screens/base/Character/CharacterList/screens/CharacterListScreen";
import { BackgroundImage } from "react-native-elements/dist/config";
import { navigationTheme } from "./utils/navigationTheme";
import { SetUpScreen } from "./screens/Entrance/screens/SetUpScreen";
import { Animated } from "react-native";
import { Colors } from "./utils/colors";
import { TeamScreen } from "./screens/base/Character/Team/screens/TeamScreen";
//Screen end
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width, height, scale } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync().catch(() => {
	/* reloading the app might trigger some race conditions, ignore them */
});
enableScreens();
LogBox.ignoreLogs([
	"Constants.installationId has been deprecated in favor of generating and storing your own ID. Implement it using expo-application's androidId on Android and a storage API such as expo-secure-store on iOS and localStorage on the web. This API will be removed in SDK 44.",
]);
i18n.translations = translations;
i18n.locale = Localization.locale;
i18n.fallbacks = true;
const { persistor, store } = configureStore();

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar barStyle={"light-content"} />
			<Router />
		</Provider>
	);
}
function Router() {
	const state = useSelector((state) => state.datas);
	const loading = useSelector((state) => state.datas.loading);
	const dispatch = useDispatch();
	const animation = React.useMemo(() => new Animated.Value(0), []);
	const navigationRef = React.useRef(null);

	const [user, setUser] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
	const [loadingText, setLoadingText] = useState("   ");
	const [loadingTextInterval, setLoadingTextInterval] = useState(null);

	useEffect(() => {
		dispatch(actions.loading(false));
	}, []);
	useEffect(() => {
		isReady &&
			state.isPlaying &&
			dispatch(
				actions.loading({
					loading: true,
					relocate: {
						screen: "GameScreens",
						params: {
							screen: "Main",
							params: { name: state.stageName },
						},
					},
				})
			);
		(async () => {
			isReady && (await SplashScreen.hideAsync());
		})();
	}, [isReady]);
	useEffect(() => {
		const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
			try {
				await (authUser ? setUser(authUser) : setUser(null));
			} catch (error) {
				console.log(error);
			}
		});
		// unsubscribe auth listener on unmount
		return unsubscribeAuth;
	}, []);

	useEffect(() => {
		if (user) {
			const unsubscribe = db
				.collection("user")
				.doc(auth.currentUser.uid)
				.onSnapshot(async (doc) => {
					dispatch(actions.setUser(doc.data()));
					!isReady && setIsReady(true);
				});
			return unsubscribe;
		}
	}, [user]);

	useEffect(() => {
		if (state && !state.isLogedIn) {
			// setIsReady(true);
			firebase
				.auth()
				.signInAnonymously()
				.then(() => {
					dispatch(actions.login());
				})
				.catch((error) => {
					var errorCode = error.code;
					console.log(
						"🚀 ~ file: App.js ~ line 54 ~ App ~ errorCode",
						errorCode
					);
					var errorMessage = error.message;
					console.log(
						"🚀 ~ file: App.js ~ line 56 ~ App ~ errorMessage",
						errorMessage
					);
					// ...
				});
		}
	}, [state]);
	useEffect(() => {
		if (loading && isSplashAnimationComplete) {
			loadingTextHandler(true);
			Animated.timing(animation, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start(({ finished }) => {
				navigationRef.current.navigate(
					state.relocate.screen,
					state.relocate.params
				);
				finished && setAnimationComplete(false);
			});
		}
	}, [loading]);
	useEffect(() => {
		if (!loading && !isSplashAnimationComplete) {
			Animated.timing(animation, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start(({ finished }) => {
				loadingTextHandler(false);
				finished && setAnimationComplete(true);
			});
		}
	}, [loading, isSplashAnimationComplete]);
	const loadingTextHandler = (bool) => {
		let i = 0;
		const setLoadingTextFunction = (loadingText) => {
			i++;
			if (i == 1) {
				setLoadingText(".  ");
			} else if (i == 2) {
				setLoadingText(".. ");
			} else if (i == 3) {
				setLoadingText("...");
			} else if (i == 4) {
				i = 0;
				setLoadingText("   ");
			}
		};
		if (bool) {
			const interval = setInterval(
				() => setLoadingTextFunction(loadingText),
				500
			);
			setLoadingTextInterval(interval);
		} else {
			clearInterval(loadingTextInterval);
			setLoadingText("   ");
		}
	};

	if (!isReady) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Forque>Loading...</Forque>
			</View>
		);
	}
	return (
		<View style={{ flex: 1 }}>
			{/* <View
				style={{
					width: width,
					height: height,
					backgroundColor: "green",
					// zIndex: 0,
				}}
			></View> */}
			{(!isSplashAnimationComplete || loading) && (
				<Animated.View
					pointerEvents="none"
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: Colors.gray1,
							opacity: animation,
							zIndex: 100,
							alignItems: "center",
							justifyContent: "center",
						},
					]}
				>
					<Forque style={{ fontSize: 50 }}>Loading{loadingText}</Forque>
					{/* <Animated.Image
						style={{

							opacity: animation,

							width: "100%",
							height: "100%",
							resizeMode: "contain",
							//   transform: [
							//     {
							//       scale: animation,
							//     },
							//   ],
						}}
						source={require("./assets/backgroundImage.png")}
						//   onLoadEnd={onImageLoaded}
						fadeDuration={0}
					/> */}
				</Animated.View>
			)}
			<NavigationContainer theme={navigationTheme} ref={navigationRef}>
				<Stack.Navigator
					headerMode="none"
					screenOptions={{ animationEnabled: false }}
				>
					<Stack.Screen name="Entrance" component={EntranceScreen} />
					<Stack.Screen name="SetUp" component={SetUpScreen} />
					<Stack.Screen name="BaseTabs" component={BaseTabs} />
					<Stack.Screen name="GameScreens" component={GameScreens} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}
const BaseTabs = () => {
	const state = useSelector((state) => state.datas);
	const user = useSelector((state) => state.datas.user);
	if (!user) {
		return null;
	}
	const dispatch = useDispatch();
	const [minutes, setMinutes] = useState("00");
	const [seconds, setSeconds] = useState("00");
	const [init, setInit] = useState(null);
	const [point, setPoint] = useState(null);
	const [isReady, setIsReady] = useState(false);

	const maxPoint = 100;
	const pointInterval = 10;
	useEffect(() => {
		const intervalId = setInterval(calcTime, 1000);
		init !== null && clearInterval(init);
		setInit(intervalId);
	}, [user.point, user.pointUpdateTime]);
	useEffect(() => {
		isReady && dispatch(actions.loading(false));
	}, [isReady]);
	const calcTime = () => {
		let p = user.point;
		const pointUpdateTime = user.pointUpdateTime;
		const timeDef = Math.floor(Date.now() / 1000) - pointUpdateTime.seconds;

		if (p < maxPoint) {
			const caledPoint = Math.floor(timeDef / 60 / pointInterval) + p;
			caledPoint >= maxPoint ? (p = maxPoint) : (p = caledPoint);
		}
		setPoint(p);
		dispatch(actions.setEn(p));
		let m = Math.floor(Math.floor(timeDef / 60));
		let s = String(59 - (timeDef - 60 * m));
		if (s.length == 1) {
			s = "0" + s;
		}
		setSeconds(s);

		if (m > pointInterval) {
			m = m - pointInterval * Math.floor(m / pointInterval);
		}
		m = String(pointInterval - 1 - m);
		if (m.length == 1) {
			m = "0" + m;
		}
		setMinutes(m);
		setIsReady(true);
	};

	return (
		<ImageBackground
			source={require("./assets/backgroundImage.png")}
			style={{ flex: 1, height: height }}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ height: 80, flexDirection: "row" }}>
					<View
						style={{ width: 80, height: 80, backgroundColor: "blue" }}
					></View>
					<View
						style={{
							justifyContent: "center",
							// alignItems: "center",
							flex: 1,
							marginHorizontal: 5,
						}}
					>
						<View style={{ flex: 1 }}>
							<View
								style={{
									backgroundColor: "white",
									margin: 3,
									flex: 1,
									alignItems: "center",
									// justifyContent: "center",
									paddingHorizontal: 5,
									flexDirection: "row",
								}}
							>
								<View
									style={{
										position: "absolute",
										top: -10,
										left: 5,
										flexDirection: "row",

										width: "100%",
										// alignItems: "center",
									}}
								>
									<View
										style={{
											alignItems: "center",

											flex: 1,
										}}
									>
										<Forque
											style={{
												fontSize: 23,
												fontWeight: "800",
												flex: 1,
												// marginRight: 10,
											}}
										>
											Energy
										</Forque>
									</View>
									<View
										style={{
											// alignItems: "center",
											paddingTop: 3,

											flex: 1,
										}}
									>
										<Forque
											style={{
												fontSize: 20,
												fontWeight: "800",

												// marginRight: 10,
												// width: "40%",
											}}
										>
											{Math.floor(point / maxPoint) !== 1 &&
												minutes + ":" + seconds}
										</Forque>
									</View>
									<View
										style={{
											alignItems: "center",
										}}
									>
										<Forque
											style={{
												fontSize: 23,
												fontWeight: "800",
											}}
										>
											{point} / {maxPoint}
										</Forque>
									</View>
								</View>
								<View
									style={{
										backgroundColor: "blue",
										// margin: 3,
										// flex: 1,
										// alignItems: "center",
										// justifyContent: "center",
										height: 10,
										width: "100%",
									}}
								>
									<View
										style={{
											backgroundColor: "green",
											flex: 1,
											alignItems: "center",
											// justifyContent: "center",
											flexDirection: "row",
											height: 10,
											width:
												point < 100 ? `${(point / maxPoint) * 100}}%` : "100%",
										}}
									></View>
								</View>
							</View>
						</View>
						<View style={{ flex: 1, flexDirection: "row" }}>
							<View style={{ flex: 1 }}>
								<View
									style={{
										backgroundColor: "white",
										margin: 3,
										flex: 1,
									}}
								></View>
							</View>
							<View style={{ flex: 1 }}>
								<View
									style={{
										backgroundColor: "white",
										margin: 3,
										flex: 1,
									}}
								></View>
							</View>
						</View>
					</View>
					<View
						style={{
							width: 70,
							height: 80,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Button title="menu" />
					</View>
				</View>
				<Tab.Navigator>
					<Tab.Screen name="HomeScreens" component={HomeScreens} />
					<Tab.Screen name="CharacterScreens" component={CharacterScreens} />
				</Tab.Navigator>
			</SafeAreaView>
		</ImageBackground>
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
			<Stack.Screen name="StageConfirm" component={StageConfirmScreen} />
		</Stack.Navigator>
	);
};
const CharacterScreens = () => {
	return (
		<Stack.Navigator
			headerMode="none"
			screenOptions={{ animationEnabled: false }}
		>
			<Stack.Screen name="Character" component={CharacterScreen} />
			<Stack.Screen name="CharacterList" component={CharacterListScreen} />
			<Stack.Screen name="Team" component={TeamScreen} />
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
			<Stack.Screen name="Ranking" component={RankingScreen} />
			<Stack.Screen name="Result" component={ResultScreen} />
		</Stack.Navigator>
	);
}

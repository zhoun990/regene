import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Platform,
	Image,
	Modal,
	TouchableWithoutFeedback,
	Animated,
} from "react-native";
// import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
	AdMobBanner,
	AdMobInterstitial,
	PublisherBanner,
	AdMobRewarded,
	setTestDeviceIDAsync,
} from "expo-ads-admob";
import { resetPanelAds } from "../../../components/resetPanelAds";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { Colors } from "../../../utils/colors";
import Constants from "expo-constants";
import * as Analytics from "expo-firebase-analytics";
import * as StoreReview from "expo-store-review";
import * as Haptics from "expo-haptics";
import {
	Text,
	Button,
	Forque,
	ModalOneButtonWithCancel,
} from "../../../custom/CustomComponents";
import { actions } from "../../../stores/datas";
import { stageProvider } from "../../../src/stages";
import { auth, db } from "../../../api/Firebase/firebase";
import { characterPicker } from "../../../src/characterPicker";
import Icon from "react-native-vector-icons/Ionicons";

export const MainScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const state = useSelector((panel) => panel.datas);
	const panel = useSelector((panel) => panel.datas.panel);

	const remaining = Colors.count + 4 * state.level;
	const adTurn =
		remaining * (Math.floor(state.count / remaining) + 1) - 1 - state.count;
	const params = route.params;
	const [stage, setStage] = useState(null);
	const [rowLength, setRowLength] = useState(4);
	const [columLength, setColumLength] = useState(4);
	const [team, setTeam] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [modalVisible3, setModalVisible3] = useState(false);
	const animation = React.useMemo(() => new Animated.Value(0), []);

	useEffect(() => {
		const array = [];
		for (let c of state.team) {
			array.push(Object.assign(state.card[c]));
		}
		setTeam(array);
	}, []);
	if (!panel) {
		return null;
	}

	useEffect(() => {
		dispatch(actions.loading(false));
		// dispatch(actions.initPanels());
		// if (!state.isInited) {
		// 	Alert.alert(i18n.t("hint"), i18n.t("hintText"));
		// 	dispatch(actions.initPanels());
		// }
		const mapItem1 = [];
		const mapItem2 = [];
		const stageSata = stageProvider(params.name);
		if (stageSata !== null) {
			if (!state.isPlaying || state.stageName !== params.name) {
				dispatch(actions.initPanels({ stage: stageSata, name: params.name }));
			}
			for (
				let i = 0;
				i < Math.floor(stageSata.panel.length / stageSata.row);
				i++
			) {
				mapItem1.push(i);
			}
			for (let i = 0; i < stageSata.row; i++) {
				mapItem2.push(i);
			}
			setColumLength(mapItem1);
			setRowLength(mapItem2);
		}
		setStage(stageSata);

		// (async () => {
		// await setTestDeviceIDAsync("EMULATOR");
		// await AdMobRewarded.setAdUnitID(
		// 	// "ca-app-pub-4125138884903603/4614205616"
		// 	__DEV__ || !Constants.isDevice
		// 		? "ca-app-pub-3940256099942544/5224354917"
		// 		: "ca-app-pub-4125138884903603/4614205616"
		// );
		// adRequest();
		// await AdMobRewarded.requestAdAsync();
		// })();
		Analytics.setCurrentScreen("xx_main_screen");
	}, []);
	if (stage == null) {
		return null;
	}
	const adRequest = async () => {
		// await AdMobRewarded.requestAdAsync();
	};
	const colorMaker = (n) => {
		if (!panel[n].isDead) {
			return "black";
		} else {
			return "white";
		}
	};
	const onPress = (n) => {
		if (adTurn !== 0) {
			if (!panel[n].isDead) {
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

				dispatch(actions.updateSinglePanel(n));
				const deadPanelCount =
					panel.filter((item) => item.isDead == true).length + 1;
				console.log(
					"🚀 ~ file: mainScreen.js ~ line 108 ~ onPress ~ deadPanelCount",
					deadPanelCount
				);
				if (deadPanelCount == panel.length) {
					// if (state.level == 2 && !state.askedReview2) {
					// 	StoreReview.requestReview();
					// 	dispatch(actions.reviewHandler("2"));
					// } else if (state.level == 4 && !state.askedReview4) {
					// 	StoreReview.requestReview();
					// 	dispatch(actions.reviewHandler("4"));
					// }
					Alert.alert(
						i18n.t("congratulations"),
						`Level${state.level}${i18n.t("clearText")}`,
						[
							{
								text: "Next",
								onPress: () => {
									dispatch(
										actions.loading({
											loading: true,
											relocate: {
												screen: "Ranking",
												params: {},
											},
										})
									);
								},
							},
						],
						{ cancelable: false }
					);
					Analytics.logEvent(`xx_level_${state.level}_cleared`);
				}
			}
		} else {
			dispatch(actions.updateSinglePanel(n));

			// resetPanelAds(i18n.t("timeup")).then((bool) => {
			// 	if (bool) {
			// 		dispatch(actions.updateSinglePanel(n));
			// 		adRequest();
			// 		Analytics.logEvent("xx_timeuped_and_watched_an_ad");
			// 	} else {
			// 		Analytics.logEvent("xx_timeuped_and_didnt_watched_an_ad");
			// 	}
			// });
		}
	};
	const reset = () => {
		if (Platform.OS == "web" && state.level == 1) {
			dispatch(actions.initPanels());
		} else {
			resetPanelAds(i18n.t("watchAdsText")).then((bool) => {
				if (bool) {
					dispatch(actions.initPanels());
					adRequest();
					Analytics.logEvent("xx_reset_add_reworded");
				} else {
					Analytics.logEvent("xx_reset_ad_canceled");
				}
			});
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.gray1 }}>
			<ModalOneButtonWithCancel
				visible={modalVisible2}
				setModalVisible={setModalVisible2}
				text="Are you sure ?"
				title="Give up"
				onPress={() => {
					setModalVisible(false);
					dispatch(
						actions.loading({
							loading: true,
							relocate: {
								screen: "BaseTabs",
								params: {
									screen: "HomeScreens",
									params: { screen: "Home" },
								},
							},
						})
					);
					navigation.navigate("BaseTabs");
				}}
			/>
			<Modal
				animationType="none"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Animated.timing(animation, {
						toValue: 0,
						duration: 100,
						useNativeDriver: true,
					}).start(({ finished }) => {});
				}}
				onShow={() => {
					Animated.timing(animation, {
						toValue: 0.5,
						duration: 200,
						useNativeDriver: true,
					}).start(({ finished }) => {});
				}}
			>
				<View style={{ flex: 1 }}>
					<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
						<Animated.View
							style={{
								backgroundColor: "black",
								opacity: animation,
								height: "100%",
								width: "100%",
								position: "absolute",
								zIndex: -1,
							}}
						/>
					</TouchableWithoutFeedback>

					<View
						style={{
							opacity: 1,
							backgroundColor: Colors.blue2,
							flex: 1,
							marginHorizontal: "10%",
							marginVertical: "30%",
							borderRadius: 10,
							borderWidth: 2,
							borderColor: "white",
						}}
					>
						<View
							style={{
								backgroundColor: Colors.blue1,
								marginHorizontal: "10%",
								marginVertical: 10,
								borderRadius: 10,
								paddingVertical: 10,
								alignItems: "center",
							}}
						>
							<Forque style={{ fontSize: 30 }}>Menu</Forque>
						</View>
						<View
							style={{
								flex: 1,
								marginHorizontal: "10%",
								paddingVertical: 10,
								alignItems: "center",
							}}
						>
							<Button
								title="Give up"
								color="yellow"
								style={{ width: 200 }}
								onPress={() => {
									setModalVisible2(true);
								}}
							/>
							<Button
								title="Restart"
								color="yellow"
								style={{ width: 200, marginTop: 20 }}
								onPress={() => {
									setModalVisible2(true);
								}}
							/>
						</View>
						<View
							style={{
								marginHorizontal: "10%",
								paddingVertical: 10,
								alignItems: "center",
							}}
						>
							<Button
								title="Close"
								color="yellow"
								style={{ width: 200 }}
								onPress={() => {
									setModalVisible(false);
								}}
							/>
						</View>
					</View>
				</View>
			</Modal>
			<Modal
				animationType="none"
				transparent={true}
				visible={modalVisible3}
				onRequestClose={() => {
					Animated.timing(animation, {
						toValue: 0,
						duration: 100,
						useNativeDriver: true,
					}).start(({ finished }) => {});
				}}
				onShow={() => {
					Animated.timing(animation, {
						toValue: 0.5,
						duration: 200,
						useNativeDriver: true,
					}).start(({ finished }) => {});
				}}
			>
				<View style={{ flex: 1 }}>
					<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
						<Animated.View
							style={{
								backgroundColor: "black",
								opacity: animation,
								height: "100%",
								width: "100%",
								position: "absolute",
								zIndex: -1,
							}}
						/>
					</TouchableWithoutFeedback>
					<View
						style={{
							// opacity: 1,
							flex: 1,
							justifyContent: "center",
						}}
					>
						<View
							style={{
								opacity: 1,
								backgroundColor: Colors.blue2,
								// flex: 1,
								marginHorizontal: "10%",
								// marginVertical: "50%",
								borderRadius: 10,
								borderWidth: 2,
								borderColor: "white",
							}}
						>
							<View
								style={{
									backgroundColor: Colors.blue1,
									marginHorizontal: "10%",
									marginVertical: 10,
									borderRadius: 10,
									paddingVertical: 10,
									alignItems: "center",
								}}
							>
								<Forque style={{ fontSize: 30 }}>
									Do you want to skip one turn and heal your stamina bar?
								</Forque>
							</View>
							<View
								style={{
									// flex: 1,
									marginHorizontal: "10%",
									paddingVertical: 10,
									alignItems: "center",
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								<Button
									title="Skip and heal"
									color="yellow"
									style={{ marginHorizontal: 20 }}
									onPress={() => {
										dispatch(actions.updateSinglePanel("skip"));
										setModalVisible3(false);
									}}
								/>
								<Button
									title="Cancel"
									color="yellow"
									style={{
										marginHorizontal: 20,
									}}
									onPress={() => {
										setModalVisible3(false);
									}}
								/>
							</View>
						</View>
					</View>
				</View>
			</Modal>
			<View style={{ flex: 1, marginBottom: 10 }}>
				<View
					style={{
						// flex: 1,
						height: 20,
						backgroundColor: "#1a264d",
						flexDirection: "row",
						borderRadius: 5,
						// padding: 2,
						marginHorizontal: 20,
						height: 30,
						shadowColor: "white",
						shadowOffset: { width: 0, height: 1 },
						shadowOpacity: 1,
						shadowRadius: 1,
					}}
				>
					<View
						style={{
							backgroundColor: "#60cdff",
							width: `${(state.stamina / 100) * 100}%`,
							// margin: 2,
							borderRadius: 5,
						}}
					></View>
					<View
						style={{
							position: "absolute",
							height: "100%",
							width: "100%",
							alignItems: "center",
							justifyContent: "center",
							// borderWidth: 1,
						}}
					>
						<Text style={{ fontWeight: "700", color: "white" }}>
							{state.stamina}/ {100}
						</Text>
					</View>
				</View>
				<View
					style={{
						height: 40,
						marginBottom: 20,
					}}
				>
					<View
						style={{
							flex: 1,
							// height: 20,
							flexDirection: "row",
							justifyContent: "space-evenly",
							alignItems: "center",
							// borderWidth: 1,
						}}
					>
						<View
							style={{
								alignItems: "center",
							}}
						>
							<Text style={{ color: Colors.secondary }}>{i18n.t("count")}</Text>
							<Text>
								{state.count} {i18n.t("turn")}
							</Text>
						</View>
						<View
							style={{
								alignItems: "center",
							}}
						>
							<Text style={{ color: Colors.secondary }}>
								{i18n.t("adCount")}
							</Text>
							<Text>
								{adTurn}
								{i18n.t("turn")}
							</Text>
						</View>
					</View>
				</View>
				{columLength.map((column, i) => (
					<View key={i} style={{ flex: 1, flexDirection: "row" }}>
						{rowLength.map((row, i) => {
							const n = row + (column * (stage.row - 1) + column);
							return (
								<TouchableOpacity
									key={i}
									style={{
										flex: 1,
										borderWidth: 1,
										backgroundColor: colorMaker(n),
										borderColor: "white",
										alignItems: "center",
										justifyContent: "center",
									}}
									onPress={() => {
										onPress(n);
									}}
								>
									<Text style={{ color: "white" }}>{panel[n].restTurn}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				))}
			</View>
			<View
				style={{
					// flex: 1,
					height: "8%",
					flexDirection: "row",
				}}
			>
				<View
					style={{
						// flex: 1,
						backgroundColor: "#1e1821",
						// margin: 1,
						marginBottom: 0,
						borderRadius: 5,
						borderWidth: 1,
						borderColor: Colors.blue1,
					}}
				>
					<View
						style={{
							// flex: 1,

							backgroundColor: "#333841",
							// marginVertical: 10,
							marginHorizontal: 7,
							borderRadius: 5,
							// paddingHorizontal: 10,
						}}
					>
						<View
							style={{
								// flex: 1,
								// marginVertical: 10,

								// alignItems: "center",
								// justifyContent: "space-around",
								flexDirection: "row",
							}}
						>
							{team.map((item, i) => (
								<Image
									key={i}
									style={[
										{
											// flex: 1,
											width: undefined,
											height: "100%",
											aspectRatio: 1,
											marginRight: 4,
										},
										i == 0 && {
											borderWidth: 1.5,
											borderColor: Colors.red2,
										},
									]}
									source={characterPicker[item.n[0]][item.n[1]].icon}
								/>
							))}

							{team.length < 3 && (
								<View
									style={{
										width: undefined,
										height: "100%",
										aspectRatio: 1,
										marginRight: 4,
										borderWidth: 1.5,
										borderColor: Colors.secondary,
									}}
								/>
							)}
							{team.length < 4 && (
								<View
									style={{
										width: undefined,
										height: "100%",
										aspectRatio: 1,
										marginRight: 4,
										borderWidth: 1.5,
										borderColor: Colors.secondary,
									}}
								/>
							)}
						</View>
					</View>
				</View>
				<View
					style={{
						alignItems: "center",
						justifyContent: "space-around",
						flex: 1,
						flexDirection: "row",
					}}
				>
					<Button title="Skip" onPress={() => setModalVisible3(true)} />
					<Button style={{ width: 40 }} onPress={() => setModalVisible(true)}>
						<Icon name="menu" size={25} color="white" />
					</Button>
				</View>
			</View>
			{/* {Platform.OS !== "web" && (
				<AdMobBanner
					// style={{ width: 200 }}
					// bannerSize="fullBanner"
					adUnitID={
						// "ca-app-pub-4125138884903603/8811297461"
						__DEV__ || !Constants.isDevice
							? "ca-app-pub-3940256099942544/6300978111"
							: "ca-app-pub-4125138884903603/8811297461"
					} // Test ID, Replace with your-admob-unit-id
					// servePersonalizedAds // true or false
					// onDidFailToReceiveAdWithError={this.bannerError}
				/>
			)} */}
		</SafeAreaView>
	);
};

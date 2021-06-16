import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Platform,
	ScrollView,
	Image,
	ImageBackground,
	Dimensions,
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
import { Forque, Button, Text } from "../../../custom/CustomComponents";
import { actions } from "../../../stores/datas";
import { stageProvider } from "../../../src/stages";
import { auth, db, functions } from "../../../api/Firebase/firebase";
import { characterPicker } from "../../../src/characterPicker";

const uploadResult = functions.httpsCallable("uploadResult");
const { width, height, scale } = Dimensions.get("window");

// const uploadResult = (data) => {
// 	console.log(
// 		"🚀 ~ file: RankingScreen.js ~ line 33 ~ uploadResult ~ data",
// 		data.log
// 	);
// 	return {
// 		rank: 3,
// 		top: [
// 			{ name: "111111111111111111111111111111111", turn: 15, isUser: false },
// 			{ name: "222", turn: 17, isUser: false },
// 			{ name: "user", turn: 18, isUser: true },
// 			{ name: "444", turn: 20, isUser: false },
// 			{ name: "555", turn: 23, isUser: false },
// 		],
// 	};
// };
export const ResultScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const state = useSelector((panel) => panel.datas);
	const result = useSelector(
		(panel) =>
			panel.datas.resultHistory[panel.datas.resultHistory.length - 1].reward
	);
	console.log(
		"🚀 ~ file: ResultScreen.js ~ line 56 ~ ResultScreen ~ result",
		result
	);
	useEffect(() => {
		dispatch(actions.loading(false));
	}, []);
	const onPress = () => {
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
	};
	return (
		<ImageBackground
			source={require("../../../assets/backgroundImage.png")}
			style={{ flex: 1, height: height }}
		>
			<SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
				<View
					style={{
						// backgroundColor: "#fffc58",
						height: "25%",
						borderWidth: 2,
						borderRadius: 20,
						borderColor: "#f18408",
						margin: 10,
					}}
				>
					<View
						style={{
							flex: 1,
							backgroundColor: "#fff9a0",
							// height: "30%",
							borderWidth: 2,
							borderRadius: 30,
							borderColor: "#f18408",
							// alignItems: "center",
							margin: 4,
							paddingBottom: 20,
						}}
					>
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								// marginBottom: 20,
								// borderWidth: 1,
							}}
						>
							<Forque style={{ fontSize: 30 }}>Result </Forque>
						</View>
						<View
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								marginTop: 10,
								// marginBottom: 20,
							}}
						>
							<Forque style={{ fontSize: 19 }}>Gold : {result.gold}</Forque>
						</View>
					</View>
				</View>

				<View style={{ flex: 1 }}>
					<View style={{ alignItems: "center" }}>
						<Forque style={{ fontSize: 30 }}>Your New Character !</Forque>
					</View>
					<View
						style={{
							// flex: 1,

							backgroundColor: Colors.gray1,
							margin: 10,
							marginBottom: 0,
							marginTop: 5,
							borderRadius: 10,
							flexDirection: "row",
							borderWidth: 1,
							borderColor: Colors.blue1,
						}}
					>
						<View style={{}}>
							<View
								style={[
									{
										// flex: 1,
										justifyContent: "center",
										alignItems: "center",
										// margin: 10,
										borderRadius: 15,
										margin: 4,
										borderWidth: 5,
									},
									characterPicker[result.character.n[0]][result.character.n[1]]
										.rarity == 0 && {
										borderColor: "white",
									},
									characterPicker[result.character.n[0]][result.character.n[1]]
										.rarity == 1 && {
										borderColor: Colors.gold1,
									},
									characterPicker[result.character.n[0]][result.character.n[1]]
										.rarity == 2 && {
										borderColor: Colors.purple1,
									},
								]}
							>
								<Image
									style={{
										width: width / 2 - 20,
										height: undefined,
										aspectRatio: 0.75,
										// borderWidth: 3,
										// padding: 3,
										borderRadius: 10,
									}}
									// source={require(`../../../../../assets/characters/${result.character.card}.png`)}
									source={
										characterPicker[result.character.n[0]][
											result.character.n[1]
										].card
									}
								/>
							</View>

							<View
								style={{
									height: 30,
									marginBottom: 10,
									justifyContent: "center",
								}}
							>
								<View
									style={{
										height: 30,
										width: width / 2,
										position: "absolute",
										alignItems: "center",
										// backgroundColor: "#60cdff",
										borderRightWidth: 20,
										// borderBottomWidth: 30,
										borderTopWidth: 30,
										// borderLeftWidth: 20,
										borderRightColor: "white",
										borderLeftColor: "transparent",
										borderTopColor: "#60cdff",
										borderBottomColor: "transparent",
										borderRightColor: "transparent",
									}}
								></View>

								<View
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Forque style={{ fontSize: 25 }}>
										{
											characterPicker[result.character.n[0]][
												result.character.n[1]
											].name
										}
									</Forque>
								</View>
							</View>
						</View>
						<View style={{ flex: 1 }}>
							<View
								style={{
									flex: 1,
									paddingHorizontal: 10,
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<View
									style={{
										flex: 1,
										height: 20,
										backgroundColor: "#1a264d",
										flexDirection: "row",
										borderRadius: 5,
										padding: 2,
									}}
								>
									<View
										style={{
											backgroundColor: "#60cdff",
											width: `${
												(result.character.fragment /
													(result.character.lv * result.character.lv * 100)) *
												100
											}%`,
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
										}}
									>
										<Text style={{ fontWeight: "700", color: "white" }}>
											{result.character.fragment}/{" "}
											{result.character.lv * result.character.lv * 100}
										</Text>
									</View>
								</View>
								<View style={{ marginLeft: 5 }}>
									<Forque>Lv.{result.character.lv}</Forque>
								</View>
							</View>
							<View
								style={{
									padding: 10,
								}}
							>
								<View
									style={{
										borderWidth: 1,
										borderRadius: 5,
										backgroundColor: Colors.blue2,
										borderColor: Colors.blue1,
									}}
								>
									<View
										style={{
											flexDirection: "row",
											borderRadius: 5,
											backgroundColor: Colors.blue1,
											margin: 3,
										}}
									>
										<View
											style={{
												flex: 1,
												height: undefined,
												aspectRatio: 1,
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Forque style={{ fontSize: 22 }}>SPD</Forque>
											<Forque style={{ fontSize: 22 }}>
												{result.character.params[0]}
											</Forque>
										</View>
										<View
											style={{
												flex: 1,
												height: undefined,
												aspectRatio: 1,
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Forque style={{ fontSize: 22 }}>PWR</Forque>
											<Forque style={{ fontSize: 22 }}>
												{result.character.params[1]}
											</Forque>
										</View>
										<View
											style={{
												flex: 1,
												height: undefined,
												aspectRatio: 1,
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Forque style={{ fontSize: 22 }}>STM</Forque>
											<Forque style={{ fontSize: 22 }}>
												{result.character.params[2]}
											</Forque>
										</View>
										<View
											style={{
												flex: 1,
												height: undefined,
												aspectRatio: 1,
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Forque style={{ fontSize: 22 }}>INT</Forque>
											<Forque style={{ fontSize: 22 }}>
												{result.character.params[3]}
											</Forque>
										</View>
									</View>
								</View>
							</View>
							<View
								style={{
									padding: 10,
								}}
							>
								<View
									style={{
										borderWidth: 1,
										borderRadius: 5,
										backgroundColor: Colors.yellow2,
										borderColor: Colors.yellow1,
										marginVertical: 5,
									}}
								>
									<View
										style={{
											flexDirection: "row",
											borderRadius: 5,
											backgroundColor: Colors.yellow1,
											margin: 3,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Forque>{result.character.skill}</Forque>
									</View>
								</View>
								<View
									style={{
										borderWidth: 1,
										borderRadius: 5,
										backgroundColor: Colors.blue2,
										borderColor: Colors.blue1,
										marginTop: 5,
									}}
								>
									<View
										style={{
											flexDirection: "row",
											borderRadius: 5,
											backgroundColor: Colors.blue1,
											margin: 3,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Forque>{result.character.passive_1}</Forque>
									</View>
								</View>
								<View
									style={{
										borderWidth: 1,
										borderRadius: 5,
										backgroundColor: Colors.blue2,
										borderColor: Colors.blue1,
										marginTop: 5,
									}}
								>
									<View
										style={{
											flexDirection: "row",
											borderRadius: 5,
											backgroundColor: Colors.blue1,
											margin: 3,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Forque>{result.character.passive_2}</Forque>
									</View>
								</View>
								<View
									style={{
										borderWidth: 1,
										borderRadius: 5,
										backgroundColor: Colors.blue2,
										borderColor: Colors.blue1,
										marginTop: 5,
									}}
								>
									<View
										style={{
											flexDirection: "row",
											borderRadius: 5,
											backgroundColor: Colors.blue1,
											margin: 3,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Forque>{result.character.inheritedPassive_1}</Forque>
									</View>
								</View>
								<View
									style={{
										borderWidth: 1,
										borderRadius: 5,
										backgroundColor: Colors.blue2,
										borderColor: Colors.blue1,
										marginTop: 5,
									}}
								>
									<View
										style={{
											flexDirection: "row",
											borderRadius: 5,
											backgroundColor: Colors.blue1,
											margin: 3,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Forque>{result.character.inheritedPassive_2}</Forque>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
				<Button
					// type="outline"
					style={{ marginHorizontal: 30, marginTop: 5 }}
					title="Next"
					onPress={onPress}
				/>
			</SafeAreaView>
		</ImageBackground>
	);
};

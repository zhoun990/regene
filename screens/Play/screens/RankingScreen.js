import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Platform,
	ScrollView,
	Animated,
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
import { Forque, Button } from "../../../custom/CustomComponents";
import { actions } from "../../../stores/datas";
import { stageProvider } from "../../../src/stages";
import { auth, db, functions } from "../../../api/Firebase/firebase";

const uploadResult = functions.httpsCallable("uploadResult");
const { width, height, scale } = Dimensions.get("window");

export const RankingScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const state = useSelector((panel) => panel.datas);
	const params = route.params;
	const [rank, setRank] = useState(null);
	const [reward, setReward] = useState(null);
	const [ranking, setRanking] = useState(null);
	const [result, setResult] = useState(null);

	useEffect(() => {
		(async () => {
			await uploadResult({
				stageName: state.stageName,
				log: state.log,
				username: auth.currentUser.displayName,
				team: state.team,
			})
				.then(({ data }) => {
					if (!data) {
						// Alert.alert("Something wrong");
					} else {
						dispatch(actions.gameEnd());

						db.collection("user")
							.doc(auth.currentUser.uid)
							.collection("card")
							.orderBy("time", "desc")
							.limit(1)
							.get()
							.then((snapshot) => {
								dispatch(
									actions.setCharacter({
										id: snapshot.docs[0].id,
										...snapshot.docs[0].data(),
									})
								);
							})
							.catch((err) => {
								console.log(
									"🚀 ~ file: RankingScreen.js ~ line 285 ~ .then ~ err",
									err
								);
							});
						console.log(
							"🚀 ~ file: RankingScreen.js ~ line 63 ~ .then ~ resultData",
							data
						);
						const a = {};
						dispatch(
							actions.resultHistory({
								rank: data.rank,
								reward: data.reward,
								score: data.score,
							})
						);

						// setRank(data.rank);
						// setReward(data.reward);
						const rankingSorted = data.top.sort((a, b) => a.score - b.score);
						const array = [];
						for (let i = 0; i < rankingSorted.length; i++) {
							if (
								array.filter((item) => item.score == rankingSorted[i].score) ==
								0
							) {
								array.push(rankingSorted[i].score);
							}
						}
						const arraySorted = array.sort((a, b) => a - b);
						for (let i = 0; i < rankingSorted.length; i++) {
							const rank = arraySorted.indexOf(rankingSorted[i].score) + 1;
							rankingSorted[i].rank = rank;
						}
						// setRanking(rankingSorted);
						setResult({
							rank: data.rank,
							score: data.score,
							ranking: rankingSorted,
						});
						dispatch(actions.loading(false));
					}
				})
				.catch((err) => {
					console.log("🚀 ~ file: RankingScreen.js ~ line 65 ~ err", err);
				});
		})();
	}, []);
	const onPress = () => {
		dispatch(
			actions.loading({
				loading: true,
				relocate: {
					screen: "Result",
				},
			})
		);
	};
	if (!result) {
		return <View style={{ backgroundColor: Colors.gray1 }}></View>;
	}
	return (
		<ImageBackground
			source={require("../../../assets/backgroundImage.png")}
			style={{ flex: 1, height: height }}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<View
					style={{
						// flex: 1,
						backgroundColor: Colors.yellow3,
						height: "30%",
						borderWidth: 1,
						borderRadius: 5,
						borderColor: Colors.yellow1,
						alignItems: "center",
						margin: 5,
						paddingVertical: 20,
						flexDirection: "row",
						paddingHorizontal: 20,
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: "center",
							borderWidth: 1,
							backgroundColor: Colors.blue2,
							marginHorizontal: 20,
							padding: 10,
							borderRadius: 5,
							// marginTop: 10,
							// marginBottom: 20,
						}}
					>
						<Forque style={{ fontSize: 30 }}>Your Rank</Forque>
						<View
							style={{
								borderWidth: 3,
								borderRadius: 100,
								width: 70,
								height: 70,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Forque style={{ color: "#ff8800", fontSize: 30 }}>
								{result.rank}
							</Forque>
						</View>
					</View>
					<View
						style={{
							flex: 1,
							// alignItems: "center",
							backgroundColor: Colors.blue2,
							marginHorizontal: 20,
							// padding: 10,
							borderWidth: 1,
							borderRadius: 5,
						}}
					>
						<View
							style={{
								backgroundColor: Colors.blue1,
								paddingVertical: 10,
								paddingHorizontal: 10,
								marginVertical: 5,
								borderRadius: 5,
								alignItems: "center",
								marginHorizontal: 10,
							}}
						>
							<Forque style={{ fontSize: 30 }}>Record</Forque>
						</View>
						<View
							style={{
								padding: 10,
								marginBottom: 5,
								borderRadius: 5,
								alignItems: "center",
								marginHorizontal: 10,
							}}
						>
							<Forque style={{ fontSize: 25 }}>Score : {result.score}</Forque>
							<Forque style={{ fontSize: 25 }}>
								Clear turn : {state.log.data.length - 1}
							</Forque>
						</View>
					</View>
				</View>

				<View style={{ alignItems: "center" }}>
					<Forque style={{ fontSize: 25 }}>Ranking(tentative)</Forque>
				</View>
				<ScrollView
					style={{
						borderWidth: 3,
						borderRadius: 10,
						borderColor: "#f18408",
						marginHorizontal: 10,
						marginBottom: 5,
						backgroundColor: "white",
					}}
				>
					{result.ranking.map((item, i) => (
						<View
							key={i}
							style={{ backgroundColor: "white", flexDirection: "row" }}
						>
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									marginLeft: 10,
								}}
							>
								<Forque
									style={{
										fontSize: 30,
									}}
								>
									{item.rank}
								</Forque>
							</View>
							<View
								style={{
									flex: 1,
									marginVertical: 5,
									marginHorizontal: 5,
									paddingHorizontal: 5,
									borderWidth: 2,
									borderRadius: 25,
									justifyContent: "center",
									// alignItems: "center",
									borderColor: Colors.primary,
									backgroundColor: Colors.primary,
									flexDirection: "row",
								}}
							>
								<View
									style={{
										flex: 1,
										justifyContent: "center",
										flexDirection: "row",
										marginVertical: 5,
									}}
								>
									<View
										style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Forque style={{ fontSize: 28, color: "white" }}>
											{item.username.substr(0, 10)}
										</Forque>
									</View>

									<View
										style={{
											flex: 1,
											// backgroundColor: "white",
											// marginHorizontal: 30,
											// marginVertical: 5,
											// paddingVertical: 2,
											// borderRadius: 100,
											// borderWidth: 1,
											// alignItems: "center",
										}}
									>
										<View
											style={{
												flex: 1,
												marginHorizontal: 30,
												// marginVertical: 5,
												// paddingVertical: 2,
												alignItems: "center",
											}}
										>
											<Forque style={{ color: "white" }}>clear turn</Forque>
										</View>
										<View
											style={{
												flex: 1,
												backgroundColor: "white",
												marginHorizontal: 30,
												marginVertical: 5,
												paddingVertical: 2,
												borderRadius: 100,
												alignItems: "center",
											}}
										>
											<Forque style={{ color: Colors.secondary }}>
												{item.score}
											</Forque>
										</View>
									</View>
								</View>
							</View>
						</View>
					))}
				</ScrollView>
				<Button
					style={{ marginHorizontal: 30, marginTop: 5 }}
					title="Next"
					onPress={onPress}
				/>
			</SafeAreaView>
		</ImageBackground>
	);
};

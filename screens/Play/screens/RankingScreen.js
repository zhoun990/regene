import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Platform,
	ScrollView,
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
import { Forque, Button } from "../../../custom/CustomComponents";
import { actions } from "../../../stores/datas";
import { stageProvider } from "../../../src/stages";
import { auth, db, functions } from "../../../api/Firebase/firebase";

const uploadResult = functions.httpsCallable("uploadResult");
// const uploadResult = (data) => {
// 	let promise = new Promise(async (resolve, reject) => {
// 		resolve({
// 			rank: 3,
// 			top: {
// 				aaa: {
// 					name: "111111111111111111111111111111111",
// 					turn: 15,
// 					isUser: false,
// 				},
// 				bbb: { name: "222", turn: 17, isUser: false },
// 				ccc: { name: "user", turn: 18, isUser: true },
// 				ddd: { name: "444", turn: 20, isUser: false },
// 				eee: { name: "555", turn: 23, isUser: false },
// 			},
// 		});
// 	});
// 	return promise;
// };
export const RankingScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const state = useSelector((panel) => panel.datas);
	const params = route.params;
	const [rank, setRank] = useState(null);
	const [reward, setReward] = useState(null);
	const [ranking, setRanling] = useState(null);

	useEffect(() => {
		(async () => {
			await uploadResult({
				name: state.stageName,
				log: state.log,
				username: auth.currentUser.displayName,
			})
				.then((resultData) => {
					console.log(
						"🚀 ~ file: RankingScreen.js ~ line 63 ~ .then ~ resultData",
						resultData
					);

					setRank(resultData.data.rank);
					setReward(resultData.data.reward);
					const rankingSorted = resultData.data.top.sort(
						(a, b) => a.count - b.count
					);
					const array = [];
					for (let i = 0; i < rankingSorted.length; i++) {
						if (
							array.filter((item) => item.count == rankingSorted[i].count) == 0
						) {
							array.push(rankingSorted[i].count);
						}
					}
					const araySorted = array.sort((a, b) => a - b);
					for (let i = 0; i < rankingSorted.length; i++) {
						const rank = araySorted.indexOf(rankingSorted[i].count) + 1;

						rankingSorted[i].rank = rank;
					}
					setRanling(rankingSorted);
					dispatch(actions.loading(false));
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
					params: {
						reward: reward,
					},
				},
			})
		);
	};
	if (!rank || !ranking) {
		return <View style={{ backgroundColor: Colors.secondary }}></View>;
	}
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
			<View
				style={{
					backgroundColor: "#fffc58",
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
						alignItems: "center",
						margin: 4,
						paddingVertical: 20,
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: "center",

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
							<Forque style={{ color: "#ff8800", fontSize: 30 }}>{rank}</Forque>
						</View>
						<Forque style={{ fontSize: 19 }}>
							clear turn : {state.log.data.length - 1}
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
				{ranking.map((item, i) => (
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
											{item.count}
										</Forque>
									</View>
								</View>
							</View>
						</View>
					</View>
				))}
			</ScrollView>
			<Button
				type="outline"
				style={{ marginHorizontal: 30, marginTop: 5 }}
				title="Next"
				onPress={onPress}
			/>
		</SafeAreaView>
	);
};

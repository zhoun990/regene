import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Platform,
	ScrollView,
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
	const params = route.params;
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
						<Forque style={{ fontSize: 19 }}>
							Gold : {params.reward.gold}
						</Forque>
					</View>
				</View>
			</View>
			<View style={{ flex: 1 }}></View>
			<Button
				type="outline"
				style={{ marginHorizontal: 30, marginTop: 5 }}
				title="Next"
				onPress={onPress}
			/>
		</SafeAreaView>
	);
};

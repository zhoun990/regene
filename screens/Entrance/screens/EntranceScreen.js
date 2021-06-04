import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18n-js";
import * as Linking from "expo-linking";
import * as Analytics from "expo-firebase-analytics";
import { Text, Button } from "../../../custom/CustomComponents";
import { Colors } from "../../../utils/colors";
import { auth } from "../../../api/Firebase/firebase";
import { actions } from "../../../stores/datas";

export const EntranceScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	useEffect(() => {
		Analytics.setCurrentScreen("xx_entrance_screen");
	}, []);
	const onPress = () => {
		if (auth.currentUser.displayName) {
			dispatch(
				actions.loading({
					loading: true,
					relocate: { screen: "BaseTabs", params: {} },
				})
			);

			// navigation.navigate("BaseTabs");
		} else {
			Alert.alert(
				i18n.t("doAgree"),
				"",
				[
					{
						text: i18n.t("agree"),
						onPress: () => {
							navigation.navigate("SetUp");
						},
					},
					{
						text: i18n.t("cancel"),
					},
				],
				{ cancelable: true }
			);
		}
	};
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.gray1 }}>
			<View
				style={{
					flex: 1,

					backgroundColor: Colors.primary,
					marginTop: 20,
					marginHorizontal: 20,
					borderRadius: 20,
					borderWidth: 2,
					borderColor: Colors.purple1,
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "white",
						margin: 5,
						borderRadius: 20,
					}}
				>
					<Image
						style={{
							width: 300,
							height: 300,
						}}
						source={require("../../../assets/icon_adaptive.png")}
					/>
					<View>
						<Text style={{ fontSize: 33, color: "#7d0b98" }}>Re:Generate</Text>
					</View>
				</View>
			</View>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Button
					title="Start Game"
					onPress={onPress}
					style={{ width: 200, height: 50 }}
				/>
			</View>
			<View
				style={{
					height: 50,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View
					style={{
						borderBottomWidth: 1,
						borderColor: Colors.link,
					}}
				>
					<Text
						onPress={() => {
							Linking.openURL(i18n.t("tosURL"));
						}}
						style={{ color: Colors.link }}
					>
						{i18n.t("tos")}
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

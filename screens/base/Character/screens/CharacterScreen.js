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
import { Forque, Button, Text } from "../../../../custom/CustomComponents";
import { actions } from "../../../../stores/datas";
import { Colors } from "../../../../utils/colors";
import { db } from "../../../../api/Firebase/firebase";
import { stageProvider } from "../../../../src/stages";

export const CharacterScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	useEffect(() => {
		// Analytics.setCurrentScreen("xx_home_screen");
	}, []);
	const onPress = (screen) => {
		navigation.navigate(screen);
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Button
					title="Team"
					onPress={() => {
						// navigation.navigate("StageSelect");
					}}
					style={{ width: 200, height: 50 }}
				/>
			</View>
			<View
				style={{
					flex: 1,
					// justifyContent: "center",
					// alignItems: "center",
					borderWidth: 1,
					flexDirection: "row",
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						borderWidth: 1,
					}}
				>
					<Forque>Level Up</Forque>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						borderWidth: 1,
					}}
				>
					<Forque>Composition</Forque>
				</View>
			</View>
			<View
				style={{
					flex: 1,
					// justifyContent: "center",
					// alignItems: "center",
					borderWidth: 1,
					flexDirection: "row",
				}}
			>
				<TouchableOpacity
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						borderWidth: 1,
					}}
					onPress={() => {
						onPress("CharacterList");
					}}
				>
					<Forque>Character list</Forque>
				</TouchableOpacity>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						borderWidth: 1,
					}}
				>
					<Forque>Evolution</Forque>
				</View>
			</View>
		</SafeAreaView>
	);
};

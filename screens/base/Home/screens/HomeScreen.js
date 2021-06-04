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
import { Button, Text } from "../../../../custom/CustomComponents";
import { actions } from "../../../../stores/datas";
import { Colors } from "../../../../utils/colors";
import { db } from "../../../../api/Firebase/firebase";
import { stageProvider } from "../../../../src/stages";

export const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	useEffect(() => {
		// stageProvider("deploy");
		Analytics.setCurrentScreen("xx_home_screen");
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Button
					title="Stage Select"
					onPress={() => {
						navigation.navigate("StageSelect");
					}}
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
				></View>
			</View>
		</SafeAreaView>
	);
};

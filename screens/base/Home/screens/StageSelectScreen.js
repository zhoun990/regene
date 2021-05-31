import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Image,
	ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18n-js";
import * as Linking from "expo-linking";
import * as Analytics from "expo-firebase-analytics";
import { ListItem, Avatar } from "react-native-elements";
import { Button, Text } from "../../../../custom/CustomComponents";
import { Colors } from "../../../../utils/colors";
import { TouchableWithoutFeedback } from "react-native";

export const StageSelectScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	useEffect(() => {
		Analytics.setCurrentScreen("xx_home_screen");
	}, []);
	const list = [
		{
			name: "Level 1",
			mp: 1,
		},
		{
			name: "Level 2",
			mp: 1,
		},
		{
			name: "Level 3",
			mp: 1,
		},
		{
			name: "Level 4",
			mp: 1,
		},
		{
			name: "Level 5",
			mp: 0,
		},
	];
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ListItem bottomDivider>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{/* <View style={{}}> */}
					<Button
						style={{ width: 100 }}
						title="Back"
						onPress={() => {
							navigation.navigate("Home");
						}}
					/>
					{/* </View> */}
					<View
						style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
					>
						<Text>{"Stage select"}</Text>
					</View>
				</View>
				{/* <View style={{ width: 40 }}></View> */}
			</ListItem>
			<ScrollView>
				{list.map((item, i) => (
					<View key={i} style={{ backgroundColor: "white" }}>
						<TouchableWithoutFeedback
							onPress={() => {
								navigation.navigate("GameScreens");
							}}
						>
							<View
								style={{
									flex: 1,
									marginVertical: 10,
									marginHorizontal: 5,
									padding: 5,
									borderWidth: 2,
									borderRadius: 25,
									justifyContent: "center",
									// alignItems: "center",
									borderColor: Colors.primary,
									backgroundColor: Colors.primary,
								}}
							>
								<View
									style={{
										flex: 1,
										alignItems: "center",
									}}
								>
									<Text style={{ fontSize: 23, color: "white" }}>
										{item.name}
									</Text>
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
									<Text style={{ color: Colors.secondary }}>MP:{item.mp}</Text>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

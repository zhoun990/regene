import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Image,
	ScrollView,
	Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18n-js";
import * as Linking from "expo-linking";
import * as Analytics from "expo-firebase-analytics";
import { ListItem, Avatar } from "react-native-elements";
import { Button, Forque } from "../../../../custom/CustomComponents";
import { Colors } from "../../../../utils/colors";
import { TouchableWithoutFeedback } from "react-native";
import { functions } from "../../../../api/Firebase/firebase";

export const StageSelectScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	const animation = React.useMemo(() => new Animated.Value(0), []);
	const animationHeader = React.useMemo(() => new Animated.Value(0), []);
	useEffect(() => {
		Analytics.setCurrentScreen("xx_home_screen");
	}, []);
	useEffect(() => {
		Animated.timing(animation, {
			toValue: 1,
			duration: 100,
			useNativeDriver: true,
		}).start(({ finished }) => {});
		Animated.timing(animationHeader, {
			toValue: 1,
			duration: 100,
			useNativeDriver: true,
		}).start(({ finished }) => {});
	}, []);
	const unmountAnime = () => {
		return Animated.timing(animation, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		});
	};
	const list = [
		{
			name: "Level 1",
			stageName: "level1",
			en: 10,
			reward: true,
			gold: true,
		},
		{
			name: "Level 2",
			stageName: "level2",
			en: 20,
		},
		{
			name: "Level 3",
			stageName: "level3",
			en: 10,
		},
		{
			name: "Level 4",
			stageName: "level4",
			en: 10,
		},
		{
			name: "Level 5",
			stageName: "level5",
			en: 0,
		},
	];

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Animated.View
				style={{
					height: 70,
					flexDirection: "row",
					backgroundColor: "#1e1821",
					margin: 5,
					borderRadius: 5,
					borderWidth: 1,
					borderColor: Colors.blue1,
					opacity: animationHeader,
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#333841",
						marginVertical: 10,
						marginHorizontal: 5,
						borderRadius: 5,
						paddingHorizontal: 10,
					}}
				>
					<Button
						style={{ width: 100 }}
						title="Back"
						onPress={() => {
							unmountAnime().start(({ finished }) => {
								navigation.navigate("Home");
								Animated.timing(animation, {
									toValue: 1,
									duration: 0,
									useNativeDriver: true,
								}).start(({ finished }) => {});
							});
							Animated.timing(animationHeader, {
								toValue: 0,
								duration: 200,
								useNativeDriver: true,
							}).start(({ finished }) => {});
						}}
					/>
					{/* </View> */}
					<View
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Forque>{"Stage select"}</Forque>
					</View>
				</View>
			</Animated.View>
			<Animated.ScrollView style={{ flex: 1, opacity: animation }}>
				{list.map((item, i) => (
					<View key={i} style={{}}>
						<Button
							title={item.name}
							subTitle={`Energy : ${item.en}`}
							onPress={() => {
								unmountAnime().start(({ finished }) => {
									navigation.navigate("StageConfirm", {
										item: item,
									});
									Animated.timing(animation, {
										toValue: 1,
										duration: 0,
										useNativeDriver: true,
									}).start(({ finished }) => {});
								});
							}}
							color="yellow"
							style={{ margin: 10, marginBottom: 0 }}
						/>
					</View>
				))}
			</Animated.ScrollView>
		</SafeAreaView>
	);
};

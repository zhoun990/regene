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
import { actions } from "../../../../stores/datas";
const enHandler = functions.httpsCallable("enHandler");

export const StageConfirmScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	const params = route.params;
	const item = params.item;
	const animation = React.useMemo(() => new Animated.Value(0), []);

	useEffect(() => {
		Animated.timing(animation, {
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
	const onPress = async () => {
		if (state.en > item.en) {
			dispatch(
				actions.loading({
					loading: true,
					relocate: {
						screen: "GameScreens",
						params: {
							screen: "Main",
							params: { name: item.stageName },
						},
					},
				})
			);
			await enHandler({ type: "stage", stageName: item.stageName }).then(
				({ data }) => {
					console.log(
						"🚀 ~ file: StageConfirmScreen.js ~ line 32 ~ onPress ~ bool",
						data
					);
					if (!data) {
						Alert.alert("Error");
						dispatch(actions.loading(false));
					}
				}
			);
		} else {
			Alert.alert("Not Enough Energy");
		}
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					height: 70,
					flexDirection: "row",
					backgroundColor: "#1e1821",
					margin: 5,
					borderRadius: 5,
					borderWidth: 1,
					borderColor: Colors.blue1,
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
								navigation.navigate("StageSelect");
								Animated.timing(animation, {
									toValue: 1,
									duration: 0,
									useNativeDriver: true,
								}).start(({ finished }) => {});
							});
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
						<Forque>{item.stageName}</Forque>
					</View>
				</View>
			</View>

			<Animated.View style={{ flex: 1, opacity: animation }}>
				<View
					style={{
						flex: 1,
						borderWidth: 0,
						// justifyContent: "center",
						// alignItems: "center",
					}}
				>
					<View
						style={{
							flex: 1,
							borderWidth: 0,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Forque style={{ fontSize: 30 }}>{item.stageName}</Forque>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							// justifyContent: "center",
							// alignItems: "center",
						}}
					>
						<View
							style={{
								flex: 1,
								borderWidth: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Forque style={{ fontSize: 25 }}>Use Energy {item.en}</Forque>
						</View>
						<View
							style={{
								flex: 1,
								borderWidth: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Forque style={{ fontSize: 25 }}>
								Reward : {String(item.reward)}
							</Forque>
							<Forque style={{ fontSize: 25 }}>
								Earn gold : {String(item.gold)}
							</Forque>
						</View>
					</View>
				</View>
				<View style={{ flex: 1, borderWidth: 0 }}></View>
				<View
					style={{
						height: 100,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Button style={{ width: 100 }} title="Start" onPress={onPress} />
				</View>
			</Animated.View>
		</SafeAreaView>
	);
};

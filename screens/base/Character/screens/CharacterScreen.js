import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Image,
	TouchableWithoutFeedback,
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
import { characterPicker } from "../../../../src/characterPicker";

export const CharacterScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	const [team, setTeam] = useState([]);

	useEffect(() => {
		const array = [];
		for (let c of state.team) {
			array.push(Object.assign(state.card[c]));
		}
		setTeam(array);
	}, []);
	const onPress = (screen) => {
		navigation.navigate(screen);
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, justifyContent: "center" }}>
				<View style={{ alignItems: "center" }}>
					<Forque style={{ fontSize: 30 }}>Team Organization</Forque>
				</View>
				<TouchableWithoutFeedback onPress={() => onPress("Team")}>
					<View
						style={{
							// flex: 1,
							height: "32%",
							// width: "50%",
							flexDirection: "row",
							backgroundColor: "#1e1821",
							margin: 5,
							// marginHorizontal: 40,
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
								marginVertical: 5,
								marginHorizontal: 7,
								borderRadius: 5,
								paddingHorizontal: 10,
							}}
						>
							<View
								style={{
									flex: 1,
									marginVertical: 5,

									// alignItems: "center",
									justifyContent: "space-around",
									flexDirection: "row",
								}}
							>
								{team.map((item, i) => (
									<Image
										key={i}
										style={[
											{
												// flex: 1,
												width: undefined,
												height: "100%",
												aspectRatio: 1,
												marginRight: 4,
											},
											i == 0 && {
												borderWidth: 1.5,
												borderColor: Colors.red2,
											},
										]}
										source={characterPicker[item.n[0]][item.n[1]].icon}
									/>
								))}

								{team.length < 3 && (
									<View
										style={{
											width: undefined,
											height: "100%",
											aspectRatio: 1,
											marginRight: 4,
											borderWidth: 1.5,
											borderColor: Colors.secondary,
										}}
									/>
								)}
								{team.length < 4 && (
									<View
										style={{
											width: undefined,
											height: "100%",
											aspectRatio: 1,
											marginRight: 4,
											borderWidth: 1.5,
											borderColor: Colors.secondary,
										}}
									/>
								)}
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
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

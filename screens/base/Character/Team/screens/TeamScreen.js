import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Image,
	FlatList,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18n-js";
import * as Linking from "expo-linking";
import * as Analytics from "expo-firebase-analytics";
import { Forque, Button, Text } from "../../../../../custom/CustomComponents";
import { actions } from "../../../../../stores/datas";
import { Colors } from "../../../../../utils/colors";
import { db } from "../../../../../api/Firebase/firebase";
import { characterPicker } from "../../../../../src/characterPicker";
import Icon from "react-native-vector-icons/Ionicons";

export const TeamScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	const { width, height, scale } = Dimensions.get("window");
	const iconWidth = (width - 10) / 5 - 10;
	const [cardData, setCardData] = useState(null);
	const [cardArray, setCardArray] = useState([]);
	const [team, setTeam] = useState([]);
	const [selecting, setSelecting] = useState(0);
	const [showDetail, setShowDetail] = useState(true);
	useEffect(() => {
		team.length > 0 && dispatch(actions.setTeam(team));
	}, [team]);
	useEffect(() => {
		const array = [];
		const array2 = [];
		for (let card in state.card) {
			array.push(state.card[card]);
		}
		for (let c of state.team) {
			array2.push(Object.assign(state.card[c]));
		}

		setTeam(array2);
		setCardArray(array);
		setCardData(array[0]);
		// Analytics.setCurrentScreen("xx_home_screen");
	}, []);

	if (!cardData) {
		return null;
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					height: 70,
					flexDirection: "row",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						backgroundColor: "#1e1821",
						margin: 5,
						marginBottom: 0,
						borderRadius: 5,
						borderWidth: 1,
						borderColor: Colors.blue1,
					}}
				>
					<View
						style={{
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
								navigation.navigate("Character");
							}}
						/>
						{/* </View> */}
						<View
							style={{
								flex: 1,
								// alignItems: "center",
								// justifyContent: "center",
								flexDirection: "row",
							}}
						></View>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						backgroundColor: "#1e1821",
						margin: 5,
						marginBottom: 0,
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
							marginHorizontal: 5,
							borderRadius: 5,
							paddingHorizontal: 10,
						}}
					>
						<View
							style={{
								flex: 1,
								// alignItems: "center",
								justifyContent: "center",
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
							{team.length < 1 && (
								<View
									style={{
										width: undefined,
										height: "100%",
										aspectRatio: 1,
										marginRight: 4,
										borderWidth: 1.5,
										borderColor: Colors.red2,
									}}
								/>
							)}
							{team.length < 2 && (
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
							{/* {team[1] && (
								<Image
									style={[
										{
											// flex: 1,
											width: undefined,
											height: "100%",
											aspectRatio: 1,
											// margin: 4,
										},
										// index == selecting && {
										// 	borderWidth: 2,
										// 	borderColor: Colors.yellow1,
										// },
									]}
									source={characterPicker[team[1].n[0]][team[1].n[1]].icon}
								/>
							)}
							{team[2] && (
								<Image
									style={[
										{
											// flex: 1,
											width: undefined,
											height: "100%",
											aspectRatio: 1,
											// margin: 4,
										},
										// index == selecting && {
										// 	borderWidth: 2,
										// 	borderColor: Colors.yellow1,
										// },
									]}
									source={characterPicker[team[2].n[0]][team[2].n[1]].icon}
								/>
							)} */}
						</View>
					</View>
				</View>
			</View>
			{showDetail && (
				<View
					style={{
						// flex: 1,

						backgroundColor: Colors.gray1,
						margin: 10,
						marginBottom: 0,
						marginTop: 5,
						borderRadius: 10,
						flexDirection: "row",
						borderWidth: 1,
						borderColor: Colors.blue1,
					}}
				>
					<View style={{}}>
						<View
							style={[
								{
									// flex: 1,
									justifyContent: "center",
									alignItems: "center",
									// margin: 10,
									borderRadius: 15,
									margin: 4,
									borderWidth: 5,
								},
								characterPicker[cardData.n[0]][cardData.n[1]].rarity == 0 && {
									borderColor: "white",
								},
								characterPicker[cardData.n[0]][cardData.n[1]].rarity == 1 && {
									borderColor: Colors.gold1,
								},
								characterPicker[cardData.n[0]][cardData.n[1]].rarity == 2 && {
									borderColor: Colors.purple1,
								},
							]}
						>
							<Image
								style={{
									width: width / 2 - 20,
									height: undefined,
									aspectRatio: 0.75,
									// borderWidth: 3,
									// padding: 3,
									borderRadius: 10,
								}}
								// source={require(`../../../../../assets/characters/${cardData.card}.png`)}
								source={characterPicker[cardData.n[0]][cardData.n[1]].card}
							/>
						</View>

						<View
							style={{
								height: 30,
								marginBottom: 10,
								justifyContent: "center",
							}}
						>
							<View
								style={{
									height: 30,
									width: width / 2,
									position: "absolute",
									alignItems: "center",
									// backgroundColor: "#60cdff",
									borderRightWidth: 20,
									// borderBottomWidth: 30,
									borderTopWidth: 30,
									// borderLeftWidth: 20,
									borderRightColor: "white",
									borderLeftColor: "transparent",
									borderTopColor: "#60cdff",
									borderBottomColor: "transparent",
									borderRightColor: "transparent",
								}}
							></View>

							<View
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Forque style={{ fontSize: 25 }}>
									{characterPicker[cardData.n[0]][cardData.n[1]].name}
								</Forque>
							</View>
						</View>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ alignItems: "flex-end" }}>
							<TouchableOpacity
								style={{
									width: 20,
									height: 22,
									backgroundColor: Colors.red2,
									borderRadius: 5,
								}}
								activeOpacity={0.7}
								onPress={() => {
									setShowDetail(false);
								}}
							>
								<View
									style={{
										flex: 1,
										marginBottom: 2,
										backgroundColor: Colors.red3,
										borderRadius: 5,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Icon name="close" size={20} color={"black"} />
								</View>
							</TouchableOpacity>
						</View>
						<View
							style={{
								flex: 1,
								paddingHorizontal: 10,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<View
								style={{
									flex: 1,
									height: 20,
									backgroundColor: "#1a264d",
									flexDirection: "row",
									borderRadius: 5,
									padding: 2,
								}}
							>
								<View
									style={{
										backgroundColor: "#60cdff",
										width: `${
											(cardData.fragment / (cardData.lv * cardData.lv * 100)) *
											100
										}%`,
										// margin: 2,
										borderRadius: 5,
									}}
								></View>
								<View
									style={{
										position: "absolute",
										height: "100%",
										width: "100%",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text style={{ fontWeight: "700", color: "white" }}>
										{cardData.fragment}/ {cardData.lv * cardData.lv * 100}
									</Text>
								</View>
							</View>
							<View style={{ marginLeft: 5 }}>
								<Forque>Lv.{cardData.lv}</Forque>
							</View>
						</View>
						<View
							style={{
								padding: 10,
							}}
						>
							<View
								style={{
									borderWidth: 1,
									borderRadius: 5,
									backgroundColor: Colors.blue2,
									borderColor: Colors.blue1,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										borderRadius: 5,
										backgroundColor: Colors.blue1,
										margin: 3,
									}}
								>
									<View
										style={{
											flex: 1,
											height: undefined,
											aspectRatio: 1,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Forque style={{ fontSize: 22 }}>SPD</Forque>
										<Forque style={{ fontSize: 22 }}>
											{cardData.params[0]}
										</Forque>
									</View>
									<View
										style={{
											flex: 1,
											height: undefined,
											aspectRatio: 1,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Forque style={{ fontSize: 22 }}>PWR</Forque>
										<Forque style={{ fontSize: 22 }}>
											{cardData.params[1]}
										</Forque>
									</View>
									<View
										style={{
											flex: 1,
											height: undefined,
											aspectRatio: 1,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Forque style={{ fontSize: 22 }}>STM</Forque>
										<Forque style={{ fontSize: 22 }}>
											{cardData.params[2]}
										</Forque>
									</View>
									<View
										style={{
											flex: 1,
											height: undefined,
											aspectRatio: 1,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Forque style={{ fontSize: 22 }}>INT</Forque>
										<Forque style={{ fontSize: 22 }}>
											{cardData.params[3]}
										</Forque>
									</View>
								</View>
							</View>
						</View>
						<View
							style={{
								padding: 10,
							}}
						>
							<View
								style={{
									borderWidth: 1,
									borderRadius: 5,
									backgroundColor: Colors.yellow2,
									borderColor: Colors.yellow1,
									marginVertical: 5,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										borderRadius: 5,
										backgroundColor: Colors.yellow1,
										margin: 3,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Forque>{cardData.skill}</Forque>
								</View>
							</View>
							<View
								style={{
									borderWidth: 1,
									borderRadius: 5,
									backgroundColor: Colors.blue2,
									borderColor: Colors.blue1,
									marginTop: 5,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										borderRadius: 5,
										backgroundColor: Colors.blue1,
										margin: 3,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Forque>{cardData.passive_1}</Forque>
								</View>
							</View>
							<View
								style={{
									borderWidth: 1,
									borderRadius: 5,
									backgroundColor: Colors.blue2,
									borderColor: Colors.blue1,
									marginTop: 5,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										borderRadius: 5,
										backgroundColor: Colors.blue1,
										margin: 3,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Forque>{cardData.passive_2}</Forque>
								</View>
							</View>
							<View
								style={{
									borderWidth: 1,
									borderRadius: 5,
									backgroundColor: Colors.blue2,
									borderColor: Colors.blue1,
									marginTop: 5,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										borderRadius: 5,
										backgroundColor: Colors.blue1,
										margin: 3,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Forque>{cardData.inheritedPassive_1}</Forque>
								</View>
							</View>
							<View
								style={{
									borderWidth: 1,
									borderRadius: 5,
									backgroundColor: Colors.blue2,
									borderColor: Colors.blue1,
									marginTop: 5,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										borderRadius: 5,
										backgroundColor: Colors.blue1,
										margin: 3,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Forque>{cardData.inheritedPassive_2}</Forque>
								</View>
							</View>
						</View>
					</View>
				</View>
			)}
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					// backgroundColor: "white",
					marginHorizontal: 10,
					borderRadius: 10,
				}}
			>
				<FlatList
					style={{ paddingTop: 10 }}
					numColumns={5}
					data={cardArray}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => {
						return (
							<TouchableWithoutFeedback
								onPress={() => {
									setCardData(item);
									setSelecting(index);
									if (selecting == index) {
										if (team.length == 4) {
										} else if (
											team.filter((n) => n.id == item.id).length == 0
										) {
											setTeam(team.concat(item));
										} else {
											setTeam(team.filter((n) => n.id !== item.id));
										}
									}
								}}
								onLongPress={() => {
									setShowDetail(!showDetail);
									setCardData(item), setSelecting(index);
								}}
							>
								<View
									style={[
										{
											padding: 4,
										},
										index == selecting && {
											borderWidth: 2,
											borderColor: Colors.yellow1,
											padding: 2,
											borderRadius: 3,
										},
									]}
								>
									<Image
										style={[
											{
												width: iconWidth,
												height: undefined,
												aspectRatio: 1,
												// margin: 4,
											},
											// index == selecting && {
											// 	borderWidth: 2,
											// 	borderColor: Colors.yellow1,
											// },
										]}
										source={characterPicker[item.n[0]][item.n[1]].icon}
									/>
								</View>
							</TouchableWithoutFeedback>
						);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

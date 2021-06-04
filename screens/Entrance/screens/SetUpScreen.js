import React, { useEffect, useState, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Image,
	TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18n-js";
import * as Linking from "expo-linking";
import * as Analytics from "expo-firebase-analytics";
import { Text, Button, Forque } from "../../../custom/CustomComponents";
import { Colors } from "../../../utils/colors";
import firebase, { auth, db, functions } from "../../../api/Firebase/firebase";
import { actions } from "../../../stores/datas";
const userSetUp = functions.httpsCallable("userSetUp");

export const SetUpScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	const [username, setUsername] = useState("");
	const [alert, setAlert] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [loading, setloading] = useState(false);

	useEffect(() => {
		username.length > 0
			? (setAlert(false), setDisabled(false))
			: setDisabled(true);
		console.log(
			"🚀 ~ file: SetUpScreen.js ~ line 24 ~ SetUpScreen ~ disabled",
			disabled
		);
	}, [username]);
	const onPress = async () => {
		if (username.length > 0) {
			console.log(
				"🚀 ~ file: SetUpScreen.js ~ line 39 ~ onPress ~ username",
				username
			);
			setloading(true);
			await userSetUp({ username: username })
				.then(({ data }) => {
					if (data == "succes") {
						auth.currentUser
							.updateProfile({
								displayName: username,
							})
							.then(async () => {})
							.catch(function (error) {
								console.log(
									"🚀 ~ file: SetUpScreen.js ~ line 69 ~ onPress ~ error",
									error
								);
								Alert.alert("An errer happened");
							});
						navigation.navigate("BaseTabs");
					} else {
						setloading(false);
						console.log(
							"🚀 ~ file: SetUpScreen.js ~ line 49 ~ .then ~ data",
							data
						);
						Alert.alert("An errer happened");
					}
				})
				.catch((err) => {
					setloading(false);
					Alert.alert("An errer happened");
					console.log(
						"🚀 ~ file: SetUpScreen.js ~ line 52 ~ db.collection ~ err",
						err
					);
				});
		} else {
			setAlert(true);
		}
	};
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.gray1 }}>
			{!loading && (
				<View style={{ flex: 1, marginTop: 200 }}>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							marginBottom: 10,
						}}
					>
						<Forque style={{ fontSize: 30 }}>What is your player name ?</Forque>
						<Forque>Do not enter personal information</Forque>
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							marginBottom: 30,
						}}
					>
						<TextInput
							style={{
								borderWidth: 2,
								borderRadius: 10,
								borderColor: "white",
								width: "60%",
								padding: 4,
								color: "white",
								fontSize: 20,
							}}
							onChangeText={(value) => {
								setUsername(value);
							}}
							autoFocus={true}
							maxLength={20}
							textAlign="center"
						/>
					</View>
					<View style={{ alignItems: "center" }}>
						<Button
							title="Start Game"
							onPress={onPress}
							style={{ width: 200, height: 50 }}
						/>
					</View>
					<View style={{ flex: 1, alignItems: "center" }}>
						{alert && (
							<View
								style={{
									borderBottomWidth: 2,
									borderColor: "red",
								}}
							>
								<Forque style={{ fontSize: 25 }}>
									player name is too short
								</Forque>
							</View>
						)}
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

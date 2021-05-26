import React, { useEffect, usepanel, createRef, useRef } from "react";
import { SafeAreaView, TouchableOpacity, View, Alert } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../custom/CustomComponents";
import { actions } from "../../stores/datas";
import Main from "../mainScreen/index";
export const Entrance = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Welcom</Text>
			</View>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Button
					title="Start Game"
					onPress={() => {
						dispatch(actions.navigate("B"));
					}}
					buttonStyle={{ width: 200, height: 50 }}
				/>
			</View>
		</SafeAreaView>
	);
};

import React, { useEffect, usepanel, createRef, useRef } from "react";
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
import { ListItem, Avatar } from "react-native-elements";
import { Button, Text } from "../../../../custom/CustomComponents";

export const StageSelectScreen = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.datas);
	useEffect(() => {
		Analytics.setCurrentScreen("xx_home_screen");
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>{"name"}</ListItem.Title>
					<ListItem.Subtitle>{"subtitle"}</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		</SafeAreaView>
	);
};

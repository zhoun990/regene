import React, { useEffect, usepanel, createRef, useRef } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Alert,
	Platform,
} from "react-native";
// import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Text, Button } from "../../custom/CustomComponents";
import { actions } from "../../stores/datas";
import {
	AdMobBanner,
	AdMobInterstitial,
	PublisherBanner,
	AdMobRewarded,
	setTestDeviceIDAsync,
} from "expo-ads-admob";
import { resetPanelAds } from "../../components/resetPanelAds";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { translations } from "../../utils/tranclations";
import { Colors } from "../../utils/colors";
import Constants from "expo-constants";

export const Main = () => {
	const dispatch = useDispatch();
	const state = useSelector((panel) => panel.datas);
	const panel = useSelector((panel) => panel.datas.panel);
	const mapItem = [0, 1, 2, 3];
	const remaining = Colors.count + 4 * state.level;
	const adTurn =
		remaining * (Math.floor(state.count / remaining) + 1) - 1 - state.count;
	if (!panel) {
		return null;
	}
	useEffect(() => {
		if (!state.isInited) {
			Alert.alert(i18n.t("hint"), i18n.t("hintText"));
			dispatch(actions.initPanels());
		}
		(async () => {
			if (Platform.OS !== "web") {
				// await setTestDeviceIDAsync("EMULATOR");
				await AdMobRewarded.setAdUnitID(
					__DEV__ || !Constants.isDevice
						? "ca-app-pub-3940256099942544/5224354917"
						: "ca-app-pub-4125138884903603/4614205616"
				);
				adRequest();
			}
		})();
	}, []);
	useEffect(() => {
		const deadPanelCount = panel.filter((item) => item.isDead == true).length;
		if (deadPanelCount == 16) {
			// dispatch(actions.initPanels());
			if (state.level !== 5) {
				Alert.alert(
					i18n.t("congratulations"),
					`Level${state.level}${i18n.t("clearText")}`
				);
			} else {
				Alert.alert(i18n.t("congratulations"), i18n.t("allStageClearText"));
			}
		}
	}, [panel]);
	const adRequest = async () => {
		await AdMobRewarded.requestAdAsync();
	};
	const colorMaker = (n) => {
		if (!panel[n].isDead) {
			return "black";
		} else {
			return "white";
		}
	};
	const onPress = (n) => {
		if (adTurn !== 0) {
			dispatch(actions.updateSinglePanel(n));
		} else {
			resetPanelAds(i18n.t("timeup")).then((bool) => {
				if (bool) {
					dispatch(actions.updateSinglePanel(n));
					adRequest();
				}
			});
		}
	};
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
			<View style={{ flex: 1, marginBottom: 20 }}>
				<View
					style={{
						height: 80,
						flexDirection: "row",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					<Button
						type="outline"
						title={i18n.t("back")}
						onPress={async () => {
							dispatch(actions.navigate("A"));
						}}
					/>
					<Button
						title={i18n.t("reset")}
						onPress={async () => {
							resetPanelAds(i18n.t("watchAdsText")).then((bool) => {
								if (bool) {
									dispatch(actions.initPanels());
									adRequest();
								}
							});
						}}
					/>
					<View
						style={{
							height: 100,
							flexDirection: "row",
							// justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Button
							title="Lv. down"
							type="outline"
							style={{
								width: 100,
							}}
							onPress={() => {
								Alert.alert(
									i18n.t("levelDownAlert"),
									``,
									[
										{
											text: i18n.t("levelDown"),
											onPress: () => {
												dispatch(actions.levelHandler(false));
											},
										},
										{
											text: i18n.t("cancel"),
										},
									],
									{ cancelable: true }
								);
							}}
							disabled={state.level == 1}
						/>

						<View
							style={{
								width: 40,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Lv.{state.level}</Text>
						</View>
						<Button
							title="Lv. up"
							type="outline"
							style={{
								width: 100,
							}}
							onPress={async () => {
								resetPanelAds(i18n.t("nextAds")).then((bool) => {
									if (bool) {
										dispatch(actions.levelHandler(true));
										adRequest();
									}
								});
							}}
							disabled={state.level == 5}
						/>
					</View>
				</View>
				<View
					style={{
						height: 40,
						marginBottom: 20,
					}}
				>
					<View
						style={{
							flex: 1,
							// height: 20,
							flexDirection: "row",
							justifyContent: "space-evenly",
							alignItems: "center",
							// borderWidth: 1,
						}}
					>
						<View
							style={{
								alignItems: "center",
							}}
						>
							<Text style={{ color: Colors.secondary }}>{i18n.t("count")}</Text>
							<Text>
								{state.count} {i18n.t("turn")}
							</Text>
						</View>
						<View
							style={{
								alignItems: "center",
							}}
						>
							<Text style={{ color: Colors.secondary }}>
								{i18n.t("adCount")}
							</Text>
							<Text>
								{adTurn}
								{i18n.t("turn")}
							</Text>
						</View>
					</View>
				</View>
				{mapItem.map((column, i) => (
					<View key={i} style={{ flex: 1, flexDirection: "row" }}>
						{mapItem.map((row, i) => {
							const n = row + (column * 3 + column);
							return (
								<TouchableOpacity
									key={i}
									style={{
										flex: 1,
										borderWidth: 1,
										backgroundColor: colorMaker(n),
										borderColor: "white",
										alignItems: "center",
										justifyContent: "center",
									}}
									onPress={() => {
										onPress(n);
									}}
								>
									<Text style={{ color: "white" }}>{panel[n].restTurn}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				))}
			</View>
			<AdMobBanner
				// bannerSize="fullBanner"
				adUnitID={
					__DEV__ || !Constants.isDevice
						? "ca-app-pub-3940256099942544/6300978111"
						: "ca-app-pub-4125138884903603/8811297461"
				} // Test ID, Replace with your-admob-unit-id
				servePersonalizedAds // true or false
				// onDidFailToReceiveAdWithError={this.bannerError}
			/>
		</SafeAreaView>
	);
};

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
import * as Analytics from "expo-firebase-analytics";
import * as StoreReview from "expo-store-review";
import * as Haptics from "expo-haptics";

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
		// dispatch(actions.initPanels());
		if (!state.isInited) {
			Alert.alert(i18n.t("hint"), i18n.t("hintText"));
			dispatch(actions.initPanels());
		}

		(async () => {
			if (Platform.OS !== "web") {
				// await setTestDeviceIDAsync("EMULATOR");
				await AdMobRewarded.setAdUnitID(
					"ca-app-pub-4125138884903603/4614205616"
					//   __DEV__ || !Constants.isDevice
					//     ? "ca-app-pub-3940256099942544/5224354917"
					//     : "ca-app-pub-4125138884903603/4614205616"
				);
				adRequest();
				await AdMobRewarded.requestAdAsync();
			}
		})();
		Analytics.setCurrentScreen("xx_main_screen");
	}, []);
	//   useEffect(() => {
	//     const deadPanelCount = panel.filter((item) => item.isDead == true).length;
	//     if (deadPanelCount == 16) {
	//       // dispatch(actions.initPanels());
	//       if (state.level !== 5) {
	//         Alert.alert(
	//           i18n.t("congratulations"),
	//           `Level${state.level}${i18n.t("clearText")}`
	//         );
	//         Analytics.logEvent(`xx_quit_after_clear`);
	//       } else {
	//         Alert.alert(i18n.t("congratulations"), i18n.t("allStageClearText"));
	//         Analytics.logEvent(`xx_quit_after_clear`);
	//       }
	//     }
	//   }, []);
	const adRequest = async () => {
		// await AdMobRewarded.requestAdAsync();
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
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

			dispatch(actions.updateSinglePanel(n));
			const deadPanelCount = panel.filter((item) => item.isDead == true).length;
			if (deadPanelCount == 15) {
				dispatch(actions.initPanels());

				if (state.level !== 5) {
					if (state.level == 2 && !state.askedReview2) {
						StoreReview.requestReview();
						dispatch(actions.reviewHandler("2"));
					} else if (state.level == 4 && !state.askedReview4) {
						StoreReview.requestReview();
						dispatch(actions.reviewHandler("4"));
					}
					Alert.alert(
						i18n.t("congratulations"),
						`Level${state.level}${i18n.t("clearText")}`
					);
					Analytics.logEvent(`xx_level_${state.level}_cleared`);
				} else {
					Alert.alert(i18n.t("congratulations"), i18n.t("allStageClearText"));
					Analytics.logEvent(`xx_all_level_cleared`);
				}
			}
		} else if (Platform.OS == "web" && state.level == 1) {
			window.alert(
				"If you want to play all contents of Re:Generate, install the app from AppStore"
			);
		} else {
			resetPanelAds(i18n.t("timeup")).then((bool) => {
				if (bool) {
					dispatch(actions.updateSinglePanel(n));
					adRequest();
					Analytics.logEvent("xx_timeuped_and_watched_an_ad");
				} else {
					Analytics.logEvent("xx_timeuped_and_didnt_watched_an_ad");
				}
			});
		}
	};
	const reset = () => {
		if (Platform.OS == "web" && state.level == 1) {
			dispatch(actions.initPanels());
		} else {
			resetPanelAds(i18n.t("watchAdsText")).then((bool) => {
				if (bool) {
					dispatch(actions.initPanels());
					adRequest();
					Analytics.logEvent("xx_reset_add_reworded");
				} else {
					Analytics.logEvent("xx_reset_ad_canceled");
				}
			});
		}
	};
	const levelUp = () => {
		if (Platform.OS == "web" && state.level == 1) {
			window.alert(
				"If you want to play all contents of Re:Generate, install the app from AppStore"
			);
		} else {
			resetPanelAds(i18n.t("nextAds")).then((bool) => {
				if (bool) {
					Analytics.logEvent("xx_level_uped");

					dispatch(actions.levelHandler(true));
					adRequest();
				} else {
					Analytics.logEvent("xx_level_up_canceled");
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
					<Button title={i18n.t("reset")} onPress={reset} />
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
												Analytics.logEvent("xx_level_downed");
											},
										},
										{
											text: i18n.t("cancel"),
											onPress: () => {
												Analytics.logEvent("xx_level_down_canceled");
											},
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
							onPress={levelUp}
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
			{Platform.OS !== "web" && (
				<AdMobBanner
					// style={{ width: 200 }}
					// bannerSize="fullBanner"
					adUnitID={
						"ca-app-pub-4125138884903603/8811297461"
						//   __DEV__ || !Constants.isDevice
						//     ? "ca-app-pub-3940256099942544/6300978111"
						//     : "ca-app-pub-4125138884903603/8811297461"
					} // Test ID, Replace with your-admob-unit-id
					// servePersonalizedAds // true or false
					// onDidFailToReceiveAdWithError={this.bannerError}
				/>
			)}
		</SafeAreaView>
	);
};

import {
	ScrollView,
	RefreshControl,
	SafeAreaView,
	View,
	FlatList,
	StyleSheet,
	StatusBar,
	Share,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	Image,
	Linking,
	Modal,
	TouchableHighlight,
} from "react-native";
import {
	AdMobBanner,
	AdMobInterstitial,
	PublisherBanner,
	AdMobRewarded,
	setTestDeviceIDAsync,
} from "expo-ads-admob";
import i18n from "i18n-js";
import * as Analytics from "expo-firebase-analytics";

export const resetPanelAds = (text) => {
	let promise = new Promise(async (resolve, reject) => {
		Alert.alert(
			text,
			``,
			[
				{
					text: i18n.t("wacthAds"),
					onPress: async () => {
						AdMobRewarded.addEventListener(
							"rewardedVideoUserDidEarnReward",
							() => {
								resolve(true);
								AdMobRewarded.removeAllListeners();
							}
						);
						AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
							resolve(false);
							AdMobRewarded.removeAllListeners();
						});
						await AdMobRewarded.showAdAsync().catch((err) => {
							Alert.alert(i18n.t("notReadyToAd"), i18n.t("notReadyToAdText"));
							// Alert.alert(i18n.t("errorHappend"), i18n.t("errorRetry"));
							resolve(true);

							console.log("err", err);
						});
						await AdMobRewarded.requestAdAsync();
					},
				},
				{
					text: i18n.t("cancel"),
					onPress: () => {
						resolve(false);
					},
				},
			],
			{ cancelable: true }
		);
	});
	return promise;
};

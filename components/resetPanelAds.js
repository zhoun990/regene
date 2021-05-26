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
export const resetPanelAds = (text) => {
	let promise = new Promise(async (resolve, reject) => {
		Alert.alert(
			text,
			``,
			[
				{
					text: `広告を視聴する`,
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
						await AdMobRewarded.showAdAsync().catch(() => {
							Alert.alert(
								"エラーが発生しました。",
								"通信環境を確認して再度お試しください。"
							);
						});
					},
				},
				{
					text: "キャンセル",
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

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
export const resetPanelAds = () => {
	let promise = new Promise(async (resolve, reject) => {
		Alert.alert(
			`広告を視聴してパネルをリセットしますか？`,
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
						await AdMobRewarded.requestAdAsync();
						await AdMobRewarded.showAdAsync();
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

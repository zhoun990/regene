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
              Alert.alert(i18n.t("errorHappend"), i18n.t("errorRetry"));
              console.log("err", err);
            });
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

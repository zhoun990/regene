import React, { useEffect, usepanel, createRef, useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, Button } from "../../custom/CustomComponents";
import { actions } from "../../stores/datas";
import Main from "../mainScreen/index";
import i18n from "i18n-js";
import * as Linking from "expo-linking";
import { Colors } from "../../utils/colors";
import * as Analytics from "expo-firebase-analytics";

export const Entrance = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.datas);
  useEffect(() => {
    Analytics.setCurrentScreen("xx_entrance_screen");
  }, []);
  const onPress = () => {
    if (state.isInited) {
      dispatch(actions.navigate("B"));
    } else {
      Alert.alert(
        i18n.t("doAgree"),
        "",
        [
          {
            text: i18n.t("agree"),
            onPress: () => {
              dispatch(actions.navigate("B"));
            },
          },
          {
            text: i18n.t("cancel"),
          },
        ],
        { cancelable: true }
      );
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{
            width: 300,
            height: 300,
          }}
          source={require("../../assets/icon_adaptive.png")}
        />
        <View>
          <Text style={{ fontSize: 33, color: "#7d0b98" }}>Re:Generate</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="Start Game"
          onPress={onPress}
          buttonStyle={{ width: 200, height: 50 }}
        />
      </View>
      <View
        style={{
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: Colors.link,
          }}
        >
          <Text
            onPress={() => {
              Linking.openURL(i18n.t("tosURL"));
            }}
            style={{ color: Colors.link }}
          >
            {i18n.t("tos")}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

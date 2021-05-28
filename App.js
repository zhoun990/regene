// import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, StatusBar, LogBox } from "react-native";
import { Main } from "./screens/mainScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./stores/configureStore";
import { Entrance } from "./screens/entranceScreen";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { translations } from "./utils/tranclations";
import { enableScreens } from "react-native-screens";
enableScreens();
LogBox.ignoreLogs([
  "Constants.installationId has been deprecated in favor of generating and storing your own ID. Implement it using expo-application's androidId on Android and a storage API such as expo-secure-store on iOS and localStorage on the web. This API will be removed in SDK 44.",
]);
i18n.translations = translations;
i18n.locale = Localization.locale;
i18n.fallbacks = true;
const { persistor, store } = configureStore();
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={"dark-content"} />
      <Router />
    </Provider>
  );
}
function Router() {
  const state = useSelector((state) => state.datas);
  if (state.screen == "A") {
    return <Entrance />;
  } else if (state.screen == "B") {
    return <Main />;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Not Found Page</Text>
      </SafeAreaView>
    );
  }
}

import React, { useEffect, usepanel, createRef, useRef } from "react";
import { SafeAreaView, TouchableOpacity, View, Alert } from "react-native";
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
export const Main = () => {
	const dispatch = useDispatch();
	const state = useSelector((panel) => panel.datas);
	const panel = useSelector((panel) => panel.datas.panel);
	const mapItem = [0, 1, 2, 3];
	if (!panel) {
		return null;
	}
	useEffect(() => {
		if (!state.isInited) {
			dispatch(actions.initPanels());
		}
		(async () => {
			await setTestDeviceIDAsync("EMULATOR");
			await AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917");
			adRequest();
		})();
	}, []);
	useEffect(() => {
		const deadPanelCount = panel.filter((item) => item.isDead == true).length;
		if (deadPanelCount == 16) {
			// dispatch(actions.initPanels());
			Alert.alert(
				"おめでとう！",
				`Level${state.level}をクリアしました。Reloadをタップしてもう一度プレイするか、Lv.ボタンをタップして次のレベルに進みましょう`
			);
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
		dispatch(actions.updateSinglePanel(n));
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, marginBottom: 20 }}>
				<View
					style={{
						height: 100,
						flexDirection: "row",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					<Button
						title="戻る"
						onPress={async () => {
							dispatch(actions.navigate("A"));
						}}
					/>
					<Button
						title="リセット"
						onPress={async () => {
							resetPanelAds("広告を視聴してパネルをリセットしますか？").then(
								(bool) => {
									if (bool) {
										dispatch(actions.initPanels());
										adRequest();
									}
								}
							);
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
									"レベルを下げてよろしいですか？",
									``,
									[
										{
											text: `レベルを下げる`,
											onPress: () => {
												dispatch(actions.levelHandler(false));
											},
										},
										{
											text: "キャンセル",
											onPress: () => {},
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
								resetPanelAds("広告を視聴して次のレベルに進みますか？").then(
									(bool) => {
										if (bool) {
											dispatch(actions.levelHandler(true));
											adRequest();
										}
									}
								);
							}}
							disabled={state.level == 5}
						/>
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
				bannerSize="fullBanner"
				adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
				servePersonalizedAds // true or false
				// onDidFailToReceiveAdWithError={this.bannerError}
			/>
		</SafeAreaView>
	);
};

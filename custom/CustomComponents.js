import React, { useEffect, useState, useCallback } from "react";
import {
	Text as NativeText,
	StyleSheet,
	View,
	Animated,
	Modal,
	TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../utils/colors";
import { Button as NativeButton } from "react-native-elements";
// import { designDefault } from "../utils/design";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ModalOneButtonWithCancel = (props) => {
	console.log(
		"🚀 ~ file: CustomComponents.js ~ line 16 ~ ModalOneButtonWithCancel ~ props",
		props
	);
	const animation = React.useMemo(() => new Animated.Value(0), []);
	return (
		<Modal
			animationType="none"
			transparent={true}
			visible={props.visible}
			onRequestClose={() => {
				Animated.timing(animation, {
					toValue: 0,
					duration: 100,
					useNativeDriver: true,
				}).start(({ finished }) => {});
			}}
			onShow={() => {
				Animated.timing(animation, {
					toValue: 0.5,
					duration: 200,
					useNativeDriver: true,
				}).start(({ finished }) => {});
			}}
		>
			<View style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={() => props.setModalVisible(false)}>
					<Animated.View
						style={{
							backgroundColor: "black",
							opacity: animation,
							height: "100%",
							width: "100%",
							position: "absolute",
							zIndex: -1,
						}}
					/>
				</TouchableWithoutFeedback>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
					}}
				>
					<View
						style={{
							opacity: 1,
							backgroundColor: Colors.blue2,
							marginHorizontal: "10%",
							borderRadius: 10,
							borderWidth: 2,
							borderColor: "white",
						}}
					>
						<View
							style={{
								backgroundColor: Colors.blue1,
								marginHorizontal: "10%",
								marginVertical: 10,
								borderRadius: 10,
								paddingVertical: 10,
								alignItems: "center",
							}}
						>
							<Forque style={{ fontSize: 30 }}>{props.text}</Forque>
						</View>
						<View
							style={{
								// flex: 1,
								marginHorizontal: "10%",
								paddingVertical: 10,
								alignItems: "center",
								flexDirection: "row",
								justifyContent: "center",
							}}
						>
							<Button
								title={props.title}
								color="yellow"
								style={{ marginHorizontal: 20 }}
								onPress={() => {
									props.onPress();
									props.setModalVisible(false);
								}}
							/>
							<Button
								title="Cancel"
								color="yellow"
								style={{
									marginHorizontal: 20,
								}}
								onPress={() => {
									props.setModalVisible(false);
								}}
							/>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};
export const Text = (props) => {
	{
		return (
			<NativeText
				{...props}
				style={[
					{
						fontSize: 17,
						fontWeight: "500",
						color: "#5f4040",
					},
					props.style,
				]}
			>
				{props.children}
			</NativeText>
		);
	}
};
export const Forque = (props) => {
	let [fontsLoaded] = useFonts({
		Forque: require("../assets/fonts/Forque-M3An.ttf"),
	});
	if (!fontsLoaded) {
		return null;
	}
	return (
		<NativeText
			{...props}
			style={[
				{
					fontSize: 17,
					// fontWeight: "800",
					fontFamily: "Forque",
					// color: "#5f4040",
					color: "white",
					textShadowColor: "rgba(0, 0, 0, 0.75)",
					textShadowOffset: { width: 1, height: 2 },
					textShadowRadius: 1,
				},
				props.style,
			]}
		>
			{props.children}
		</NativeText>
	);
};
export const Button = (props) => {
	let [fontsLoaded] = useFonts({
		Forque: require("../assets/fonts/Forque-M3An.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	if (props.type == "outline") {
		return (
			<NativeButton
				{...props}
				style={[
					{
						borderColor: Colors.primary,
						borderWidth: 2,
					},
					props.style,
				]}
				titleStyle={[
					{
						color: Colors.primary,
						fontFamily: "Forque",
						// lineHeight: 20,
						textShadowColor: "rgba(0, 0, 0, 0.75)",
						textShadowOffset: { width: 1, height: 2 },
						textShadowRadius: 1,
					},
					props.titleStyle,
				]}
			>
				{props.children}
			</NativeButton>
		);
	} else if (props.type == "clear") {
		return (
			<NativeButton
				{...props}
				style={[
					{
						// backgroundColor: Colors.primary,
					},
					// props.style,
					props.style,
				]}
				titleStyle={[
					{ color: Colors.primary, fontWeight: "500" },
					props.titleStyle,
				]}
			>
				{props.children}
			</NativeButton>
		);
	} else {
		return (
			<TouchableOpacity
				{...props}
				style={[
					{
						backgroundColor:
							props.color == "yellow" ? Colors.yellow4 : Colors.blue4,
						borderRadius: 5,
						borderWidth: 1,
						height: props.subTitle ? 80 : 40,
					},
					// !props.subTitle && { width: 70 },
					props.borderColor && { borderColor: Colors[props.borderColor] },
					props.style,
				]}
				onPress={props.onPress}
				activeOpacity={0.7}
			>
				<View
					style={{
						flex: 1,
						backgroundColor:
							props.color == "yellow" ? Colors.yellow2 : Colors.blue2,
						marginBottom: 3,
						borderRadius: 5,
					}}
				>
					<View
						style={{
							alignItems: "center",
							justifyContent: "center",
							flex: 1,
							backgroundColor:
								props.color == "yellow" ? Colors.yellow1 : Colors.blue1,
							margin: 4,
							borderRadius: 5,
							paddingHorizontal: 3,
						}}
					>
						{props.children ? (
							props.children
						) : (
							<Forque
								style={[
									{
										fontSize: props.subTitle ? 33 : 25,
										textShadowColor: "rgba(0, 0, 0, 0.75)",
										textShadowOffset: { width: 1, height: 2 },
										textShadowRadius: 1,
									},
									props.titleStyle,
								]}
							>
								{props.title}
							</Forque>
						)}
					</View>
					{props.subTitle && (
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								flex: 1,
							}}
						>
							<Forque
								style={[
									{
										fontSize: 25,
										textShadowColor: "rgba(0, 0, 0, 0.75)",
										textShadowOffset: { width: 1, height: 2 },
										textShadowRadius: 1,
									},
									props.subTitleStyle,
								]}
							>
								{props.subTitle}
							</Forque>
						</View>
					)}
				</View>
			</TouchableOpacity>
		);
	}
};

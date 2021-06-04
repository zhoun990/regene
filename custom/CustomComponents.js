import React, { useEffect, useState, useCallback } from "react";
import { Text as NativeText, StyleSheet, View } from "react-native";
import { Colors } from "../utils/colors";
import { Button as NativeButton } from "react-native-elements";
// import { designDefault } from "../utils/design";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";

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
					!props.subTitle && { width: 70 },
					props.borderColor && { borderColor: Colors[props.borderColor] },
					props.style,
				]}
				onPress={props.onPress}
			>
				{props.children ? (
					props.children
				) : (
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
							}}
						>
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
				)}
			</TouchableOpacity>
		);
	}
};
// export const StyledButton = (props) => {
// 	{
// 		return (
// 			<NativeButton
// 				{...props}
// 				type="outline"
// 				loadingProps={{ color: "#ccc" }}
// 				style={[
// 					{
// 						padding: 10,
// 						width: 150,
// 						borderWidth: 1,
// 						borderColor: "#ccc",
// 						borderRadius: 10,
// 					},
// 					props.style,
// 				]}
// 				titleStyle={[
// 					{ color: "#aaa", fontWeight: "800", fontSize: 16 },
// 					props.titleStyle,
// 				]}
// 			></NativeButton>
// 		);
// 	}
// };

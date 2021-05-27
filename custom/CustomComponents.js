import React, { useEffect, useState, useCallback } from "react";
import { Text as NativeText, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";
import { Button as NativeButton } from "react-native-elements";
// import { designDefault } from "../utils/design";

export const Text = (props) => {
	{
		return (
			<NativeText
				{...props}
				style={[
					{
						fontSize: 17,
						fontWeight: "500",
						// color: black,
					},
					props.style,
				]}
			>
				{props.children}
			</NativeText>
		);
	}
};
export const Button = (props) => {
	{
		if (props.type == "outline") {
			return (
				<NativeButton
					{...props}
					buttonStyle={[
						{
							borderColor: Colors.primary,
						},
						props.buttonStyle,
					]}
					titleStyle={[
						{ color: Colors.primary, fontWeight: "500" },
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
					buttonStyle={[
						{
							// backgroundColor: Colors.primary,
						},
						// props.style,
						props.buttonStyle,
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
				<NativeButton
					{...props}
					buttonStyle={[
						{
							backgroundColor: Colors.primary,
						},
						// props.style,
						props.buttonStyle,
					]}
					titleStyle={[{ fontWeight: "500" }, props.titleStyle]}
				>
					{props.children}
				</NativeButton>
			);
		}
	}
};
// export const StyledButton = (props) => {
// 	{
// 		return (
// 			<NativeButton
// 				{...props}
// 				type="outline"
// 				loadingProps={{ color: "#ccc" }}
// 				buttonStyle={[
// 					{
// 						padding: 10,
// 						width: 150,
// 						borderWidth: 1,
// 						borderColor: "#ccc",
// 						borderRadius: 10,
// 					},
// 					props.buttonStyle,
// 				]}
// 				titleStyle={[
// 					{ color: "#aaa", fontWeight: "800", fontSize: 16 },
// 					props.titleStyle,
// 				]}
// 			></NativeButton>
// 		);
// 	}
// };

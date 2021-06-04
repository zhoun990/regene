import { DefaultTheme, DarkTheme } from "@react-navigation/native";

import { Colors } from "./colors";

export const navigationTheme = {
	...DefaultTheme,
	// override colors
	colors: {
		...DefaultTheme.colors,
		// primary: Colors.primary,
		background: "transparent",
		// card: Colors.white,
		// text: Colors.primary,
		// border: Colors.border,
		// notification: darkColors.card,
	},
};
// export const darkNavigationTheme = {
// 	...DarkTheme,
// 	// override colors
// 	colors: {
// 		...DarkTheme.colors,
// 		primary: darkColors.primary,
// 		background: darkColors.background,
// 		card: darkColors.card,
// 		text: darkColors.text,
// 		border: darkColors.border,
// 		// notification: darkColors.card,
// 	},
// };
// export const ThemeColors = (scheme) => {
// 	// const scheme = "useColorScheme();";

// 	if (scheme !== "dark") {
// 		return {
// 			...DefaultTheme,
// 			// override colors
// 			colors: {
// 				...DefaultTheme.colors,
// 				primary: Colors.primary,
// 				background: Colors.background,
// 				card: Colors.white,
// 				text: Colors.primary,
// 				border: Colors.frame,
// 				// notification: darkColors.card,
// 			},
// 		};
// 	} else {
// 		return {
// 			...DarkTheme,
// 			// override colors
// 			colors: {
// 				...DarkTheme.colors,
// 				primary: darkColors.primary,
// 				background: darkColors.background,
// 				card: darkColors.card,
// 				text: darkColors.text,
// 				border: darkColors.border,
// 				// notification: darkColors.card,
// 			},
// 		};
// 	}
// };

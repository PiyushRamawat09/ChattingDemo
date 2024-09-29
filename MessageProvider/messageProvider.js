import { Alert, ToastAndroid, Platform } from "react-native";
import { config } from "../configProvider";
import Toast from 'react-native-simple-toast';
//--------------------------- Message Provider Start -----------------------
class messageFunctionsProviders {
	toast(message, position) {
		if (position == 'center') {
			Toast.showWithGravity(message, Toast.SHORT, Toast.CENTER);
		}
		else if (position == 'top') {
			Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
		}
		else if (position == 'bottom') {
			Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);

		}
		else if (position == 'long') {
			Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
		}

	}

	alert(title, message, callback) {
		if (callback === false) {
			Alert.alert(
				title,
				message,
				[
					{
						text: "OK",
					},
				],
				{ cancelable: false },
			);
		} else {
			Alert.alert(
				title,
				message,
				[
					{
						text: "OK",
						onPress: () => callback,
					},
				],
				{ cancelable: false },
			);
		}

	}

	// confirm(title, message, callbackOk, callbackCancel) {
	// 	if (callbackCancel === false) {
	// 		Alert.alert(
	// 			title,
	// 			message,
	// 			[
	// 				{
	// 					text: msgTitle.cancel[config.language],
	// 				},
	// 				{
	// 					text: msgTitle.ok[config.language],
	// 					onPress: () => this.btnPageLoginCall(),
	// 				},
	// 			],
	// 			{ cancelable: false },
	// 		);
	// 	} else {
	// 		Alert.alert(
	// 			title,
	// 			message,
	// 			[
	// 				{
	// 					text: msgTitle.cancel[config.language],
	// 					onPress: () => callbackCancel,
	// 				},
	// 				{
	// 					text: msgTitle.ok[config.language],
	// 					onPress: () => callbackOk,
	// 				},
	// 			],
	// 			{ cancelable: false },
	// 		);
	// 	}

	// }

	// later(title, message, callbackOk, callbackCancel, callbackLater) {
	// 	Alert.alert(
	// 		title,
	// 		message,
	// 		[
	// 			{
	// 				text: 'Ask me later',
	// 				onPress: () => msgTitle.later[config.language],
	// 			},
	// 			{
	// 				text: 'Cancel',
	// 				onPress: () => msgTitle.cancel[config.language],
	// 			},
	// 			{
	// 				text: 'OK',
	// 				onPress: () => msgTitle.ok[config.language],
	// 			},
	// 		],
	// 		{ cancelable: false },
	// 	);
	// }


}


export const msgProvider = new messageFunctionsProviders();
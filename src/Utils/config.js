import { Dimensions } from "react-native";

const mobileW = Math.round(Dimensions.get('window').width);
const mobileH = Math.round(Dimensions.get('window').height);

export {mobileH, mobileW};
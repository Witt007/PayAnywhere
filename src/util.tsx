import { ScaledSize, StyleSheet, Dimensions } from "react-native";
const winSize = Dimensions.get("screen");console.log(winSize);

export const getWidth = (designSize: number) => winSize.width * designSize / 1284;
export const getHeight = (designSize: number) => winSize.height * designSize / 2778;
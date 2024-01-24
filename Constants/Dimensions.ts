import { Dimensions } from "react-native";

export const HEIGHT:number = Dimensions.get("window").height;
export const WIDTH:number = Dimensions.get("window").width;
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * (WIDTH/HEIGHT);
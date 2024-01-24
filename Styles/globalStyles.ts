import { StyleSheet, useColorScheme } from "react-native";
import { black, white, yellow } from "../Constants/ColorScheme";

const globalStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: yellow,
        position:'relative'
    },
    screenSection:    {
        flex: 1,
        padding: 10,
        paddingTop: 60,
        paddingLeft: 30,
        flexDirection: 'column',
        alignContent: 'center',
        minHeight: '70%',
        marginTop: '30%',
        width: '100%',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        // elevation: 6,
      },
})
export default globalStyles;
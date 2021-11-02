import { colors } from "@utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 120,
    },
    logo: {
        height: 150,
        maxWidth: "60%",
        resizeMode: "contain",
    },

    btn: {
        marginTop: 80,
    },
    btns: {
        marginBottom: 22,
    },
    loggedIn: {
        color: colors.lightGreen,
        textAlign: "center",
        fontSize: 12
    },
});

export default styles;

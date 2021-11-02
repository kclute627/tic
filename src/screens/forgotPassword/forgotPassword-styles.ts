import { colors } from "@utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    otpInputBox: {
        color: "#fff",
        fontFamily: "DeliusUnicase_400Regular",
        fontSize: 20,
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor: colors.blue1,
        borderBottomWidth: 1,
        borderColor: colors.lightGreen,
    },
    otpActive: {
        borderWidth: 1,
        borderColor: colors.blue2,
    },
    otpText: {
        fontSize: 15,
        color: "#fff",
    },
    otpBtn: {
        color: colors.lightGreen,
        textAlign: "center",
        textDecorationLine: "underline",
    },
});

export default styles;

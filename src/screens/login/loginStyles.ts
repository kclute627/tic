import { colors } from "@utils";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 40,
    },

    regLink: {
        color: colors.darkPurple,
        marginTop: 30,

        textAlign: "center",
        textDecorationLine: "underline",
    },
    forgotLink: {
        color: colors.darkPurple,
        marginBottom: 17,

        textAlign: "right", 
        textDecorationLine: "underline",
       
    },
});

export default styles
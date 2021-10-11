import { StyleSheet } from "react-native";

import { colors } from "@utils";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    cell: {
        width: "33.33%",
        height: "33.33%",

        borderWidth: 2,
        borderColor: colors.lightGreen,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: colors.lightGreen,
    },
    cell0: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
    cell1: {
        borderTopWidth: 0,
    },
    cell2: {
        borderTopWidth: 0,
        borderRightWidth: 0,
    },
    cell3: {
        borderLeftWidth: 0,
    },

    cell5: {
        borderRightWidth: 0,
    },
    cell6: {
        borderBottomWidth: 0,
        borderLeftWidth: 0,
    },
    cell7: {
        borderBottomWidth: 0,
    },
    cell8: {
        borderBottomWidth: 0,
        borderRightWidth: 0,
    },
});

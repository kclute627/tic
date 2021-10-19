import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Home, SinglePlayer, Settings } from "@screens";
import { colors } from "@utils";

export type StackNavParams = {
    Home: undefined;
    SinglePlayer: undefined;
    Settings: undefined;
};
const navOptions: NativeStackNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.blue1,
    }, 
    headerShadowVisible: false,
    headerLargeTitleShadowVisible: false,

    headerTransparent: true,
    headerTintColor: colors.lightGreen,
 
    headerTitleStyle: { fontFamily: "DeliusUnicase_700Bold", fontSize: 20 },
    headerBackTitleStyle: { fontFamily: "DeliusUnicase_400Regular", fontSize: 14, },
};

const Stack = createNativeStackNavigator<StackNavParams>();
export default function Nav(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={navOptions}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SinglePlayer"
                    component={SinglePlayer}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

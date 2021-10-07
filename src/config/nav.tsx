import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, SinglePlayer } from "@screens";


export type StackNavParams = {
    Home: undefined;
    SinglePlayer: undefined;
};

const Stack = createNativeStackNavigator<StackNavParams>();
export default function Nav(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="SinglePlayer" component={SinglePlayer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

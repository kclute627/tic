import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Game } from "@screens";


export type StackNavParams = { 
    Home: undefined,
    Game: {
        gameId: string
    }
}

const Stack = createNativeStackNavigator<StackNavParams>();
export default function Nav(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Game" component={Game} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

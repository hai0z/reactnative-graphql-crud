import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import HomeScreen from "../screens/home";
import PassScreen from "../screens/pass";
import WelcomeScreen from "../screens/welcome";
import { AppContext } from "../context/AppProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
    const { navigation } = useContext(AppContext);
    console.log(navigation);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Pass">
                <Stack.Screen
                    name="Pass"
                    component={PassScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Home"
                    options={{
                        headerShown: false,
                    }}
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Welcome"
                    options={{
                        headerShown: false,
                    }}
                    component={WelcomeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

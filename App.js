import "react-native-gesture-handler";
import {
    MD3LightTheme as DefaultTheme,
    Provider as PaperProvider,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigation from "./Navigation/AppNavigation";
import CipherManager from "./Services/InternalServices/CipherManager";
import SecureStorage from "./Services/InternalServices/SecureStorage";
import { useEffect } from "react";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#41966d",
        secondary: "#51bc88",
    },
};

const Stack = createStackNavigator();

const generateAndStoreKeys = async () => {
    const publicKey = await SecureStorage.getValue("publicKey");
    const privateKey = await SecureStorage.getValue("privateKey");
    if (publicKey === null && privateKey === null) {
        const keys = await CipherManager.generateKeys();
        if (keys != undefined) {
            await SecureStorage.setValue("privateKey", keys.private);
            await SecureStorage.setValue("publicKey", keys.public);
            console.log("Keys generated successfully...");
        } else {
            console.log("Failed to generate keys...");
        }
    } else {
        console.log("Using old keys...");
    }
};

export default function App() {
    useEffect(() => {
        generateAndStoreKeys();
    }, []);
    return (
        <PaperProvider theme={theme}>
            <AppNavigation />
        </PaperProvider>
    );
}

import * as React from "react";
import { BottomNavigation } from "react-native-paper";

import HomeScreen from "../Screens/HomeScreen";
import EncryptScreen from "../Screens/EncryptScreen";
import DecryptScreen from "../Screens/DecryptScreen";
import InformationScreen from "../Screens/InformationScreen";

const AppNavigation = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: "keys",
            title: "Keys",
            focusedIcon: "key",
            unfocusedIcon: "key-outline",
        },
        {
            key: "encrypt",
            title: "Encrypt",
            focusedIcon: "lock",
            unfocusedIcon: "lock-outline",
        },
        {
            key: "decrypt",
            title: "Decrypt",
            focusedIcon: "lock-open-variant",
            unfocusedIcon: "lock-open-variant-outline",
        },
        {
            key: "info",
            title: "Info",
            focusedIcon: "information",
            unfocusedIcon: "information-outline",
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        keys: HomeScreen,
        encrypt: EncryptScreen,
        decrypt: DecryptScreen,
        info: InformationScreen,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default AppNavigation;

import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar, Button, IconButton, Text } from "react-native-paper";
import SecureStorage from "../Services/InternalServices/SecureStorage";
import CipherManager from "../Services/InternalServices/CipherManager";
import * as Clipboard from "expo-clipboard";

export default function HomeScreen() {
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");

    useEffect(() => {
        usetoredKeys();
    }, []);

    const usetoredKeys = async () => {
        const pubKey = await SecureStorage.getValue("publicKey");
        const priKey = await SecureStorage.getValue("privateKey");

        if (pubKey == null && priKey == null) {
            generateNewKeys();
        } else {
            setPublicKey(pubKey);
            setPrivateKey(priKey);
        }
    };

    const generateNewKeys = async () => {
        const keys = await CipherManager.generateKeys();
        if (keys != undefined) {
            await SecureStorage.setValue("privateKey", keys.private);
            await SecureStorage.setValue("publicKey", keys.public);
            setPrivateKey(keys.private);
            setPublicKey(keys.public);
            console.log("New Keys generated successfully...");
        } else {
            console.log("Failed to generate New keys...");
        }
    };

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Keys" />
            </Appbar.Header>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <ScrollView>
                    <View style={styles.buttonContainer}>
                        <Button
                            icon="autorenew"
                            mode="contained"
                            style={styles.button}
                            onPress={() => generateNewKeys()}
                        >
                            Regenerate Keys
                        </Button>
                    </View>
                    <View style={styles.keyContainer}>
                        <View style={styles.headerContainer}>
                            <Text variant="headlineMedium">Public Key</Text>
                            <IconButton
                                icon="clipboard-outline"
                                iconColor={"#41966d"}
                                size={30}
                                onPress={() => copyToClipboard(publicKey)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text variant="bodyMedium" style={styles.text}>
                                {publicKey}
                            </Text>
                        </View>
                        <View style={styles.headerContainer}>
                            <Text variant="headlineMedium">Private Key</Text>
                            <IconButton
                                icon="clipboard-outline"
                                iconColor={"#41966d"}
                                size={30}
                                onPress={() => copyToClipboard(privateKey)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text variant="bodyMedium" style={styles.text}>
                                {privateKey}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    keyContainer: {
        flex: 5,
        alignItems: "center",
        alignContent: "space-between",
    },
    inputContainer: {
        alignItems: "center",
        alignContent: "space-between",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        flex: 5,
        margin: 30,
    },
    text: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        margin: 10,
        borderColor: "#4a3b69",
    },
    button: { padding: 10, margin: 10 },
});

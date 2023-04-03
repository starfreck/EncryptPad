import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import SecureStorage from "../Services/InternalServices/SecureStorage";
import CipherManager from "../Services/InternalServices/CipherManager";
import * as Clipboard from "expo-clipboard";

export default function EncryptScreen() {
    const [message, setMessage] = useState("");
    const [encryptedMessage, setEncryptedMessage] = useState("");

    const encrypt = async () => {
        if (message) {
            const publicKey = await SecureStorage.getValue("publicKey");

            const encryptedMsg = await CipherManager.encrypt(
                publicKey,
                message
            );

            setEncryptedMessage(encryptedMsg);
        }
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(encryptedMessage);
    };

    const clear = async () => {
        setMessage("");
        setEncryptedMessage("");
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Encrypt" />
            </Appbar.Header>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.inputContainer}>
                    <TextInput
                        value={message}
                        mode="outlined"
                        label="Plain Text"
                        placeholder="Type something"
                        style={styles.textInput}
                        onChangeText={(text) => setMessage(text)}
                        autoFocus={true}
                    />

                    {encryptedMessage ? (
                        <>
                            <Text variant="headlineMedium">Encrypted Text</Text>
                            <ScrollView>
                                <Text variant="bodyMedium" style={styles.text}>
                                    {encryptedMessage}
                                </Text>
                            </ScrollView>
                        </>
                    ) : null}
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        icon="lock-outline"
                        mode="contained"
                        style={styles.button}
                        onPress={() => encrypt()}
                    >
                        Encrypt
                    </Button>

                    {encryptedMessage ? (
                        <>
                            <Button
                                icon="clipboard-outline"
                                mode="contained"
                                style={styles.button}
                                onPress={() => copyToClipboard()}
                            >
                                Copy
                            </Button>
                            <Button
                                icon="delete-outline"
                                mode="contained"
                                style={styles.button}
                                onPress={() => clear()}
                            >
                                Clear
                            </Button>
                        </>
                    ) : null}
                </View>
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
    inputContainer: {
        flex: 5,
        alignItems: "center",
        alignContent: "space-between",
        width: "95%",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        width: "95%",
        margin: 50,
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

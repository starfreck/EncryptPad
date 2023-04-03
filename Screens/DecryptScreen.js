import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import SecureStorage from "../Services/InternalServices/SecureStorage";
import CipherManager from "../Services/InternalServices/CipherManager";
import * as Clipboard from "expo-clipboard";

export default function DecryptScreen() {
    const [message, setMessage] = useState("");
    const [encryptedMessage, setEncryptedMessage] = useState("");

    const decrypt = async () => {
        if (encryptedMessage) {
            const privateKey = await SecureStorage.getValue("privateKey");
            const decryptedMsg = await CipherManager.decrypt(
                privateKey,
                encryptedMessage
            );
            setMessage(decryptedMsg);
        }
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(message);
    };

    const clear = async () => {
        setMessage("");
        setEncryptedMessage("");
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Decrypt" />
            </Appbar.Header>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.inputContainer}>
                    <TextInput
                        value={encryptedMessage}
                        mode="outlined"
                        label="Encrypted Text"
                        placeholder="Type something"
                        style={styles.textInput}
                        onChangeText={(text) => setEncryptedMessage(text)}
                        autoFocus={true}
                    />

                    {message ? (
                        <>
                            <Text variant="headlineMedium">Decrypted Text</Text>
                            <ScrollView>
                                <Text variant="bodyMedium" style={styles.text}>
                                    {message}
                                </Text>
                            </ScrollView>
                        </>
                    ) : null}
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        icon="lock-open-variant-outline"
                        mode="contained"
                        style={styles.button}
                        onPress={() => decrypt()}
                    >
                        Decrypt
                    </Button>

                    {message ? (
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

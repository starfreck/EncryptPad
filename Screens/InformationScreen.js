import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Linking } from "react-native";
import { Appbar, Button } from "react-native-paper";

export default function EncryptScreen() {
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="App Info" />
            </Appbar.Header>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Button
                    icon="github"
                    mode="contained"
                    onPress={() =>
                        Linking.openURL("https://github.com/starfreck")
                    }
                >
                    @Starfreck
                </Button>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

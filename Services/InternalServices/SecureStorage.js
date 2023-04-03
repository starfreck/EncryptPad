import * as SecureStore from "expo-secure-store";

const SecureStorage = {
    setValue: async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    },

    getValue: async (key) => {
        const result = await SecureStore.getItemAsync(key);
        return result;
        if (result) {
            return result;
        } else {
            return null;
        }
    },
};

export default SecureStorage;

import { AsyncStorage } from 'react-native';

export default {

    get: (key) => {

        return AsyncStorage.getItem(key).then((value) => {
            return JSON.parse(value);
        });

    },

    set: (key, json) => {

        const value = JSON.stringify(json);

        return AsyncStorage.setItem(key, value);

    },

    merge: (key, json) => {

        const value = JSON.stringify(json);

        return AsyncStorage.mergeItem(key, value);

    },

    clear: (key) => {

        return AsyncStorage.removeItem(key);

    },

}
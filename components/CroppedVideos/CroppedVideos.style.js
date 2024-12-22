import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create(
    {
        container: {
            marginHorizontal: 5,
        },
        button: {
            alignItems: "flex-end",
            marginTop: 3
        },
        video: {
            height: 200,
            width: Dimensions.get('window').width * 0.45
        }
    }
);
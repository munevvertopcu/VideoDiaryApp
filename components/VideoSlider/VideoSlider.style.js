import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create(
    {
        container: {
            alignItems: "center",
        },
        video: {
            height: 300,
            width: Dimensions.get('window').width * 0.8,
            marginBottom: 10
        },
        text: {
            fontSize: 18,
            textAlign: "center",
            marginVertical: 50,
            marginHorizontal: 10,
            color: "#672714"
        }
    }
);
import React from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from 'expo-video';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import { useDispatch } from 'react-redux';
import { removeVideo } from '../../redux/features/videoSlice';
import CommonButton from '../../components/CommonButton'

export default function Details() {

    const item = useLocalSearchParams();

    const dispatch = useDispatch();

    const player = useVideoPlayer(item.uri);

    const handleDelete = (videoId) => {

        Alert.alert(
            'Delete the Video',
            'This video will be permanently deleted. Are you sure?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', style: 'destructive', onPress: () => {
                        dispatch(removeVideo(videoId))
                        router.push("/")
                    }
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ position: "absolute", left: 0 }} onPress={() => router.back()}>
                <MaterialIcons name="navigate-before" size={30} color="black" />
            </TouchableOpacity>
            <VideoView
                player={player}
                contentFit="cover"
                style={styles.video}
            />
            <Text style={styles.header}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <CommonButton title="Delete the Video" onPress={() => handleDelete(item.uri)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    video: {
        height: 300,
        width: Dimensions.get('window').width * 0.8,
        marginTop: 20
    },
    header: {
        fontSize: 30,
        color: "#672714",
        fontWeight: "bold",
        marginTop: 30,
        textAlign: "center",
        marginHorizontal: 10
    },
    description: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        marginBottom: 30,
        marginHorizontal: 10
    }
});
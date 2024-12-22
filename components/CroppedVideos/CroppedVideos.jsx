import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './CroppedVideos.style';
import { useVideoPlayer, VideoView } from 'expo-video';
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CroppedVideos({ data, id }) {

    const player = useVideoPlayer(data);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => router.push({
                pathname: "/details/[id]",
                params: {
                    id: id,
                    name: data.name,
                    description: data.description,
                    uri: data.uri
                }
            })}>
                <MaterialIcons name="navigate-next" size={24} color="black" />
            </TouchableOpacity>
            <VideoView
                player={player}
                contentFit="cover"
                style={styles.video}
            />
        </View>

    );
}
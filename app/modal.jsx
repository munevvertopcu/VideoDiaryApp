import React, { useState } from 'react'
import { StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import CommonButton from '../components/CommonButton';
import VideoSlider from '../components/VideoSlider';

export default function CropModal() {

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const selectVideo = async () => {
        try {
            setLoading(true);
            const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: "videos", allowsEditing: true });
            if (result.assets) setVideo(result.assets[0]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Animated.View
            entering={FadeIn}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#00000040',
            }}
        >
            <Link href={'/'} asChild>
                <Pressable style={StyleSheet.absoluteFill} />
            </Link>
            <Animated.View
                entering={SlideInDown}
                style={{
                    width: '90%',
                    height: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                }}
            >
                {
                    !video ?
                        <CommonButton title="Select a Video" onPress={selectVideo} />
                        : (
                            loading ?
                                <ActivityIndicator size="large" color="#DE6B48" /> :
                                <VideoSlider duration={video.duration} uri={video.uri} />
                        )
                }

            </Animated.View>
        </Animated.View>
    );
}
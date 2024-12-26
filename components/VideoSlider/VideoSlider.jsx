import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useEvent } from 'expo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CommonButton from '../CommonButton';
import styles from './VideoSlider.style';
import CustomMarker from './CustomMarker';

export default function VideoSlider({ duration, uri }) {

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);

    const player = useVideoPlayer(uri);

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const handleValuesChange = (value) => {
        const [newStart, newEnd] = value;

        if (newStart !== start) {
            setStart(newStart);
            player.currentTime = newStart;
        } else if (newEnd !== end) {
            setEnd(newEnd);
            player.currentTime = newEnd;
        }
    }

    return (
        <View style={styles.container}>
            <VideoView
                player={player}
                contentFit="fill"
                style={styles.video}
            />
            <TouchableOpacity onPress={isPlaying ? () => player.pause() : () => player.play()}>
                {
                    isPlaying ?
                        <MaterialIcons name="pause-circle" size={48} color="#DE6B48" />
                        :
                        <AntDesign name="play" size={40} color="#DE6B48" />

                }
            </TouchableOpacity>
            <Text style={styles.text}>Select the 5-second interval you want to crop</Text>
            <MultiSlider
                values={[start, end]}
                min={0}
                max={Platform.OS == "web" ? duration : duration / 1000}
                onValuesChange={handleValuesChange}
                onValuesChangeFinish={() => player.pause()}
                onValuesChangeStart={() => player.play()}
                minMarkerOverlapDistance={40}
                sliderLength={Dimensions.get('window').width * 0.8}
                step={.01}
                selectedStyle={{
                    backgroundColor: "#672714"
                }}
                trackStyle={{
                    height: 5
                }}
                containerStyle={{
                    marginBottom: 50
                }}
                customMarkerLeft={(e) => {
                    return <CustomMarker currentValue={e.currentValue} />;
                }}
                customMarkerRight={(e) => {
                    return <CustomMarker currentValue={e.currentValue} />;
                }}
                isMarkersSeparated={true}
            />
            <CommonButton title="Save and Continue" onPress={() => router.push({
                pathname: "metadata",
                params: {
                    start: start,
                    end: end,
                    uri: uri
                }
            })} />
        </View>
    );
}
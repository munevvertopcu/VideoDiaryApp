import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { router } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';
import { loadVideos } from '../redux/features/videoSlice';
import CommonButton from '../components/CommonButton';
import CroppedVideos from '../components/CroppedVideos';

export default function Home() {

    const { videos, isLoading } = useSelector((state) => state.videos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadVideos());
    }, [dispatch]);

    const renderItem = ({ item, index }) => {
        return (
            <CroppedVideos data={item} id={index} />
        )
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cropped Videos</Text>
            {
                videos.length === 0 ?
                    <Text style={styles.text}>There is no cropped video.</Text> : (
                        isLoading ?
                            <ActivityIndicator size="large" color="#DE6B48" />
                            :
                            <FlatList
                                data={videos}
                                renderItem={renderItem}
                                numColumns={2}
                                keyExtractor={(item, index) => index}
                                style={styles.videoList}
                            />
                    )

            }
            <CommonButton title="Add New Video" onPress={() => router.push("/modal")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20
    },
    header: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#DE6B48",
        marginTop: 20
    },
    text: {
        fontSize: 30,
        textAlign: "center",
        color: "#672714",
    },
    videoList: {
        marginBottom: 3
    }
});
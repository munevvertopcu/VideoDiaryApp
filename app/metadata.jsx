import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import Input from '../components/Input'
import CommonButton from '../components/CommonButton';
import useVideoCrop from '../hooks/useVideoCrop';
import { saveVideos } from '../redux/features/videoSlice';
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MetadataForm() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const { uri, start, end } = useLocalSearchParams();

    const dispatch = useDispatch();

    const { mutateAsync: cropVideo, isPending } = useVideoCrop();

    const handleCropAndSave = async () => {
        try {
            if (!name || !description) {
                return setModalVisible(true)
            }
            const output = await cropVideo({ uri, start, end });
            dispatch(saveVideos({ uri: output, name: name, description: description }));
            router.push("/")
        } catch (error) {
            console.error('Cropping failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialIcons name="navigate-before" size={30} color="black" />
            </TouchableOpacity>
            <Input name={name} setName={setName} description={description} setDescription={setDescription} />
            <View style={styles.buttonWrapper}>
                {
                    isPending && <ActivityIndicator size="large" color="#DE6B48" />
                }
                <CommonButton title="Save and Crop" onPress={handleCropAndSave} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Name and description fields cannot be left blank.</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}>
                            <AntDesign name="closecircle" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    buttonWrapper: {
        alignSelf: "center",
        marginTop: 20
    },
    backButton: {
        position: "absolute",
        top: 0
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
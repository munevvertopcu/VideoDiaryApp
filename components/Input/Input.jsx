import React from 'react';
import { TextInput, Text } from 'react-native';
import styles from './Input.style';

export default function Input({ name, setName, description, setDescription }) {

    return (
        <>
            <Text style={styles.text}>Write the video name and description data.</Text>
            <Text style={styles.header}>NAME:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder="name"
            />
            <Text style={styles.header}>DESCRIPTION:</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                placeholder="description"
            />
        </>
    );
}
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './CommonButton.style';

export default function CommonButton({ title, onPress }) {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
import React from 'react';
import { Text, View } from 'react-native';

export default function CustomMarker({ currentValue }) {

    return (
        <View
            style={{
                transform: [{ rotate: "90deg" }],
            }}
        >
            <View
                collapsable={false}
                style={{
                    marginLeft: 54,
                    marginBottom: -32,
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: "#672714",
                }}
            ></View>
            <View
                style={{
                    width: 40,
                    height: 50,
                    backgroundColor: "#672714",
                    borderRadius: 10,
                    padding: 5,
                    position: "relative",
                    marginRight: 80,
                    transform: [{ rotate: "180deg" }],
                    justifyContent: "center"
                }}
            >
                <Text
                    style={{
                        width: "100%",
                        textAlign: "center",
                        transform: [{ rotate: "90deg" }],
                        color: "#fff",
                    }}
                >
                    {currentValue.toFixed(2)}
                </Text>
                <View
                    style={{
                        position: "absolute",
                        left: -10,
                        top: 25,
                        width: 0,
                        height: 0,
                        backgroundColor: "transparent",
                        borderStyle: "solid",
                        borderRightWidth: 10,
                        borderTopWidth: 10,
                        borderRightColor: "transparent",
                        borderTopColor: "#672714",
                        transform: [{ rotate: "90deg" }],
                    }}
                />
                <View
                    style={{
                        position: "absolute",
                        left: -10,
                        top: 15,
                        width: 0,
                        height: 0,
                        backgroundColor: "transparent",
                        borderStyle: "solid",
                        borderRightWidth: 10,
                        borderTopWidth: 10,
                        borderRightColor: "transparent",
                        borderTopColor: "#672714",
                        transform: [{ rotate: "180deg" }],
                    }}
                />
            </View>
        </View>
    );
}
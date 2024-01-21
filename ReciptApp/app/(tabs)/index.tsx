import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function TabOneScreen() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // Perform type assertion here
            setSelectedImage((result as any).uri);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // Perform type assertion here
            setSelectedImage((result as any).uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Image source={require('./SplitIt_logo.png')} style={styles.titleImage} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.button}>
                    <Text style={styles.buttonText}>Upload Receipt</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={takePhoto} style={styles.button}>
                    <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>
            </View>
            {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    titleContainer: {
        marginBottom: 20,
    },
    titleImage: {
        width: 200,
        height: 50, // Adjust the height as needed
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    image: {
        marginTop: 20,
        width: 1000,
        height: 1000,
    },
});
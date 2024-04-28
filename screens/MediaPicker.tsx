import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { pickImage } from './../utils/MediaPicker'; // Assuming you saved the utility in ImagePickerUtil.ts
import { navigateToScreen } from '../utils/NavigationRef';

const MediaPicker: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<null>(null);

    const handlePickImage = async () => {
        try {
            const image = await pickImage();
            setSelectedImage(image.assets[0].uri);
            console.log("image.assets[0].uri", image.assets[0].uri);

            console.log('', image);
        } catch (error) {
            console.error('Error pickin:', error);

        }
    };

    const handlePasscode = () => {
        navigateToScreen('BioMetrics');
    }

    return (
        <View style={{ margin: 15, justifyContent: 'center', alignItems: 'center' }}>
            {selectedImage ? (
                <Image source={{ uri: selectedImage }}

                    style={{ width: 100, height: 100, marginBottom: 20, borderRadius: 50 }}
                />
            ) : (
                <Text>No image selected</Text>
            )}
            <Button title="POC for BioMetrics" onPress={handlePasscode} />
            <Button title="Change Profile Pic" onPress={handlePickImage} />
        </View>
    );
};

export default MediaPicker;

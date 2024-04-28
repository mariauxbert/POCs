import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
// Default options for image picker


/**
 * Function to open image library and return selected image data
 * @param options - Options for image picker (optional)
 * @returns A Promise that resolves with the selected image data or rejects with an error
 */
export const pickImage = () => {
  return new Promise((resolve, reject) => {



    launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.5,
    }, (response) => {
      if (response.didCancel) {
   
        reject('User cancelled image picker');
      } else if (response) {
        resolve(response);
      } else {
        resolve(response);
      }

    });
  });
};

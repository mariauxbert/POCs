// secureStorageUtility.js
import SecureStorage from 'rn-secure-storage';

const saveData = async (key, data) => {
  try {
    await SecureStorage.setItem(key, JSON.stringify(data));
    console.log(`Data saved successfully with key: ${key}`);
  } catch (error) {
    console.error(`Error saving data with key ${key}:`, error);
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await SecureStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error getting data with key ${key}:`, error);
    return null;
  }
};

const removeData = async (key) => {
  try {
    await SecureStorage.removeItem(key);
    console.log(`Data removed successfully with key: ${key}`);
  } catch (error) {
    console.error(`Error removing data with key ${key}:`, error);
  }
};

export { saveData, getData, removeData };

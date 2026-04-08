import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('[storage] saveItem error:', e);
  }
};

export const loadItem = async <T>(key: string, fallback: T): Promise<T> => {
  try {
    const val = await AsyncStorage.getItem(key);
    return val !== null ? (JSON.parse(val) as T) : fallback;
  } catch (e) {
    console.warn('[storage] loadItem error:', e);
    return fallback;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn('[storage] removeItem error:', e);
  }
};

export const getAllKeys = async (): Promise<string[]> => {
  try {
    return (await AsyncStorage.getAllKeys()) as string[];
  } catch (e) {
    return [];
  }
};
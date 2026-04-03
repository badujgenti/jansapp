import AsyncStorage from "@react-native-async-storage/async-storage";

export const appStorage = {
  async getString(key: string): Promise<string | undefined> {
    const value = await AsyncStorage.getItem(key);
    return value ?? undefined;
  },

  async setString(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  },

  async getNumber(key: string): Promise<number | undefined> {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? Number(value) : undefined;
  },

  async setNumber(key: string, value: number): Promise<void> {
    await AsyncStorage.setItem(key, String(value));
  },

  async getBoolean(key: string): Promise<boolean | undefined> {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value === "true" : undefined;
  },

  async setBoolean(key: string, value: boolean): Promise<void> {
    await AsyncStorage.setItem(key, String(value));
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.clear();
  },

  async getAllKeys(): Promise<string[]> {
    const keys = await AsyncStorage.getAllKeys();
    return keys as string[];
  },
};

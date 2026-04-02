import { MMKV } from "react-native-mmkv";

const storage = new MMKV({ id: "jansapp-storage" });

export const appStorage = {
  getString(key: string): string | undefined {
    return storage.getString(key);
  },

  setString(key: string, value: string): void {
    storage.set(key, value);
  },

  getNumber(key: string): number | undefined {
    return storage.getNumber(key);
  },

  setNumber(key: string, value: number): void {
    storage.set(key, value);
  },

  getBoolean(key: string): boolean | undefined {
    return storage.getBoolean(key);
  },

  setBoolean(key: string, value: boolean): void {
    storage.set(key, value);
  },

  remove(key: string): void {
    storage.delete(key);
  },

  clearAll(): void {
    storage.clearAll();
  },

  getAllKeys(): string[] {
    return storage.getAllKeys();
  },
};

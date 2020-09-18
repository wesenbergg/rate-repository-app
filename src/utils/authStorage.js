import { AsyncStorage } from 'react-native';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(
      `${this.namespace}:authentication`,
    );
    return token ? token : '';
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    console.log('AuthStorage: ', accessToken);
    await AsyncStorage.setItem(
      `${this.namespace}:authentication`,
      accessToken,
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:authentication`);
  }
}

export default AuthStorage;
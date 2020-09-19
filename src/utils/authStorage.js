import { AsyncStorage } from 'react-native';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    return AsyncStorage.getItem(
      `${this.namespace}:auth`,
    );
  }

  setAccessToken(accessToken) {
    // Add the access token to the storage
    // console.log('AuthStorage: ', accessToken);
    AsyncStorage.setItem(
      `${this.namespace}:auth`,
      accessToken,
    );
  }

  removeAccessToken() {
    // Remove the access token from the storage
    AsyncStorage.removeItem(`${this.namespace}:auth`);
  }
}

export default AuthStorage;
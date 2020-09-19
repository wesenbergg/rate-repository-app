import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';
import AuthStorage from '../utils/authStorage';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appbar,
    flexDirection: "row"
  },
  navHeader: {
    color: 'white'
  }
  // ...
});

const AppBar = () => {
  const { data } = useQuery(AUTHORIZED_USER);
  const client = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
  };

  if(!data) return<></>;
  return (
  <View style={styles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Link to="/" component={TouchableWithoutFeedback} activeOpacity={0.8} >
        <Text bold h1 light p5>Repositories</Text>
      </Link>

      {data.authorizedUser ? 
      <Link to="/signin" component={TouchableWithoutFeedback} activeOpacity={0.8} onPress={signOut} >
        <Text h1 light p5>Sign out</Text>
      </Link>:
      <Link to="/signin" component={TouchableWithoutFeedback} activeOpacity={0.8} >
        <Text h1 light p5>Sign in</Text>
      </Link>}
      
      
    </ScrollView>
  </View>
  );
};

export default AppBar;
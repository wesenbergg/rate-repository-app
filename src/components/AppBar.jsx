/* eslint-disable no-constant-condition */
import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appbar,
    flexDirection: "row"
  },
  navHeader: {
    color: 'white'
  }
});

const AppBar = () => {
  
  return (
  <View style={styles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Link to="/" component={TouchableWithoutFeedback} activeOpacity={0.8} >
        <Text bold h1 light p5>Repositories</Text>
      </Link>

      {true ? 
      <Link to="/signin" component={TouchableWithoutFeedback} activeOpacity={0.8} >
        <Text h1 light p5>Sign in</Text>
      </Link>:
      <Link to="/signin" component={TouchableWithoutFeedback} activeOpacity={0.8} >
        <Text h1 light p5>Sign out</Text>
      </Link>}
      
      
    </ScrollView>
  </View>
  );
};

export default AppBar;
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
// import theme from '../theme';
import AppBar from './AppBar';
import SingleRepo from './SingleRepo';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import NewReviewForm from './NewReviewForm';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#f4f4fa",
    // fontFamily: "Roboto",
  },
});
const item = {
  id: 'jaredpalmer.formik',
  fullName: 'jaredpalmer/formik',
  description: 'Build forms in React, without the tears',
  language: 'TypeScript',
  forksCount: 1589,
  stargazersCount: 21553,
  ratingAverage: 88,
  reviewCount: 4,
  ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
};

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/newReview" exact>
          <NewReviewForm />
        </Route>
        <Route path="/repo/:id">
          <SingleRepo />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
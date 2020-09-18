import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textLight
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: theme.borderRadius.inputGroup,
    margin: 12,
    padding: 10,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.badge,
    margin: 12,
    padding: 10,
  }
});

const SignInForm = ({onSubmit}) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name="username" placeholder="Username" />
      <FormikTextInput style={styles.input} name="password" placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={onSubmit} activeOpacity={theme.buttons.activeOpacity}>
        <Text center h1 bold light>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values.username);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) =><SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
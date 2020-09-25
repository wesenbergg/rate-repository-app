import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import useCreateUser from '../hooks/useCreateUser';

const initialValues = {
  username: '',
  password: '',
  rePassword: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    // .min(1, 'Weight must be greater or equal to 1')
    .required('Username is required'),
  password: yup
    .string()
    // .min(1, 'Height must be greater or equal to 0.5')
    .required('Password is required'),
  rePassword: yup
    .string()
    .oneOf([yup.ref('password'), null])
    // .required('Password confirm is required')
    
    // .min(1, 'Height must be greater or equal to 0.5')
    .required('Password confirmation is required'),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textLight
  },
  btn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.badge,
    margin: 12,
    padding: 10,
  }
});

export const SignInForm = ({onSubmit}) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name="username" placeholder="Username" />
      <FormikTextInput style={styles.input} name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput style={styles.input} name="rePassword" placeholder="Confirm password" secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={onSubmit} activeOpacity={theme.buttons.activeOpacity} testID="submitButton">
        <Text center h1 bold light>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SignUpContainer = ({onSubmit}) => {
  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) =><SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const SignUp = () => {
  const [createUser] = useCreateUser();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await createUser({ username, password });
      // console.log("SIGNUP COMPONENT", data.createUser);
      history.push('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;
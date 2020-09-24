import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import useReview from '../hooks/useReview';

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  review: ''
};

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Owner name is required'),
  name: yup
  .string()
  .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be greater than 0')
    .max(100, 'Rating must be smaller than 100')
    .required('Rating is required'),
  review: yup
  .string()
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

export const ReviewForm = ({onSubmit}) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name="owner" placeholder="Repository owner name" />
      <FormikTextInput style={styles.input} name="name" placeholder="Repository Name" />
      <FormikTextInput style={styles.input} name="rating" keyboardType="numeric" placeholder="Rating between 0 and 100" />
      <FormikTextInput style={styles.input} name="review" placeholder="Review" multiline />
      <TouchableOpacity style={styles.btn} onPress={onSubmit} activeOpacity={theme.buttons.activeOpacity} testID="submitButton">
        <Text center h1 bold light>Create a review</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ReviewContainer = ({onSubmit}) => {
  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) =><ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const NewReviewForm = () => {
  const [newReview, result] = useReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    console.log(values);
    const { owner, name, rating, review } = values;

    try {
      const { data } = await newReview({ owner, name, rating: parseInt(rating, 10), review });
      history.push('/repo/'+data.createReview.repositoryId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ReviewContainer onSubmit={onSubmit} />
  );
};

export default NewReviewForm;
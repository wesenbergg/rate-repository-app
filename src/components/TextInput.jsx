/* eslint-disable no-unused-vars */
import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.error,
    color: theme.colors.error,
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: theme.borderRadius.inputGroup,
    margin: 12,
    padding: 10,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.input,
    error && styles.error,
    style,
  ];

  return <NativeTextInput style={textInputStyle} {...props}/>;
};

export default TextInput;
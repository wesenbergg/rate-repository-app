import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  h1: {
    fontSize: theme.fontSizes.h1
  },
  light: {
    color: theme.colors.textLight
  },
  p5: {
    margin: theme.spacing.p5
  },
  badge: {
    padding: theme.spacing.p5,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    borderRadius: 5
  },
  center: {
    textAlign: "center"
  }
});

const Text = ({ color, fontSize, fontWeight, bold, subheading, style, h1, light, p5, badge, center, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    bold && styles.fontWeightBold,
    subheading && styles.fontSizeSubheading,
    h1 && styles.h1,
    light && styles.light,
    p5 && styles.p5,
    badge && styles.badge,
    center && styles.center,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
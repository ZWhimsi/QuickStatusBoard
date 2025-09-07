// InterviU Typography System
// Based on Poppins font family from brand guidelines

import { Platform } from 'react-native';

export const InterviUTypography = {
  // Font Families
  fontFamily: {
    regular: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
      default: 'System',
    }),
    medium: Platform.select({
      ios: 'Poppins-Medium', 
      android: 'Poppins-Medium',
      default: 'System',
    }),
    semibold: Platform.select({
      ios: 'Poppins-SemiBold',
      android: 'Poppins-SemiBold', 
      default: 'System',
    }),
    bold: Platform.select({
      ios: 'Poppins-Bold',
      android: 'Poppins-Bold',
      default: 'System',
    }),
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Text Styles
  styles: {
    // Headers
    h1: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 36,
      lineHeight: 44,
      fontWeight: '600',
    },
    h2: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: 30,
      lineHeight: 38,
      fontWeight: '600',
    },
    h3: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600',
    },
    h4: {
      fontFamily: 'Poppins-Medium',
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '500',
    },
    h5: {
      fontFamily: 'Poppins-Medium',
      fontSize: 18,
      lineHeight: 26,
      fontWeight: '500',
    },
    h6: {
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
    },
    
    // Body Text
    body: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    },
    bodySmall: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
    },
    caption: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400',
    },
    
    // Special Text
    button: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
    },
    link: {
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
      textDecorationLine: 'underline',
    },
    label: {
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500',
    },
  }
};

export default InterviUTypography;

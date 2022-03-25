import {View, Text} from 'react-native';
import React from 'react';
import colors from '../../res/colors';

export default function Index({
  numberOfLines,
  type = 'Regular',
  size = 14,
  mb = 5,
  color = colors.primaryWhite,
  style,
  children,
}) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: `Lato-${type}`,
          fontSize: size,
          marginBottom: mb,
          color: color,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

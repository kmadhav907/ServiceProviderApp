import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {blue, yellow} from '../Constants/ColorScheme';

const Loader = () => {
  return (
    <View style={loaderStyles.loaderContent}>
      <ActivityIndicator animating color={blue} size="large" />
    </View>
  );
};
const loaderStyles = StyleSheet.create({
  loaderContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: yellow,
  },
});

export default Loader;

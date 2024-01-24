import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../Styles/globalStyles';
import {navigateToRouteWithReset} from '../Utils/navigateTo';
import {LOGINSCREEN} from '../Constants/Navigations';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {HEIGHT} from '../Constants/Dimensions';
import {black, yellow} from '../Constants/ColorScheme';
const splashViewImage = require('../Assets/SplashScreen.png');

interface SplashScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

let SPLASHSCREENTIMEOUT: number = 3000;

const SplashScreen = (props: SplashScreenProps) => {
  const [animating, setAnimating] = useState<boolean>(true);
  let timeout: NodeJS.Timeout;
  useEffect(() => {
    timeout = setTimeout(() => {
      navigateToRouteWithReset(LOGINSCREEN, props.navigation);
    }, SPLASHSCREENTIMEOUT);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <View style={globalStyles.screenContainer}>
      <View style={spalshScreenStyle.container}>
        <Image source={splashViewImage} style={spalshScreenStyle.image} />
        <Text style={spalshScreenStyle.subheading}>By</Text>
        <Text style={spalshScreenStyle.heading}>
          SIMPLE MECHANIAL SOLUTIONS
        </Text>
        <ActivityIndicator
          animating={animating}
          color={yellow}
          size="large"
          style={spalshScreenStyle.activityIndicator}
        />
      </View>
    </View>
  );
};
const spalshScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    marginTop: 20,
    height: HEIGHT / 5,
  },
  heading: {textAlign: 'center', color: yellow, fontSize: 18},
  image: {width: '100%', resizeMode: 'contain', height: 170},
  subheading: {textAlign: 'center', fontSize: 16},
});

export default SplashScreen;

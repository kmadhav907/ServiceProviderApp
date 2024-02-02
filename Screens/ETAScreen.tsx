import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {View} from 'react-native';
import CurrentNotificationContext from '../Context/CurrentNotificationContext';

interface ETAScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}
const ETAScreen = (props: ETAScreenProps) => {
  const {currentNotification, setCurrentNotification} = useContext(
    CurrentNotificationContext,
  );

  return <View></View>;
};

export default ETAScreen;

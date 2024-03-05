import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {WIDTH} from '../Constants/Dimensions';
import {navigateToRouteWithoutReset} from '../Utils/navigateTo';
import {
  DASHBOARDSCREEN,
  HISTORYSCREEN,
  PROFILESCREEN,
} from '../Constants/Navigations';
import Modal from 'react-native-modal';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  ParamListBase,
  NavigationContainerRef,
  useRoute,
} from '@react-navigation/native';
import {yellow} from '../Constants/ColorScheme';
import Icon from 'react-native-vector-icons/FontAwesome';
const splashViewImage = require('../Assets/SplashScreen.png');

interface ModelProps {
  modalDrawer: boolean;
  toggleDrawer: () => void;
  navigation: StackNavigationProp<ParamListBase, string>;
}

const Model: React.FC<ModelProps> = ({
  modalDrawer,
  toggleDrawer,
  navigation,
}) => {
  const handleProfileClick = () => {
    navigateToRouteWithoutReset(PROFILESCREEN, navigation);
    toggleDrawer();
  };
  const routerProperties = useRoute();
  const handleHistoryClick = () => {
    navigateToRouteWithoutReset(HISTORYSCREEN, navigation);
    toggleDrawer();
  };

  const handleIconClick = () => {
    navigation.pop();
    toggleDrawer();
  };

  return (
    <>
      {modalDrawer && (
        <Modal
          isVisible={modalDrawer}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          onBackButtonPress={toggleDrawer}
          style={drawerStyles.modalStyle}
          hideModalContentWhileAnimating
          onBackdropPress={toggleDrawer}
          useNativeDriver
          swipeDirection="left">
          <SafeAreaView>
            <View style={drawerStyles.drawerContainer}>
              <TouchableOpacity onPress={handleIconClick}>
                <Image source={splashViewImage} style={drawerStyles.image} />
              </TouchableOpacity>
              {/* History */}
              <TouchableOpacity
                onPress={handleHistoryClick}
                disabled={routerProperties.name === HISTORYSCREEN}
                style={drawerStyles.profileIconContainer}>
                <Icon name="history" color={yellow} size={25} />
                <Text style={drawerStyles.profileButton}>History</Text>
              </TouchableOpacity>
              {/* Profile  */}
              <TouchableOpacity
                onPress={handleProfileClick}
                disabled={routerProperties.name === PROFILESCREEN}
                style={drawerStyles.profileIconContainer}>
                <Icon name="user" color={yellow} size={30} />
                <Text style={drawerStyles.profileButton}>Profile</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
};

const drawerStyles = StyleSheet.create({
  image: {
    width: 180,
    resizeMode: 'center',
    height: 90,
  },
  drawerContainer: {
    padding: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  profileIconContainer: {
    flexDirection: 'row',
    marginLeft: 18,
    marginTop: 10,
    alignItems: 'center',
  },
  profileButton: {
    fontSize: 24,
    color: 'yellow',
    paddingLeft: 20,
    textAlign: 'left',
  },
  modalStyle: {
    width: WIDTH * 0.75,
    backgroundColor: 'black',
    color: 'white',
    margin: 0,
    flex: 1,
    borderTopRightRadius: 15,
    justifyContent: 'flex-start',
  },
});

export default Model;

import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Map from '../Component/Map';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import CurrentNotificationContext from '../Context/CurrentNotificationContext';
import {WIDTH} from '../Constants/Dimensions';
import globalStyles from '../Styles/globalStyles';
import {black, white, yellow} from '../Constants/ColorScheme';
import {ETASCREEN} from '../Constants/Navigations';
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';

import {FIXIT_LEFT_TO_NOTIFICATION} from '../Constants/Status';
import {navigateToRouteWithReset} from '../Utils/navigateTo';
import Modal from 'react-native-modal';

interface MapRouteProp {
  navigation: StackNavigationProp<ParamListBase, string>;
}
interface ETATime {
  hours: number;
  minutes: number;
  seconds: number;
}
const MapRouteScreen = (props: MapRouteProp) => {
  const [showETAModel, setShowETAModel] = useState<boolean>(false);
  const [etaTime, setEtaTime] = useState<ETATime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const {currentNotification, setCurrentNotification} = useContext(
    CurrentNotificationContext,
  );
  const openETAModel = () => {
    setShowETAModel(true);
  };

  const handleETATime = (value: ValueMap) => {
    setEtaTime({...etaTime, hours: value.hours, minutes: value.minutes});
  };
  const navigateToETA = () => {
    setCurrentNotification({
      ...currentNotification,
      stepsToNavigate: ETASCREEN,
      fixitStatus: FIXIT_LEFT_TO_NOTIFICATION,
      etaTime: {...etaTime},
    });
    navigateToRouteWithReset(ETASCREEN, props.navigation);
  };

  return (
    <View style={globalStyles.screenContainer}>
      {showETAModel && (
        <Modal isVisible={showETAModel}>
          <View style={mapRouteStyles.modalContent}>
            <Text style={mapRouteStyles.modalTitle}>
              Enter you ETA Time (Hours : Minutes)
            </Text>
            <TimePicker
              value={etaTime}
              onChange={handleETATime}
              minutesInterval={10}></TimePicker>
            {etaTime.hours ? (
              <Text style={mapRouteStyles.modalSubText}>
                ETA Time {etaTime.hours}hrs : {etaTime.minutes}:mins
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={navigateToETA}
              style={mapRouteStyles.modalBtn}>
              <Text style={mapRouteStyles.modalText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <Map
        latitude={currentNotification.latitude}
        longitude={currentNotification.longitude}
        navigation={props.navigation}
      />
      <TouchableOpacity
        style={mapRouteStyles.buttonStyle}
        onPress={openETAModel}>
        <Text style={mapRouteStyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const mapRouteStyles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: yellow,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    marginLeft: 20,
    marginBottom: 40,
    borderRadius: 5,
    elevation: 6,
    padding: 10,
    width: WIDTH * 0.9,
  },
  buttonText: {
    color: black,
    fontWeight: '500',
    fontSize: 18,
  },
  modalContent: {
    padding: 5,
    backgroundColor: yellow,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    color: black,
    fontWeight: '500',
  },
  modalSubText: {
    fontSize: 16,
    color: black,
    fontWeight: '500',
  },
  modalBtn: {
    width: '90%',
    backgroundColor: black,
    padding: 10,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalText: {
    color: white,
    textAlign: 'center',
  },
});

export default MapRouteScreen;

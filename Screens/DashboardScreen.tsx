import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import globalStyles from '../Styles/globalStyles';
import Map from '../Component/Map';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {black, white} from '../Constants/ColorScheme';
import {WIDTH} from '../Constants/Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
import {requestLocationPermission} from '../Utils/requests';
import {Cordinates} from '../Types/LocationTypes';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import Notifications from '../Component/Notifications';
import {notifications} from '../Constants/Data';
import Loader from '../Component/Loader';

interface DashboardScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const DashboardScreen = (props: DashboardScreenProps) => {
  const [currentCords, setCurrentCords] = useState<Cordinates | null>(null);
  const [userStatus, setUserStatus] = useState<boolean>(true);
  const [modalDrawer, setModalDrawer] = useState<boolean>(false);

  useEffect(() => {
    let watchId: number;
    requestLocationPermission().then(response => {
      if (response) {
        Geolocation.getCurrentPosition(
          (positon: GeolocationResponse) => {
            setCurrentCords({
              latitude: positon.coords.latitude,
              longitude: positon.coords.longitude,
            });
          },
          err => {
            console.log(err);
          },
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 1000,
          },
        );
        watchId = Geolocation.watchPosition(
          (position: GeolocationResponse) => {
            setCurrentCords({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          err => {
            console.log(err);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 1000,
          },
        );
      }
    });
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);
  const handleOpenModal = () => {
    setModalDrawer(true);
  };
  const toggleDrawer = () => {
    setModalDrawer(false);
  };
  return (
    <>
      {!currentCords ? (
        <View style={globalStyles.screenContainer}>
          <Loader />
        </View>
      ) : (
        <View style={globalStyles.screenContainer}>
          {modalDrawer && (
            <Modal
              isVisible={modalDrawer}
              animationIn="slideInLeft"
              animationOut="slideOutLeft"
              onBackButtonPress={toggleDrawer}
              style={dashboardStyles.modalStyle}
              hideModalContentWhileAnimating
              onBackdropPress={toggleDrawer}
              useNativeDriver
              swipeDirection="left">
              <SafeAreaView></SafeAreaView>
            </Modal>
          )}
          <View style={dashboardStyles.iconContainer}>
            <TouchableOpacity onPress={handleOpenModal}>
              <Icon name="align-justify" color={black} size={24} />
            </TouchableOpacity>

            <ToggleSwitch
              isOn={userStatus}
              onColor={white}
              offColor={black}
              thumbOnStyle={{backgroundColor: black}}
              onToggle={status => {
                setUserStatus(status);
              }}
              size="medium"></ToggleSwitch>
          </View>
          <>
            {userStatus ? (
              <View
                style={[
                  globalStyles.screenSection,
                  dashboardStyles.dashboardContent,
                ]}>
                <View style={dashboardStyles.headerSection}>
                  <Icon name="circle" color="green" />
                  <Text style={dashboardStyles.headerTitle}>Place Name</Text>
                </View>
                <Map
                  latitude={currentCords.latitude}
                  longitude={currentCords.longitude}
                  navigation={props.navigation}
                />
                <View style={dashboardStyles.notificationContainer}>
                  <Notifications
                    notifications={notifications}
                    navigation={props.navigation}
                    setSelectedRegion={() => {}}
                  />
                </View>
              </View>
            ) : (
              <View
                style={[
                  globalStyles.screenSection,
                  dashboardStyles.dashboardContent,
                ]}>
                <Text style={dashboardStyles.offlineText}>
                  You are offline!
                </Text>
              </View>
            )}
          </>
        </View>
      )}
    </>
  );
};

const dashboardStyles = StyleSheet.create({
  dashboardContent: {
    padding: 0,
    paddingTop: 0,
    paddingLeft: 0,
    alignItems: 'center',
  },
  headerSection: {
    width: WIDTH * 0.9,
    marginTop: 30,
    marginBottom: 30,
    padding: 8,
    flexDirection: 'row',
    backgroundColor: white,
    borderRadius: 5,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    color: black,
    fontWeight: '400',
    paddingLeft: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: WIDTH,
  },
  modalStyle: {
    width: WIDTH * 0.75,
    backgroundColor: 'black',
    color: 'white',
    margin: 0,
    flex: 1,
    borderTopRightRadius: 15,
    // borderBottomRightRadius: 15,
  },
  notificationContainer: {
    position: 'absolute',
    bottom: 10,
    width: WIDTH,
    alignItems: 'center',
  },
  offlineText: {
    fontSize: 24,
    fontWeight: '700',
    color: black,
  },
});
export default DashboardScreen;

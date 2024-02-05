import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CurrentNotificationContext from '../Context/CurrentNotificationContext';
import {ETATime} from '../Types/TimeTypes';
import {navigateToRouteWithReset} from '../Utils/navigateTo';
import {BILLINGSCREEN, DASHBOARDSCREEN} from '../Constants/Navigations';
import globalStyles from '../Styles/globalStyles';
import {HEIGHT, WIDTH} from '../Constants/Dimensions';
import {black, white, yellow} from '../Constants/ColorScheme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import Map from '../Component/Map';
import Model from '../Component/Model';
import {FIXIT_REACHED_TO_NOTIFICATION} from '../Constants/Status';

interface ETAScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}
const ETAScreen = (props: ETAScreenProps) => {
  const {currentNotification, setCurrentNotification} = useContext(
    CurrentNotificationContext,
  );
  const [etaTime, setEtaTime] = useState<ETATime>({
    hours: 0,
    minutes: 0,
    seconds: 5,
  });
  const [showNextModal, setShowNextModal] = useState<boolean>(false);
  const [modalDrawer, setModalDrawer] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalDrawer(true);
  };

  const toggleDrawer = () => {
    setModalDrawer(!modalDrawer);
  };
  useEffect(() => {
    if (currentNotification.etaTime) {
      setEtaTime(currentNotification.etaTime);
    } else {
      Alert.alert(
        'Something went wrong',
        `Contact Administrator.`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigateToRouteWithReset(DASHBOARDSCREEN, props.navigation);
            },
            style: 'cancel',
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  }, []);
  let interval: NodeJS.Timeout;
  useEffect(() => {
    interval = setInterval(() => {
      if (
        etaTime.hours === 0 &&
        etaTime.minutes === 0 &&
        etaTime.seconds === 0
      ) {
        clearInterval(interval);
        setShowNextModal(true);
        return;
      }
      setEtaTime(etaTime => {
        let newEtaTime = {...etaTime};
        if (newEtaTime.seconds > 0) {
          newEtaTime.seconds -= 1;
        } else if (newEtaTime.minutes > 0) {
          newEtaTime.minutes -= 1;
          newEtaTime.seconds = 59;
        } else if (newEtaTime.hours > 0) {
          newEtaTime.hours -= 1;
          newEtaTime.minutes = 59;
          newEtaTime.seconds = 59;
        }
        return newEtaTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentNotification.etaTime]);

  const handleBillingScreen = () => {
    // clearInterval(interval);
    // setCurrentNotification({
    //   ...currentNotification,
    //   stepsToNavigate: BILLINGSCREEN,
    //   fixitStatus: FIXIT_REACHED_TO_NOTIFICATION,
    // });
    navigateToRouteWithReset(BILLINGSCREEN,props.navigation)
  };
  return (
    <View style={[globalStyles.screenContainer, {backgroundColor: white}]}>
      <View style={etaStyles.iconContainer}>
        <Model
          modalDrawer={modalDrawer}
          toggleDrawer={toggleDrawer}
          navigation={props.navigation}
        />
        <View style={etaStyles.iconContainerMenu}>
          <TouchableOpacity onPress={handleOpenModal}>
            <Icon name="align-justify" color={black} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {showNextModal && (
        <Modal isVisible={showNextModal}>
          <View style={etaStyles.modalContent}>
            <Text style={etaStyles.modalTitle}>Do you want to continue?</Text>
            <TouchableOpacity style={etaStyles.modalBtn} onPress={handleBillingScreen}>
              <Text style={etaStyles.modalSubText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      {etaTime.hours > 0 || (etaTime.hours === 0 && etaTime.minutes > 0) ? (
        <View style={etaStyles.timerContainer}>
          <Text style={etaStyles.headerText}>ETA Time</Text>
          <Text style={etaStyles.timerText}>
            {`${String(etaTime.hours).padStart(2, '0')}:${String(
              etaTime.minutes,
            ).padStart(2, '0')}:${String(etaTime.seconds).padStart(2, '0')}`}
          </Text>
          <Text style={etaStyles.locationText}>{'Source -> Destination'}</Text>
          <View style={etaStyles.mapContainer}>
            <Map
              latitude={currentNotification.latitude}
              longitude={currentNotification.longitude}
              navigation={props.navigation}
            />
          </View>

          <TouchableOpacity
            style={etaStyles.btnAction}
            onPress={() => setShowNextModal(true)}>
            <Text style={etaStyles.btnText}>Reached</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
const etaStyles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: HEIGHT / 9,
  },
  timerText: {
    fontSize: 36,
    fontWeight: '700',
    color: black,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: black,
    textAlign: 'center',
  },
  mapContainer: {
    height: HEIGHT * 0.4,
    marginTop: 25,
    width: WIDTH,
    alignSelf: 'center',
  },
  locationText: {
    width: WIDTH * 0.8,
    backgroundColor: yellow,
    alignItems: 'center',
    fontSize: 18,
    marginTop: 10,
    padding: 5,
    borderRadius: 20,
    color: black,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnAction: {
    alignSelf: 'center',
    width: WIDTH * 0.8,
    alignItems: 'center',
    marginTop: HEIGHT * 0.1,
    backgroundColor: yellow,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 8,
    elevation: 4,
  },
  modalBtn: {
    width: '90%',
    backgroundColor: black,
    padding: 10,
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  btnText: {
    color: black,
    fontSize: 18,
    padding: 10,
    fontWeight: '700',
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
  iconContainerMenu: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: WIDTH,
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
    color: white,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ETAScreen;

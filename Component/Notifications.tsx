import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import Modal from 'react-native-modal';

import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WIDTH} from '../Constants/Dimensions';
import Icon from 'react-native-vector-icons/Foundation';

import {black, red, white, yellow} from '../Constants/ColorScheme';
import CurrentNotificationContext from '../Context/CurrentNotificationContext';
import {MAPROUTERSCREEN} from '../Constants/Navigations';
import {navigateToRouteWithReset} from '../Utils/navigateTo';
import {NOTIFICATION_ACCEPTED} from '../Constants/Status';

interface NotificationsProp {
  notifications: any[];
  navigation: StackNavigationProp<ParamListBase, string>;
  setSelectedRegion: () => void;
}
interface NotificationProp {
  notifcation: any;
  index: number;
  setSelectedRegion: () => void;
  navigation: StackNavigationProp<ParamListBase, string>;
}
interface GetServiceProp {
  serviceType: string;
}

const Notifications = (props: NotificationsProp) => {
  const animVal = new Animated.Value(0);

  return (
    <ScrollView
      horizontal
      style={notificationStyle.notificationsContent}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: animVal}}}], {
        useNativeDriver: false,
      })}>
      {props.notifications.map((item: any, index: number) => (
        <NotificationItem
          notifcation={item}
          index={index}
          key={index}
          setSelectedRegion={props.setSelectedRegion}
          navigation={props.navigation}
        />
      ))}
    </ScrollView>
  );
};

const notificationStyle = StyleSheet.create({
  notificationsContent: {
    height: '100%',
    margin: 10,
    flex: 1,
  },
  notificationContent: {
    backgroundColor: yellow,
    width: WIDTH - 20,
    height: '100%',
    borderRadius: 5,
    padding: 5,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoIconButton: {
    height: 28,
    width: 28,
    padding: 2,
  },
  titleText: {
    fontSize: 20,
    color: black,
    fontWeight: '500',
  },
  subText: {
    fontSize: 16,
    color: black,
    fontWeight: '400',
  },
  actionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    marginTop: 20,
    marginBottom: 10,
  },
  acceptBtn: {
    backgroundColor: black,
    width: '40%',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  rejectBtn: {
    backgroundColor: red,
    borderRadius: 5,
    width: '40%',
    paddingVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  btnText: {
    color: white,
    fontSize: 14,
    fontWeight: '500',
  },
  modalContent: {
    padding: 5,
    backgroundColor: yellow,
    borderRadius: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '500',
    color: black,
  },
  modalSubTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: black,
    marginBottom: 4,
  },
  modalText: {
    marginVertical: 1,
    fontSize: 14,
    fontWeight: '500',
    color: black,
  },
  acceptText: {
    fontSize: 18,
    color: black,
    fontWeight: '400',
    paddingVertical: 10,
  },
});
const NotificationItem = (prop: NotificationProp) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [acceptModal, setAcceptModal] = useState<boolean>(false);
  const {currentNotification, setCurrentNotification} = useContext(
    CurrentNotificationContext,
  );
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const openAcceptModal = () => {
    setAcceptModal(true);
  };
  const closeAcceptModal = () => {
    setAcceptModal(false);
  };

  const acceptRequest = () => {
    setCurrentNotification({
      ...currentNotification,
      ...prop.notifcation,
      stepsToNavigate: MAPROUTERSCREEN,
      fixitStatus: NOTIFICATION_ACCEPTED,
    });
    navigateToRouteWithReset(MAPROUTERSCREEN, prop.navigation);
  };
  return (
    <View style={notificationStyle.notificationContent}>
      {acceptModal && (
        <Modal isVisible={acceptModal} onBackdropPress={closeAcceptModal}>
          <View style={notificationStyle.modalContent}>
            <Text style={notificationStyle.acceptText}>
              Do you wish to accept this request?
            </Text>
            <View style={notificationStyle.actionGroup}>
              <TouchableOpacity
                style={notificationStyle.acceptBtn}
                onPress={acceptRequest}>
                <Text style={notificationStyle.btnText}>Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity style={notificationStyle.rejectBtn}>
                <Text style={notificationStyle.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      {showModal && (
        <Modal isVisible={showModal} onBackdropPress={closeModal}>
          <View style={notificationStyle.modalContent}>
            <Text style={notificationStyle.modalHeader}>
              Serivce:{' '}
              <GetServiceType serviceType={prop.notifcation.serviceType} />
            </Text>
            <Text style={notificationStyle.modalSubTitle}>
              Vehicle Details:
            </Text>
            <Text style={notificationStyle.modalText}>
              Vehicle Number: {prop.notifcation.vehicleNumber}
            </Text>
            <Text style={notificationStyle.modalText}>
              Owner: {prop.notifcation.userName}
            </Text>
            <Text style={notificationStyle.modalText}>
              {prop.notifcation.Description}
            </Text>
          </View>
        </Modal>
      )}
      <View style={notificationStyle.topContent}>
        <View>
          <Text style={notificationStyle.titleText}>
            {prop.notifcation.serviceType}
          </Text>
          <Text style={notificationStyle.subText}>
            {prop.notifcation.userName}
          </Text>
        </View>
        <TouchableOpacity
          style={notificationStyle.infoIconButton}
          onPress={openModal}>
          <Icon name="info" color={black} size={22} />
        </TouchableOpacity>
      </View>

      <View style={notificationStyle.actionGroup}>
        <TouchableOpacity
          style={notificationStyle.acceptBtn}
          onPress={openAcceptModal}>
          <Text style={notificationStyle.btnText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={notificationStyle.rejectBtn}>
          <Text style={notificationStyle.btnText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GetServiceType = (prop: GetServiceProp) => {
  switch (prop.serviceType) {
    case 'CarService':
      return 'Car Service';
    case 'BikeService':
      return 'Bike Service';
    case 'TowService':
      return 'Tow Service';
    default:
      return '';
  }
};
export default Notifications;

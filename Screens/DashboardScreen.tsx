import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import globalStyles from '../Styles/globalStyles';
import Map from '../Component/Map';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {black, white} from '../Constants/ColorScheme';
import {HEIGHT, WIDTH} from '../Constants/Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';

interface DashboardScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const DashboardScreen = (props: DashboardScreenProps) => {
  const [userStatus, setUserStatus] = useState<boolean>(true);
  return (
    <View style={globalStyles.screenContainer}>
      <View style={dashboardStyles.iconContainer}>
        <Icon name="align-justify" color={black} size={24} />
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
      <View
        style={[globalStyles.screenSection, dashboardStyles.dashboardContent]}>
        <View style={dashboardStyles.headerSection}>
          <Icon name="circle" color="green" />
          <Text style={dashboardStyles.headerTitle}>Place Name</Text>
        </View>
        <Map
          latitude={37.78825}
          longitude={-122.4324}
          navigation={props.navigation}
        />
      </View>
    </View>
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
});
export default DashboardScreen;

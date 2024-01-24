import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles from '../Styles/globalStyles';
import {black, blue, white, yellow} from '../Constants/ColorScheme';
import {navigateToRouteWithReset} from '../Utils/navigateTo';
import {DASHBOARDSCREEN} from '../Constants/Navigations';

interface LoginScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const LoginScreen = (props: LoginScreenProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const handleLogin = () => {
    setTimeout(() => {
      navigateToRouteWithReset(DASHBOARDSCREEN, props.navigation);
    });
  };
  return (
    <View style={globalStyles.screenContainer}>
      <View style={[globalStyles.screenSection, loginStyles.loginSection]}>
        <Text style={loginStyles.titleTextStyle}>
          Continue with Mobile Number
        </Text>
        <Text style={loginStyles.textStyle}>
          OTP will be sent to the number
        </Text>
        <TextInput
          style={loginStyles.inputStyle}
          defaultValue={'+91'}
          keyboardType="phone-pad"
          // onChangeText={(number: any) => {
          //   this.setState({ phoneNumber: number });
          //   console.log(this.state.phoneNumber);
          // }}
        />
        <TouchableOpacity style={loginStyles.buttonStyle} onPress={handleLogin}>
          <Text style={loginStyles.buttonTextStyle}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const loginStyles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: yellow,
    width: '100%',
    height: '100%',
  },
  loginSection: {
    backgroundColor: white,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  inputStyle: {
    marginTop: 25,
    backgroundColor: white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    padding: 10,
    fontSize: 18,
    color: black,
    height: 50,
    width: '90%',
    fontWeight: 'bold',
  },

  buttonStyle: {
    backgroundColor: yellow,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    marginLeft: 20,
    marginBottom: 40,
    flex: 1,
    width: '100%',
    borderRadius: 5,
    elevation: 6,
    padding: 10,
  },
  buttonTextStyle: {
    color: black,
    fontWeight: '500',
    fontSize: 18,
  },
  otpView: {
    width: '80%',
    height: 200,
    color: black,
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: black,
  },
  textStyle: {
    fontSize: 14,
    color: black,
  },
  resendLinkText: {
    paddingLeft: '80%',
    color: blue,
    fontSize: 16,
  },
});

export default LoginScreen;

import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import globalStyles from '../Styles/globalStyles';
import {black, blue, white, yellow} from '../Constants/ColorScheme';
import {navigateToRouteWithReset} from '../Utils/navigateTo';
import {DASHBOARDSCREEN} from '../Constants/Navigations';
import OTPField from '../Component/OTPField';
import {requestLocationPermission} from '../Utils/requests';
import {validatePhoneNumber} from '../Utils/global';

interface LoginScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const LoginScreen = (props: LoginScreenProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [stepsForLogin, setStepsForLogin] = useState<number>(0);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [otpToVerify, setOtpToVerify] = useState<string>('');

  const handleLogin = () => {
    console.log("Phone number:", phoneNumber); 
    if(validatePhoneNumber(phoneNumber)){
      setStepsForLogin(1);
    }
    else{
      ToastAndroid.show('Invalid Phone Number',ToastAndroid.SHORT);
    }
  };
  const handleOTP = async () => {
    setStepsForLogin(2);
    const locationPermissionGranted = await requestLocationPermission();
    if (locationPermissionGranted) {
      navigateToRouteWithReset(DASHBOARDSCREEN, props.navigation);
      ToastAndroid.show('OTP Verified',ToastAndroid.SHORT);
    } else {
      Alert.alert(
        'Enable Location',
        'Enable location for this app from settings',
        [
          {
            text: 'OK',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  const handleResendClick = () => {
    if (!isResendDisabled) {
      setIsTimerVisible(true);
      setIsResendDisabled(true);
      setTimer(30);
    }
    // const timeLeft = timer;
    Alert.alert(
      'Wait until sending otp',
      `Please wait for 30 seconds before trying again.`,
      [
        {
          text: 'OK',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isTimerVisible) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            clearInterval(interval);
            setIsTimerVisible(false);
            setIsResendDisabled(false);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerVisible]);

  switch (stepsForLogin) {
    case 0:
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
              onChangeText={(number) => {
                setPhoneNumber(number);
                // console.log(number);
              }}
            />
            <TouchableOpacity
              style={loginStyles.buttonStyle}
              onPress={handleLogin}>
              <Text style={loginStyles.buttonTextStyle}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    case 1:
      return (
        <View style={globalStyles.screenContainer}>
          <View style={[globalStyles.screenSection, loginStyles.loginSection]}>
            <Text style={loginStyles.titleTextStyle}>Enter the OTP</Text>
            <Text style={loginStyles.textStyle}>
              We have sent an OTP to +91 999999999
            </Text>
            <OTPField
              otp={otpToVerify}
              setOtp={(otp: any) => {
                setOtpToVerify(otp);
              }}
            />
            <View style={loginStyles.container}>
              <TouchableOpacity
                style={loginStyles.resendButton}
                onPress={handleResendClick}
                disabled={isResendDisabled}>
                <Text
                  style={[
                    loginStyles.resendText,
                    {color: isResendDisabled ? 'gray' : 'blue'},
                  ]}>
                  {isTimerVisible ? `Resend OTP` : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={loginStyles.buttonStyle}
              onPress={handleOTP}>
              <Text style={loginStyles.buttonTextStyle}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
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
  container: {
    alignSelf: 'flex-end',
  },
  resendButton: {
    // paddingTop: 10,
    paddingEnd: 20,
  },
  resendText: {
    color: 'blue',
    // alignSelf: 'flex-end',
  },
  errorMessageContainer: {
    marginTop: 0,
    padding: 10,
    marginEnd: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  errorMessageText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginScreen;

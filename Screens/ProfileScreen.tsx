import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ToastAndroid,
  Image,
} from 'react-native';
import {black, white, yellow, lightGray} from '../Constants/ColorScheme';
import globalStyles from '../Styles/globalStyles';
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Model from '../Component/Model';
import {HEIGHT, WIDTH} from '../Constants/Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker, {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

interface ProfileProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const Profile = (props: ProfileProps) => {
  const [modalDrawer, setModalDrawer] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [workshopName, setWorkshopName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [serviceCategory, setServiceCategory] = useState<string>('');
  const [workshopAddress, setWorkshopAddress] = useState<string>('');
  const [isSelected, setSelection] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleOpenModal = () => {
    setModalDrawer(true);
  };

  const toggleDrawer = () => {
    setModalDrawer(!modalDrawer);
  };
  const launchImageGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        ToastAndroid.show(
          'User has canncelled the process',
          ToastAndroid.SHORT,
        );
      } else if (response.errorCode) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      } else {
        setProfileImage(response.assets?.[0].uri as string);
      }
    });
  };

  const handleSubmit = () => {
    // Perform your submit logic here
    console.log('Submitted:', {
      name,
      workshopName,
      mobileNumber,
      serviceCategory,
      workshopAddress,
    });
  };

  return (
    <>
      <ScrollView style={globalStyles.screenContainer}>
        <Model
          modalDrawer={modalDrawer}
          toggleDrawer={toggleDrawer}
          navigation={props.navigation}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleOpenModal}>
            <Icon name="align-justify" color={black} size={24} />
          </TouchableOpacity>
        </View>
        <View style={[globalStyles.screenSection, styles.loginSection]}>
          <TouchableOpacity
            onPress={launchImageGallery}
            style={styles.profileIconContainer}>
            {!profileImage ? (
              <Icon name="user" color={yellow} size={70} />
            ) : (
              <Image source={{uri: profileImage}} resizeMode="contain" />
            )}
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              // placeholder="Enter your name"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Workshop Name</Text>
            <TextInput
              style={styles.input}
              // placeholder="Workshop Name"
              value={workshopName}
              onChangeText={text => setWorkshopName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              // placeholder="Mobile Number"
              value={mobileNumber}
              onChangeText={text => setMobileNumber(text)}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Service Category</Text>
            <TextInput
              style={styles.input}
              // placeholder="Service Category"
              value={serviceCategory}
              onChangeText={text => setServiceCategory(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Workshop Address</Text>
            <TextInput
              // row={2}
              numberOfLines={4}
              multiline={true}
              style={styles.inputWorkshopAddress}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={workshopAddress}
              onChangeText={text => setWorkshopAddress(text)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <View>
              <Text style={styles.checkboxText}>Privacy Policy</Text>
            </View>
            <View>
              <Text style={styles.checkboxText}>Terms & conditions</Text>
            </View>
          </View>
          <View style={styles.mechanicIdContainer}>
            <Text style={styles.mechanicIdText}>Mechanic ID: XXXXXXXX</Text>
          </View>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
            <Text style={styles.buttonTextStyle}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  loginSection: {
    backgroundColor: white,
    // flex:1,
    height: HEIGHT * 0.828,
  },
  profileIconContainer: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    marginBottom: 30,
    alignItems: 'center',
    height: 80,
    width: 80,
    alignSelf: 'center',
    // marginBottom:10
  },
  inputContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: WIDTH,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: black,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 36,
    width: 200,
    borderColor: lightGray,
    borderWidth: 1,
    backgroundColor: lightGray,
    fontSize: 16,
    fontWeight: '600',
    color: black,
    padding: 4,
    borderRadius: 4,
  },
  inputWorkshopAddress:{
    // height: 36,
    width: 200,
    borderColor: lightGray,
    borderWidth: 1,
    backgroundColor: lightGray,
    fontSize: 16,
    fontWeight: '600',
    color: black,
    padding: 4,
    borderRadius: 4,
    textAlignVertical:'top',
  },

  checkbox: {
    alignSelf: 'center',
  },
  checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  checkboxText: {
    fontSize: 14,
    color: 'black',
  },
  mechanicIdContainer: {
    borderWidth: 1,
    borderColor: black,
    borderRadius: 20,
    padding: 8,
    marginBottom: 16,
    alignItems: 'center',
    // marginTop:16,
  },
  mechanicIdText: {
    fontSize: 16,
    color: black,
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: yellow,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    bottom:40,
    // marginBottom: 10,
    width: WIDTH * 0.8,
    padding: 10,
    borderRadius: 5,
    elevation: 6,
    alignSelf: 'center',
    // marginTop: 100,
  },
  buttonTextStyle: {
    color: black,
    fontWeight: '500',
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Profile;

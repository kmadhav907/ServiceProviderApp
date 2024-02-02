import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { black, white, yellow, lightGray } from '../Constants/ColorScheme';
import globalStyles from '../Styles/globalStyles';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Model from './Model';
import { WIDTH } from '../Constants/Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
// import { navigateToRouteWithoutReset } from '../Utils/navigateTo';
// import { DASHBOARDSCREEN } from '../Constants/Navigations';

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
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const {navigation} = props;

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

    const handleSubmit = () => {
        // Perform your submit logic here
        console.log('Submitted:', { name, workshopName, mobileNumber, serviceCategory, workshopAddress });
    };
    
    return (
        <>
            <View style={globalStyles.screenContainer}>
                <Model modalDrawer={modalDrawer} toggleDrawer={toggleDrawer} navigation={props.navigation} />
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleOpenModal}>
                        <Icon name="align-justify" color={black} size={24} />
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.screenSection, styles.loginSection]}>
                    {/* <Text style={styles.title}>Profile Information</Text> */}
                    <View style={styles.profileIconContainer}>
                        <Icon name="user" color={yellow} size={70} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            // placeholder="Enter your name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Workshop Name</Text>
                        <TextInput
                            style={styles.input}
                            // placeholder="Workshop Name"
                            value={workshopName}
                            onChangeText={(text) => setWorkshopName(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput
                            style={styles.input}
                            // placeholder="Mobile Number"
                            value={mobileNumber}
                            onChangeText={(text) => setMobileNumber(text)}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Service Category</Text>
                        <TextInput
                            style={styles.input}
                            // placeholder="Service Category"
                            value={serviceCategory}
                            onChangeText={(text) => setServiceCategory(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Workshop Address</Text>
                        <TextInput
                            // style={styles.input}
                            style={styles.input}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            // placeholder="Workshop Address"
                            value={workshopAddress}
                            onChangeText={(text) => setWorkshopAddress(text)}
                        />
                    </View>
                    <View style={styles.checkboxContainer}>
                        {/* Add your Privacy Policy and Terms and Conditions checkbox here */}
                        <View>        
                            {/* <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                            /> */}
                            <Text style={styles.checkboxText}>Privacy Policy</Text>
                        </View>
                        <View><Text style={styles.checkboxText}>Terms & conditions</Text></View>
                    </View>
                    <View style={styles.mechanicIdContainer}>
                        <Text style={styles.mechanicIdText}>Mechanic ID: XXXXXXXX</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
                        <Text style={styles.buttonTextStyle}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ---- add left swipe - when user swipes left it should go back to previous screen
                ---- if any of the field is not empty  and user press back then show dialog box 'that are you sure you want to go back ' and if user press okay
                ---- if user clicks on image show file system and user selects any image it should get uploaded and be shown instead of the icon inside the container it seems
            */}
        </>
    );
};

const styles = StyleSheet.create({
    loginSection: {
        backgroundColor: white,
    },
    profileIconContainer: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 12,
        marginBottom: 30,
        alignItems:'center',
        height:80,
        width:80,
        alignSelf:'center',
        // marginBottom:10
    },
    inputContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight:'bold',
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
        width:200,
        borderColor: lightGray,
        borderWidth: 1,
        backgroundColor: lightGray,
        // color:'white',
        fontSize:16,
        fontWeight:'400',
        // marginBottom: 16,
        // paddingLeft: 8,
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkboxContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'flex-start',
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
        alignItems:'center',
        // marginTop:16,
    },
    mechanicIdText: {
        fontSize: 16,
        color: black,
        fontWeight:'bold',
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

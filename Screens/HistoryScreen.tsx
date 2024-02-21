import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import globalStyles from '../Styles/globalStyles'
import Model from '../Component/Model'
import { HEIGHT, WIDTH } from '../Constants/Dimensions'
import { black, lightGray, red, white, yellow } from '../Constants/ColorScheme'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StackNavigationProp } from '@react-navigation/stack'
import { ParamListBase } from '@react-navigation/native'
import { historyNotifications } from '../Constants/Data'

interface HistoryProps {
    navigation: StackNavigationProp<ParamListBase, string>;
  }

const HistoryScreen = (props: HistoryProps) => {
    const [modalDrawer, setModalDrawer] = useState<boolean>(false);

    const handleOpenModal = () => {
        setModalDrawer(true);
      };
    
      const toggleDrawer = () => {
        setModalDrawer(!modalDrawer);
      };

    return (
        <ScrollView style={globalStyles.screenContainer}>
        <Model
          modalDrawer={modalDrawer}
          toggleDrawer={toggleDrawer}
          navigation={props.navigation}
        />
        <View style={styles.topContainer}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleOpenModal}>
                    <Icon name="align-justify" color={black} size={24} />
                </TouchableOpacity>
            </View>
            <View style={styles.historyHeaderContainer}>
                <Text style={styles.historyHeaderText}>History</Text>
            </View>
        </View>
        <View style={[globalStyles.screenSection, styles.loginSection]}>
                {historyNotifications[0].map((notification, index) => (
                    <View
                    key={index}
                    style={[
                        styles.notificationContainer,
                        { backgroundColor: notification.flag ? white : red }
                    ]}
                    >
                    <Text style ={[styles.userName, {color:notification.flag ? black : white} ]}>{notification.name}</Text>
                    <Text style ={[styles.userService, {color:notification.flag ? black : white} ]}>{notification["Service Type"]}</Text>
                    <View style={styles.dateAndAmount}>
                        <Text style ={[styles.date, {color:notification.flag ? black : white} ]}>{notification.date}</Text>
                        {notification.flag ? (
                            <Text style={[styles.amount, { color: 'black' }]}>Rs {notification.amount}</Text>
                            ) : null}
                    </View>
                    </View>
                ))}
        </View>
      </ScrollView>
    )
}

// history screen -> same containers , if accepted show white rectangle else red - done
// if user clicks on history/profile/icon -> disable once it enters the screen 
// validation of phone number , that valid phone number should only enter next navigation - done
// otp message ke baad toast message dalne ka bidu - done
const styles = StyleSheet.create({
    userName:{
        fontSize:20,
        fontWeight:'bold'
    },
    dateAndAmount:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    userService:{
        fontSize:18,
    },
    date:{
        fontSize:18,
    },
    amount:{
        fontSize:22,
        fontWeight:'500'
    },
    loginSection: {
      backgroundColor: white,
    },
    iconContainer: {
    //   position: 'absolute',
      padding: 10,
    //   width: WIDTH,
    },
    topContainer:{
        flexDirection: 'row',
        top: 20,
    },
    historyHeaderContainer:{
        flex:1,
        alignItems:'center',
    },
    historyHeaderText:{
        fontSize:30,
        fontWeight:'bold',
        color:black,
        textAlign: 'center', 
    },
      notificationContainer: {
        alignSelf: 'center',
        width: '90%',
        padding: 10,
        margin:20,
        marginVertical: 10,
        borderRadius: 10,
        // borderWidth:2
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 4,
      },
  });

export default HistoryScreen
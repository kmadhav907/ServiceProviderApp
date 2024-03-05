import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../Styles/globalStyles';
import {black, white} from '../Constants/ColorScheme';
import Model from '../Component/Model';
import {HEIGHT, WIDTH} from '../Constants/Dimensions';
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeedbackContext from '../Context/FeedbackContext';
import {AirbnbRating} from 'react-native-ratings';

interface FeedbackProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}
const FeedbackScreen = (props: FeedbackProps) => {
  const [modalDrawer, setModalDrawer] = useState<boolean>(false);
  const {feedback, setSelectedFeedback} = useContext(FeedbackContext);
  console.log(feedback);
  const handleOpenModal = () => {
    setModalDrawer(true);
  };
  const [ratingPoints, setRatingPoints] = useState<number>(() => {
    return Math.floor(Math.random() * 5) + 1;
  });

  const toggleDrawer = () => {
    setModalDrawer(!modalDrawer);
  };
  return (
    <View style={[globalStyles.screenContainer, {backgroundColor: white}]}>
      <View style={styles.iconContainer}>
        <Model
          modalDrawer={modalDrawer}
          toggleDrawer={toggleDrawer}
          navigation={props.navigation}
        />
        <View style={styles.iconContainerMenu}>
          <TouchableOpacity onPress={handleOpenModal}>
            <Icon name="align-justify" color={black} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Feedback</Text>
        <View style={styles.feedbackContent}>
          <Text style={styles.feedbackText}>Feedback By:</Text>
          <Text style={styles.feedbackTextTitle}>{feedback.name}</Text>
        </View>
        <View style={styles.feedbackContent}>
          <Text style={styles.feedbackText}>Feedback for:</Text>
          <Text
            style={[styles.feedbackTextTitle, {textTransform: 'capitalize'}]}>
            {feedback.serviceType}
          </Text>
        </View>
        <View style={styles.feedbackContent}>
          <Text style={styles.feedbackText}>Amount:</Text>
          <Text
            style={[styles.feedbackTextTitle, {textTransform: 'capitalize'}]}>
            {feedback.amount}
          </Text>
        </View>
        <AirbnbRating
          count={5}
          defaultRating={ratingPoints}
          size={50}
          isDisabled
        />
        <Text style={styles.feedbackDescription}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, quos
          tempora. Ex optio earum, nam modi maxime pariatur quaerat adipisci
          eveniet numquam consequatur, incidunt, id deleniti officiis possimus
          laudantium architecto!
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
  headerContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: HEIGHT / 9,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: black,
    textAlign: 'center',
  },
  feedbackText: {
    fontSize: 18,
    color: black,
  },
  feedbackDescription: {
    marginTop: 15,
    width: WIDTH * 0.9,
    fontSize: 14,
    color: black,
  },
  feedbackContent: {
    width: WIDTH * 0.9,
    flexDirection: 'row',
    marginTop: 6,
    padding: 10,
    alignItems: 'baseline',
  },
  feedbackTextTitle: {
    fontSize: 18,
    color: black,
    fontWeight: '700',
    marginLeft: 10,
  },
});

export default FeedbackScreen;

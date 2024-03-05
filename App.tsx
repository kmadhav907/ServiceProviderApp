import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Navigators from './Navigators/Navigations';
import CurrentNotificationContext from './Context/CurrentNotificationContext';
import {NO_NOTIFICATION_SELECTED} from './Constants/Status';
import FeedbackContext from './Context/FeedbackContext';

const App = () => {
  const [currentNotification, setCurrentNotification] = useState({
    stepsToNavigate: '',
    latitude: 0,
    longitude: 0,
    fixitStatus: NO_NOTIFICATION_SELECTED,
    etaTime: null,
  });
  const [feedback, setFeedback] = useState({
    selectedFeedback: {},
    name: '',
    serviceType: '',
    amount: -1,
  });
  return (
    <KeyboardAvoidingView
      style={styles.backgroundStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <CurrentNotificationContext.Provider
        value={{
          currentNotification,
          setCurrentNotification,
        }}>
        <FeedbackContext.Provider
          value={{feedback, setSelectedFeedback: setFeedback}}>
          <SafeAreaView style={styles.container}>
            <Navigators />
          </SafeAreaView>
        </FeedbackContext.Provider>
      </CurrentNotificationContext.Provider>
    </KeyboardAvoidingView>
  );
};
const styles: any = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  container: {
    height: '100%',
    width: '100%',
  },
});
export default App;

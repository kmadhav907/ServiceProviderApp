import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../Screens/SplashScreen';
import DashboardScreen from '../Screens/DashboardScreen';
import LoginScreen from '../Screens/LoginScreen';
import {
  DASHBOARDSCREEN,
  LOGINSCREEN,
  SPLASHSCREEN,
} from '../Constants/Navigations';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
const Stack = createStackNavigator<ParamListBase>();

function Navigators() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SPLASHSCREEN}>
        <Stack.Screen
          name={SPLASHSCREEN}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={DASHBOARDSCREEN}
          component={DashboardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={LOGINSCREEN}
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigators;

import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../Screens/SplashScreen';
import DashboardScreen from '../Screens/DashboardScreen';
import LoginScreen from '../Screens/LoginScreen';
import MapRouteScreen from '../Screens/MapRouteScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import {
  DASHBOARDSCREEN,
  ETASCREEN,
  LOGINSCREEN,
  MAPROUTERSCREEN,
  SPLASHSCREEN,
  PROFILESCREEN,
} from '../Constants/Navigations';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import ETAScreen from '../Screens/ETAScreen';

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
        <Stack.Screen
          name={MAPROUTERSCREEN}
          component={MapRouteScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ETASCREEN}
          component={ETAScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={PROFILESCREEN}
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigators;

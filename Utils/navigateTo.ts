import {CommonActions} from '@react-navigation/native';

export const navigateToRouteWithoutReset = (
  routeName: string,
  navigation: any,
) => {
  navigation.navigate(routeName);
};

export const navigateToRouteWithReset = (
  routeName: string,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName}],
    }),
  );
};

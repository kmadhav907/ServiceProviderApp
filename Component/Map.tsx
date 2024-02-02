import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  HEIGHT,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  WIDTH,
} from '../Constants/Dimensions';
import {black, red} from '../Constants/ColorScheme';
import Icon from 'react-native-vector-icons/FontAwesome';

interface MapProps {
  latitude: number;
  longitude: number;
  navigation: StackNavigationProp<ParamListBase, string>;
}
const Map = (props: MapProps) => {
  const mapViewRef = useRef<MapView>(null);
  const recenterTheLocation = () => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        latitude: props.latitude,
        longitude: props.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  };
  return (
    <SafeAreaView style={mapStyles.mapContainer}>
      <View style={mapStyles.actionGroup}>
        <TouchableOpacity
          style={mapStyles.recenterBtn}
          onPress={recenterTheLocation}>
          <Icon name="send" color={red} size={20} />
        </TouchableOpacity>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapViewRef}
        zoomEnabled={true}
        style={mapStyles.mapContent}
        initialRegion={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        zoomControlEnabled={false}>
        <Marker
          coordinate={{
            latitude: props.latitude,
            longitude: props.longitude,
          }}></Marker>
      </MapView>
    </SafeAreaView>
  );
};
const mapStyles = StyleSheet.create({
  mapContainer: {
    height: '100%',
    width: WIDTH,
    flex: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  mapContent: {
    height: '100%',
    width: '100%',
  },
  recenterBtn: {
    alignSelf: 'flex-end',
    padding: 10,
    zIndex: 1,
  },
  actionGroup: {
    position: 'relative',
    top: 50,
    right: 20,
  },
});

export default Map;

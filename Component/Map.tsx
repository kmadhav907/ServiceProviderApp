import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  HEIGHT,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  WIDTH,
} from '../Constants/Dimensions';

interface MapProps {
  latitude: number;
  longitude: number;
  navigation: StackNavigationProp<ParamListBase, string>;
}
const Map = (props: MapProps) => {
  return (
    <SafeAreaView style={mapStyles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        style={mapStyles.mapContent}
        initialRegion={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        zoomControlEnabled={false}>
        <Marker coordinate={{
          latitude: props.latitude,
          longitude: props.longitude,
        }}>
        </Marker>
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
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
  },
  mapContent: {
    height: '100%',
    width: '100%',
  },
});

export default Map;

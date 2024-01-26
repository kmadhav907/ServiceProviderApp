import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;
interface OTPFieldProps {
  otp: string;
  setOtp: any;
}
const OTPField = (props: OTPFieldProps) => {
  const ref: any = useBlurOnFulfill({value: props.otp, cellCount: CELL_COUNT});
  const [properties, getCellOnLayoutHandler] = useClearByFocusCell({
    value: props.otp,
    setValue: props.setOtp,
  });

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...properties}
        value={props.otp}
        onChangeText={props.setOtp}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {minHeight: 80, paddingTop: 10,paddingEnd:20 , marginTop: 0},
  title: {textAlign: 'center', fontSize: 30, color: 'black'},
  codeFiledRoot: {
    marginTop: 0,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 35,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  cellText: {
    color: '#000',
    fontSize: 32,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
});

export default OTPField;

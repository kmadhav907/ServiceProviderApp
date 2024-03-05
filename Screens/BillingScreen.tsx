import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles from '../Styles/globalStyles';
import {ScrollView} from 'react-native-gesture-handler';
import {HEIGHT, WIDTH} from '../Constants/Dimensions';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {black, blue, lightGray, red, yellow} from '../Constants/ColorScheme';
import {ExpenseItem} from '../Types/GeneralTypes';
import {PLATFORM_FEE} from '../Constants/Genreal';

interface BillingProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const BillingScreen = (props: BillingProps) => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    {description: '', cost: ''},
  ]);
  const onDelete = (index: number) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };

  const onUpdate = (
    index: number,
    field: 'description' | 'cost',
    value: string,
  ) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  const onAddRow = () => {
    setExpenses([...expenses, {description: '', cost: ''}]);
  };

  const CalculateSubTotal = () => {
    return expenses.reduce((total, expense) => {
      return total + (parseFloat(expense.cost) || 0);
    }, 0);
  };

  const CalculateTotal = () => {
    const subTotal = CalculateSubTotal();
    const serviceCharge = subTotal * PLATFORM_FEE;
    return subTotal + serviceCharge;
  };

  const handleSubmit = () => {
    // Perform your submit logic here
    console.log('Bill Sent', {CalculateTotal});
  };
  return (
    <>
      <ScrollView style={globalStyles.screenContainer}>
        <View style={billingStyles.headerTextContainer}>
          <Text style={billingStyles.headerText}>Towservice/Bike service</Text>
        </View>
        <View
          style={[globalStyles.screenSection, billingStyles.billingSection]}>
          {expenses.map((expense, index: number) => (
            <View style={billingStyles.row} key={index}>
              <TouchableOpacity onPress={() => onDelete(index)}>
                <Icon name="trash" color={red} size={30} />
              </TouchableOpacity>
              <TextInput
                style={billingStyles.inputDescription}
                placeholder="Description"
                value={expense.description}
                onChangeText={text => onUpdate(index, 'description', text)}
              />
              <TextInput
                style={billingStyles.inputCost}
                placeholder="Cost"
                value={expense.cost}
                onChangeText={text => onUpdate(index, 'cost', text)}
                keyboardType="numeric"
              />
            </View>
          ))}

          <Text style={billingStyles.subTotal}>
            Sub Total: Rs {<CalculateSubTotal />}
          </Text>
          <Text style={billingStyles.serviceText}>Platform Fee : 5%</Text>
          <Text style={billingStyles.total}>
            Total: Rs {<CalculateTotal />}
          </Text>
          <View style={billingStyles.buttonContainer}>
            <TouchableOpacity
              style={billingStyles.buttonStyle}
              onPress={handleSubmit}>
              <Text style={billingStyles.buttonTextStyle}>Send Bill</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onAddRow}
              style={billingStyles.addRowButton}>
              <Icon name="plus" color={blue} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const billingStyles = StyleSheet.create({
  billingSection: {
    backgroundColor: 'white',
    height: HEIGHT * 0.8,
  },
  // billTextContainer:{
  //   alignItems:'center',
  //   marginBottom:20,
  // },
  // billText:{
  //   fontSize:24,
  //   fontWeight:'bold',
  //   color:'black'
  // },
  buttonContainer: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    // paddingHorizontal:10,
    // marginHorizontal:10,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    color: black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputDescription: {
    height: 40,
    width: 220,
    borderColor: lightGray,
    borderWidth: 1,
    backgroundColor: lightGray,
    fontSize: 16,
    fontWeight: '600',
    color: black,
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 4,
  },
  inputCost: {
    height: 40,
    width: 100,
    borderColor: lightGray,
    borderWidth: 1,
    backgroundColor: lightGray,
    fontSize: 16,
    fontWeight: '600',
    color: black,
    padding: 8,
    borderRadius: 4,
  },
  addRowButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTotal: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '500',
    color: black,
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '400',
    color: black,
    alignSelf: 'flex-end',
    paddingRight: 10,
    // color:lightGray,
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: black,
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  buttonStyle: {
    backgroundColor: yellow,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH * 0.3,
    padding: 10,
    borderRadius: 5,
    elevation: 6,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  buttonTextStyle: {
    color: black,
    fontWeight: '500',
    fontSize: 18,
  },
});

export default BillingScreen;

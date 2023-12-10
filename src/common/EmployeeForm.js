import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from './Card'
import { CardSection } from './CardSection'
import Input from './Input'
import { Picker } from '@react-native-picker/picker'

const EmployeeForm = (props) => {
  return (
    <View>
        <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Enter name"
            data={props.name}
            onChange={props.onNameChange}
          />
        </CardSection>
      </Card>

      <Card>
        <CardSection>
          <Input
            label="Phone"
            placeholder="Enter phone number"
            data={props.phone}
            onChange={props.onPhoneChange}
          />
        </CardSection>
      </Card>

      
      <Card>
        <CardSection style={styles.container}>
            
        <Picker
            selectedValue={props.selectedShift}
            onValueChange={(itemValue, itemIndex) => props.onShiftChange(itemValue)}

          >
            <Picker.Item label="Select Shift" value="" />
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
          </Picker>
        </CardSection>
      </Card>
    </View>
  )
}

export default EmployeeForm

const styles = StyleSheet.create({})
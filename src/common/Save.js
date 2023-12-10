import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from '@firebase/firestore';
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../firebaseApp';

export default function Save() {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
function saveData(params) {
  //create data
/**setDoc(doc(db, "testme", "LA"), {
  field1:field1,
  field2:field2,
  field3:field3,
}).then(
  ()=>{
    console.log("added");
  }
).catch((error)=>{
  console.log("Error"+error);
}) */
  
  //add data
/**
 addDoc(collection(db, "testme"), {
  field1:field1,
  field2:field2,
  field3:field3,
}).then(
  ()=>{
    console.log("added");
  }
).catch((error)=>{
  console.log("Error"+error);
});
 
 */
//update
/**
 updateDoc(doc(db, "testme","LA"), {
  field1:field1,
  field2:field2,
  field3:field3,
}).then(
  ()=>{
    console.log("added");
  }
).catch((error)=>{
  console.log("Error"+error);
});
 */
//deleted
/*
deleteDoc(doc(db, "testme","LA"), {
}).then(
  ()=>{
    console.log("deleted");
  }
).catch((error)=>{
  console.log("Error"+error);
});

*/

}
  

  return (
    <View >
      <TextInput placeholder="Field 1" onChangeText={(text) => setField1(text)} />
      <TextInput placeholder="Field 2" onChangeText={(text) => setField2(text)} />
      <TextInput placeholder="Field 3" onChangeText={(text) => setField3(text)} />
      <Button title="Save" onPress={saveData} />
    </View>
  );
}

import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function TabTwoScreen() {

  const goBack = () => {

    router.push("/(tabs)/dashboard");

  };

  //Code for the dropdown menu

  const [openCondition, setOpenCondition] = useState(false);
  const [valueCondition, setValueCondition] = useState(null);
  const [itemsCondition, setItemsCondition] = useState([
    { label: 'Good', value: 'good' },
    { label: 'Fair', value: 'fair' },
    { label: 'Poor', value: 'poor' },
  ]);

  const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState(null);
  const [itemsStatus, setItemsStatus] = useState([
    { label: 'Operational', value: 'operational' },
    { label: 'Not Operational', value: 'not_operational' },
  ]);

  const uploadFiles = () => {
      console.log("User wants to upload some files.");
  };

  const createAudit = () => {
      console.log("User wants to save the data from the inputs");
  };

  const saveDraft = () => {
      console.log("User wants to save the data as a draft");
  };

  const [getData, setData] = useState("");




  return (

    <ScrollView style={styles.mainContainer}>

      <Pressable
              onPress={goBack}
              style={styles.backButtonContainer}>
      
                    <View style={styles.backButton}>
      
                        <Text style={styles.backButtonText}>Back</Text>
                        
                    </View>
      </Pressable>

      <View style={styles.headTitleContainer}>
      
              <Text style={styles.headTitle}>Create new audit</Text>
      
      </View>

      <View style={styles.inputContainer}>

        <Text style={styles.inputText}>Asset name *</Text>

        <TextInput
                  style={styles.input}
                  placeholder="e.g. Rooftop HVAC Unit 1"
                  placeholderTextColor="#919191"
                  //value={email}
                  //onChangeText={setEmail}
                  />

      </View>

      <View style={styles.inputContainer}>

        <Text style={styles.inputText}>Location *</Text>

        <TextInput
                  style={styles.input}
                  placeholder="e.g. Building A, Floor 3"
                  placeholderTextColor="#919191"
                  //value={email}
                  //onChangeText={setEmail}
                  />

      </View>

      <View style={styles.dualInputContainer}>

        <View style={styles.inputContainerDual}>

            <Text style={styles.inputText}>Model</Text>

            <TextInput
                      style={styles.input}
                      placeholder="e.g. XYZ-1000"
                      placeholderTextColor="#919191"
                      //value={email}
                      //onChangeText={setEmail}
                      />

            

        </View>

        <View style={styles.inputContainerDual}>

            <Text style={styles.inputText}>Serial Number</Text>

            <TextInput
                      style={styles.input}
                      placeholder="e.g. SN12345678"
                      placeholderTextColor="#919191"
                      //value={email}
                      //onChangeText={setEmail}
                      />
          
        </View>
        
      </View>

      <View style={styles.dualInputContainer}>

        <View style={styles.inputContainerDual}>

            <Text style={styles.inputText}>Asset Condition *</Text>

            <DropDownPicker
                open={openCondition}
                value={valueCondition}
                items={itemsCondition}
                setOpen={setOpenCondition}
                setValue={setValueCondition}
                setItems={setItemsCondition}
                placeholder="Select Asset Condition"
                style={[{ marginBottom: openCondition ? 160 : 20 }, styles.dropdownMenu]}
              />

        </View>

        <View style={styles.inputContainerDual}>

            <Text style={styles.inputText}>Operational Status *</Text>

            <DropDownPicker
                open={openStatus}
                value={valueStatus}
                items={itemsStatus}
                setOpen={setOpenStatus}
                setValue={setValueStatus}
                setItems={setItemsStatus}
                placeholder="Operational Status"
                //placeholderTextColor="#919191"
                style={[{ marginBottom: openStatus ? 160 : 20 }, styles.dropdownMenu]}
              />
          
        </View>
        
      </View>

      <View style={styles.inputContainer}>

        <Text style={styles.inputText}>Remedial budget ( R )</Text>

        <TextInput
                  style={styles.input}
                  placeholder="e.g. 5000"
                  placeholderTextColor="#919191"
                  //value={email}
                  //onChangeText={setEmail}
                  />

      </View>

      <View style={styles.inputContainer}>

        <Text style={styles.inputText}>Notes & Observations</Text>

        <TextInput
                  style={styles.input}
                  placeholder="Add relevant details about the system..."
                  placeholderTextColor="#919191"
                  //value={email}
                  //onChangeText={setEmail}
                  />

      </View>

      <View style={styles.imagePickerContainer}>

        <Text style={styles.inputText}>Attachments</Text>

        <View style={styles.imagePicker}>

          <Feather name="upload" size={34} color="#919191" style={styles.uploadIcon}/>

          <Text style={styles.imageTextBig}>Drag & drop files here, or click to browse</Text>
          <Text style={styles.imageTextSmall}>Supports PDF, JPG, PNG (max 10MB)</Text>

          <Pressable onPress={uploadFiles}
            style={styles.uploadButton}>
            <Text style={styles.buttonText}>Select Files</Text>
          </Pressable>

        </View>


      </View>

      <Pressable onPress={createAudit} style={styles.createAuditButton}>
      
      
          <Text style={styles.createAuditText}>Create Audit</Text>
      
      
      </Pressable>

      <Pressable onPress={saveDraft} style={styles.saveDraftButton}>
      
      
          <Text style={styles.saveDraftText}>Save as Draft</Text>
      
      
      </Pressable>






    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f4f3f5",
  },
  backButtonContainer: {
    //Back button container
    marginTop: 40,
    marginLeft: 30,
 },
  backButton: {
    //backgroundColor: "#1e88e5",
 },
  backButtonText: {
    color: "#1e88e5",
    fontSize: 16,
 },
 headTitleContainer: {
    //color: "#1e88e5",
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 35,
  },
  headTitle: {
    fontSize: 32,
    color: "#1e88e5",
    fontWeight: "bold",
 },
  inputContainer: {
    width: "90%",
    height: 70,
    display: "flex",
    flexDirection: "column",
    alignSelf : "center",
    justifyContent: "space-evenly",
    marginBottom: 30,
 },
 inputContainerDual: {
    width: "42%",
    height: 70,
    display: "flex",
    flexDirection: "column",
    alignSelf : "center",
    justifyContent: "space-between",
    marginBottom: 30,
 },
  inputText: {
    color: "#373737",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 500,
    paddingLeft: 10,
 },
  input: {
    color: "#000000",
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 0.35,
    height: "80%",
    paddingLeft: 20,
    fontSize: 15,
    textAlignVertical: "center",
    backgroundColor: "#ffffff",
 },
  dualInputContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    //alignSelf: "center",
  },
  dropdownMenu: {
    backgroundColor: "#ffffff",
    borderWidth: 0.35,
    color: "#919191",
    //borderColor: "#ffffff",
  },
  imagePickerContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  imagePicker: {
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#919191",
    paddingVertical: 30,
  },
  imageTextBig: {
    fontSize: 16,
    alignSelf: "center",
    color: "#919191",
    marginBottom: 10,
  },
  imageTextSmall: {
    fontSize: 12,
    alignSelf: "center",
    color: "#919191",
    marginBottom: 10,
  },
  uploadButton: {
    borderColor: "#1e88e5",
    borderRadius: 10,
    borderWidth: 1,
    width: "40%",
    height: 45,
    alignSelf: "center",
    textAlignVertical: "center",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#1e88e5",
    fontSize: 16,
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
  },
  uploadIcon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  createAuditButton: {
    backgroundColor: "#1e88e5",
    color: "#ffffff",
    fontSize: 20,
    width: "80%",
    marginHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    height: 55,
    alignSelf: "center",
  },
  createAuditText: {
    color: "#ffffff",
    fontSize: 20, 
  },
  saveDraftButton: {
    width: "80%",
    marginHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "#1e88e5",
    borderWidth: 1,
    borderRadius: 10,
    height: 55,
    marginBottom: 25,
  },
  saveDraftText: {
    color: "#1e88e5",
    fontSize: 16,
  },
});

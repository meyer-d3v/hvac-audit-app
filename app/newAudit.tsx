import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from 'expo-router';
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import { db } from "../firebase";

export default function TabTwoScreen() {

  const ScrollViewRef = useRef<ScrollView>(null);
  const { auditId } = useLocalSearchParams();
  const [imageArray, setImageArray] = useState<{name: string ; uri: string}[]>([]);
  const arrImages : { name: string; uri: string }[] = [];


  console.log(auditId);

  const goBack = () => {

    alert("You are about to leave the page and data won't be saved.");

    router.push("/(tabs)/new-audit");

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
    { label: 'Not Operational', value: 'not-operational' },
  ]);

  const [equipmentName, setEquipmentName] = useState("");
  //const [location, setLocation] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  //const [assetCondition, setAssetCondition] = useState("");
  //const [status, setStatus] = useState("");
  const equipmentCondition = valueCondition;
  const status = valueStatus;
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState("");

  const clearImageArray = () => {
    setImageArray([]);
  };


  const saveDraft = () => {
      clearImageArray;
      console.log("User wants to go to the dashboard.");
      router.replace("/(tabs)/reports");
      Toast.show({
        type: "info",
        text1: "Success",
        text2: "Report save as 'In Progress'",
      });
  };

  const saveCompleted = async () => {
      console.log("User wants to save the data as a draft");

      const getAudit = doc(db, "audits", Array.isArray(auditId) ? auditId[0] : auditId as string);

      try{

        await updateDoc(getAudit, {
          status: "Completed",
        });
        clearImageArray;

      } catch (error) {
        console.log("Error updating audit to 'completed'.");
        console.log(error);
      }



      router.push("/(tabs)/reports");

  };

  

  const getImage = async () => {

    //const arrayForImages : { imageName: String }[] = [];
    const arrayForImages : { name: any; uri: string }[] = [];

    try{

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        setAttachments(result.assets[0].uri);
        console.log(result.assets[0].uri);

        result.assets.forEach((asset) => {
          console.log(asset.uri); // 👈 this is the image path
          console.log(asset.fileName)
          // You can now upload or display each image
          arrayForImages.push({ name: asset.fileName, uri: asset.uri });

          console.log("arrImage length: " + arrImages.length);
        });
      }

      setImageArray(prev => [...prev, ...arrayForImages]);
      


    } catch (error) {

      Toast.show({
        type: "error",
        text1: "Error uploading image: ",
        text2: (error as Error).toString(),
      })

    }

  }

  const addEquipment = async () => {

    //TODO: add validation, add spinner 

    try{

        await addDoc(collection(db, 'equipment'), {
        'equipmentName': equipmentName.trim(),
        //'location': location,
        'model': model.trim(),
        'serialNumber': serialNumber.trim(),
        'equipmentCondition': equipmentCondition,
        'status': status,
        'budget': budget.trim(),
        'notes': notes.trim(),
        'auditId': auditId,
        //'createdDate': new Date(),
      });

      //const audit = await query(collection(db, "audits"), where("id", "==", auditId));


      Toast.show({
        type: "success",
        text1: "Success",
        text2: equipmentName + " has been successfully added.",
      });
      
      setEquipmentName("");
      //setLocation("");
      setModel("");
      setSerialNumber("");;
      setValueCondition(null);
      setValueStatus(null);
      setBudget("");
      setNotes("");
      //setImageArray([]);
      clearImageArray;
      
      


    } catch (error) {
      console.error("Could not add equipment.");
      console.error("Error: " + error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: equipmentName + " could not be added. Try again.",
      });

    }
  }

  const scrollToTop = () => {
    if (ScrollViewRef.current) {
      ScrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true});
    }
  }




  return (
    <ScrollView style={styles.mainContainer} nestedScrollEnabled={true} ref={ScrollViewRef}>

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

        <Text style={styles.inputText}>Equipment name *</Text>

        <TextInput
                  style={styles.input}
                  placeholder="e.g. Rooftop HVAC Unit 1"
                  placeholderTextColor="#919191"
                  value={equipmentName}
                  onChangeText={setEquipmentName}
                  />

      </View>

      {/* 

      <View style={styles.inputContainer}>

        <Text style={styles.inputText}>Location *</Text>

        <TextInput
                  style={styles.input}
                  placeholder="e.g. Building A, Floor 3"
                  placeholderTextColor="#919191"
                  value={location}
                  onChangeText={setLocation}
                  />

      </View>

      */}

      <View style={styles.dualInputContainer}>

        <View style={styles.inputContainerDual}>

            <Text style={styles.inputText}>Model</Text>

            <TextInput
                      style={styles.input}
                      placeholder="e.g. XYZ-1000"
                      placeholderTextColor="#919191"
                      value={model}
                      onChangeText={setModel}
                      />

            

        </View>

        <View style={styles.inputContainerDual}>

            <Text style={styles.inputText}>Serial Number</Text>

            <TextInput
                      style={styles.input}
                      placeholder="e.g. SN12345678"
                      placeholderTextColor="#919191"
                      value={serialNumber}
                      onChangeText={setSerialNumber}
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
                  value={budget}
                  onChangeText={setBudget}
                  />

      </View>

      <View style={styles.inputContainer}>

        <Text style={styles.inputText}>Notes & Observations</Text>

        <TextInput
                  style={styles.input}
                  placeholder="Add relevant details about the system..."
                  placeholderTextColor="#919191"
                  value={notes}
                  onChangeText={setNotes}
                  />

      </View>

      <View style={styles.imagePickerContainer}>

         
          <Text style={styles.inputText}>Attachments</Text>

          <View style={styles.imagePicker}>

          <Feather name="upload" size={34} color="#919191" style={styles.uploadIcon}/>

          { imageArray.length == 0 ?
          (
          <View>
            <Text style={styles.imageTextBig}>Drag & drop files here, or click to browse</Text>
            <Text style={styles.imageTextSmall}>Supports PDF, JPG, PNG (max 10MB)</Text>
            
          </View>
          ) 
          :
          (<FlatList
            data={imageArray}
            scrollEnabled={false}
            keyExtractor={(item) => item.uri}
            style={styles.flatlistContainer}
            renderItem={({item}) => (

                <Text style={styles.imageNameText}>{item.name}</Text>
         
          )}></FlatList>)}
          
          
           
          

          <Pressable onPress={getImage}
            style={styles.uploadButton}>
            <Text style={styles.buttonText}>Select Files</Text>
          </Pressable>
          </View>

        </View>

        


      <Pressable onPress={() => { addEquipment(); scrollToTop(); }} style={styles.createAuditButton}>
      
      
          <Text style={styles.createAuditText}>Add equipment</Text>
      
      
      </Pressable>

      <Pressable onPress={saveDraft} style={styles.saveDraftButton}>
      
      
          <Text style={styles.saveDraftText}>Save Audit as Draft</Text>
      
      
      </Pressable>

      <Pressable onPress={saveCompleted} style={styles.saveCompletedButton}>
      
      
          <Text style={styles.saveCompletedText}>Finish Audit</Text>
      
      
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
    marginBottom: 40,
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
    fontSize: 16,
    textAlignVertical: "center",
    backgroundColor: "#ffffff",
    flexWrap: "wrap",
    wordWrap: "wrap",
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
    width: "90%",
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
  saveCompletedButton: {
    width: "90%",
    marginHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    //borderColor: "#1e88e5",
    //borderWidth: 1,
    borderRadius: 10,
    height: 55,
    marginBottom: 105,
    backgroundColor: "#02d610",
  },
  saveCompletedText: {
    color: "#ffffff",
    fontSize: 20,
  },
  saveDraftButton: {
    width: "90%",
    marginHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    //borderColor: "#1e88e5",
    backgroundColor: "#FBC02D",
    //borderWidth: 1,
    borderRadius: 10,
    height: 55,
    marginBottom: 20,
  },
  saveDraftText: {
    //color: "#1e88e5",
    color: "#ffffff",
    fontSize: 20,
  },
  flatlistContainer: {
    width: "80%",
    display: "flex",
    //justifyContent: "flex-start",
    textAlign: "left",
    //alignItems: "center",
  },
  imageNameText: {
    color: "#373737",
    fontSize: 14,
    fontWeight: 500,
  }
});

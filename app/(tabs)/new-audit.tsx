import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../firebase";

export default function NewAuditScreen() {

    const [siteName, setSiteName] = useState("");
    const [performedBy, setPerformedBy] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        
        const getDate = async () => {

            const now = await new Date();
            //console.log(now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear());
            const stringDate = now.getDate().toString() + "/" + (now.getMonth() + 1).toString() + "/" + now.getFullYear().toString();
            setDate(stringDate);
        };

        getDate();

    }, []);

    const startAudit = async () => {

        if (siteName.trim() == "" || performedBy.trim() == "" || date.trim() == "") {
            alert("Please enter all fields.");
            return;
        };

        

        try{
            const newAudit = await addDoc(collection(db, "audits"), {
                'auditName': siteName[0] + performedBy[0] + "-" + (new Date().getFullYear()),
                'siteName': siteName,
                'performedBy': performedBy,
                'createdOn': date,
                'status': "In Progress",
            });

            

            setSiteName("");
            setPerformedBy("");

            router.push({
                pathname: "../newAudit",
                params: {auditId: newAudit.id},
            });

            


        } catch (error) {
            console.log("Error trying to start audit.");
            console.log(error);
        }

        

        
    }

    return (

    <SafeAreaView style={styles.mainContainer}>
      

        <View style={styles.headContainer}>
            <Ionicons name="arrow-back" size={32} color="#1e88e5"  style={{width: "20%", paddingLeft: "5%"}}/>
            <Text style={styles.title}>Create New Audit</Text>
        </View>
        

        <View style={styles.newAudit}>

            <Text style={styles.auditInformationText}>Audit Information</Text>

            <View style={styles.inputContainer}>

                <Text style={styles.inputText}>Site Name *</Text>

                <TextInput
                        style={styles.input}
                        placeholder="Enter site name"
                        placeholderTextColor="#919191"
                        value={siteName}
                        onChangeText={setSiteName}
                        />

            </View>

            <View style={styles.inputContainer}>

                <Text style={styles.inputText}>Performed By *</Text>

                <TextInput
                        style={styles.input}
                        placeholder="e.g. Dean Meyer"
                        placeholderTextColor="#919191"
                        value={performedBy}
                        onChangeText={setPerformedBy}
                        />

            </View>

            <View style={styles.inputContainer}>

                <Text style={styles.inputText}>Created On *</Text>

                <TextInput
                        style={styles.input}
                        //placeholder="e.g. Building A, Floor 3"
                        placeholderTextColor="#919191"
                        value={date}
                        onChangeText={setDate}
                        />

            </View>

            <Pressable onPress={startAudit} style={styles.startButton}>

                <Text style={styles.buttonText}>Start Audit</Text>

            </Pressable>

        </View>



        
    </SafeAreaView>
  );

}



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f3f5",
    width: "100%",
    height: "100%",
  },
  headContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    alignSelf: "center",
    color: "#1e88e5",
    display: "flex",
    justifyContent: "center",
    width: "80%",

  },
  newAudit: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 25,
  },
  auditInformationText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#373737",
    marginVertical: 30,
  },
  inputContainer: {
    height: 90,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  inputText: {
    color: "#373737",
    fontSize: 16,
  },
  input: {
    borderColor: "#919191",
    borderWidth: 0.35,
    borderRadius: 5,
    height: "55%",
    paddingHorizontal: 10,
    color: "#000",
  },
  startButton: {
    backgroundColor: "#1e88e5",
    color: "#ffffff",
    fontSize: 20,
    width: "100%",
    marginHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    height: 55,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20, 
    fontWeight: "500",
  },

});


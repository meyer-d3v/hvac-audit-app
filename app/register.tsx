import { useUser } from '@/context/userContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../firebase';

export default function TabTwoScreen() {
  
  const goBack = () => {
    router.replace("/login");
  };

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {

    //TODO: ADD VALIDATION
    const { setUser } = useUser() || {};

    console.log("User: ", name, " is attempting to register.");
    

    try {

      await addDoc(collection(db, 'users'), {
        'firstName': name,
        'lastName': surname,
        'number': number,
        'email': email,
        'password': password,
      });

      if (setUser) {
          setUser({name: name, email: email, number: number});
        }

      
        setName("");
        setSurname("");
        setEmail("");
        setNumber("");
        setPassword("");
        setConfirmPassword("");

      alert("User has been added succesfully.");
      router.push("/loading");

    } catch (error) {
        
        alert("Error: " + error);
    }

  }

  
  


  return (

    <SafeAreaView>
    <ScrollView style={styles.mainContainer}>

      <Pressable
        onPress={goBack}
        style={styles.backButtonContainer}>

              <View>

                  <AntDesign name="back" size={24} color="#1e88e5" />
                  
              </View>
      </Pressable>

      <Text style={styles.registerText}>Register</Text>

      <View style={styles.registerInputContainer}>

        <View style={styles.inputContainers}>
          <Text style={styles.inputContainersText}>Name:</Text>
          <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#919191"
                    value={name}
                    onChangeText={setName}/>
        </View>

        <View style={styles.inputContainers}>
          <Text style={styles.inputContainersText}>Surname:</Text>
          <TextInput
                    style={styles.input}
                    placeholder="Surname"
                    placeholderTextColor="#919191"
                    value={surname}
                    onChangeText={setSurname}/>
        </View>

        <View style={styles.inputContainers}>
          <Text style={styles.inputContainersText}>Phone Number:</Text>
          <TextInput
                    style={styles.input}
                    placeholder="Number"
                    placeholderTextColor="#919191"
                    value={number}
                    onChangeText={setNumber}/>
        </View>

        <View style={styles.inputContainers}>
          <Text style={styles.inputContainersText}>Email:</Text>
          <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#919191"
                    value={email}
                    onChangeText={setEmail}/>
        </View>

        <View style={styles.inputContainers}>
          <Text style={styles.inputContainersText}>Password:</Text>
          <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#919191"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}/>
        </View>

        <View style={styles.inputContainers}>
          <Text style={styles.inputContainersText}>Confirm Password:</Text>
          <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#919191"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}/>
        </View>

        <Pressable onPress={handleRegister} style={styles.buttonContainer}>
        
        
            <Text style={styles.registerButtonText}>Register</Text>
  
  
        </Pressable>

        



      </View>


    </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f4f3f5",
    width: "100%",
    height: "100%",
  },
  backButtonContainer: {
    //Back button container
    marginTop: 40,
    marginHorizontal: 30,
 },
  backButtonText: {
    color: "#1e88e5",
    fontSize: 20,
    borderColor: "#1e88e5",
    borderWidth: 2,
    borderRadius: 10,
    width: 90,
    height: 40, 
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlignVertical: "center",
 },
  registerText: {
    fontSize: 42,
    color: "#1e88e5",
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  registerInputContainer: {
    paddingVertical: 10,
    width: "85%",
    alignSelf: "center",
    
  },
  inputContainers: {
    marginVertical: 10,
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  },
  inputContainersText: {
    color: "#373737",
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 10,
  },
  input: {
    color: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    //marginBottom: 40,
    height: 55,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  buttonContainer: {
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
    marginVertical: 20,
    height: 55,
    alignSelf: "center",
  },
  registerButtonText: {
    color: "#ffffff",
    fontSize: 20, 
  },
});

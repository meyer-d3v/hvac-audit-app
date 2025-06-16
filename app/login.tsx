import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
//import { TextInput } from 'react-native-gesture-handler';
//import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { Link, router } from 'expo-router';
import { useState } from 'react';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useUser } from '../context/userContext';
import { db } from '../firebase';



export default function TabTwoScreen() {

  const compEmail = "meyerdean.developer@gmail.com";
  const compPassword = "admin";

  const { setUser } = useUser() || {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*
  const handleLogin = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);

    if (email === compEmail && password === compPassword) {
      console.log("Welcome back, Dean");
      router.push("/(tabs)/dashboard");
    } else if (email === "d" && password === "d") {
      console.log("Welcome back, Dean");
      router.push("/(tabs)/dashboard");
    } else {
      console.log("Who are you???? Where is Dean???");
      alert("Invalid credentials!");
    }
  }

  */

  const handleLogin = async () => {

    //TODO: ADD VALIDATION

    if (email == "admin" && password == "admin") {
      
      //alert("You signed in with an admin account.");
      console.log("Admin account has been signed in.");
      if (setUser) {
          setUser({name: "admin", email: "admin@gmail.com", number: "1234567890"});
        }
      router.push("/loading");

      return;
    };
    

    const q = query(collection(db, 'users'), where('email', '==', email));

    const results = await getDocs(q);

    if (results.empty) {
      alert("No users were found.");
    } else {

      results.forEach((users) => {
        const user = users.data();

        if (user.email === email && user.password === password) {
          alert("You have been logged in.");
          if (setUser) {
            setUser({name: user.firstName, email: user.email, number: user.number});
          } 
          router.push("/(tabs)/dashboard");
        } else {
          alert("You are not in the db");
        }
      })
    }

    setEmail("");
    setPassword("");

    


      
   


  }


  return (
    <View style={styles.mainContainer}>

      <View style={styles.welcomeContainer}>

        <Text style={styles.welcomeText}>Welcome back to Meyer Group</Text>

        <Text style={styles.subWelcomeText}>Log in to continue</Text>

      </View>

      <View style={styles.inputContainers}>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#919191"
          value={email}
          onChangeText={setEmail}/>

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#919191"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}/>
        
      </View>

      <Pressable onPress={handleLogin} style={styles.buttonContainer}>


          <Text style={styles.buttonText}>Log In</Text>


      </Pressable>

      <View style={styles.noAccountContainer}>

        <Link 
          href="/register"
          onPress={() => {
            console.log('Register Pressed');
          }} 
          style={styles.registerButton}>
          
            <Text style={styles.registerText}>Don't have an account? Register</Text>

        </Link>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    backgroundColor: "#f4f5f3",
    height: "100%",
    width: "100%",

  },
  welcomeContainer: {
    marginTop: 80,
    marginHorizontal: 40,
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  welcomeText: {
    fontSize: 37,
    fontWeight: "bold",
    color: "#1e88e5",
    marginBottom: 20,
  },
  subWelcomeText: {
    fontSize: 15,
    color: "#919191",
    marginBottom: 50,
  },
  inputContainers: {
    width: "80%",
    marginHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    marginBottom: 50,
    marginTop: 30,
    alignSelf: "center",
  },
  input: {
    color: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 40,
    height: 55,
    padding: 20,
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
    marginBottom: 20,
    height: 55,
    alignSelf: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20, 
  },
  noAccountContainer: {
    width: "80%",
    marginHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  registerButton: {

  },
  registerText: {
    color: "#919191",
    fontSize: 16,
  },
  
});

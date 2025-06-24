import { useUser } from "@/context/userContext";
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../firebase';

export default function TabTwoScreen() {

  const userContext = useUser();
  const user = userContext?.user;

  const handleLogOut = () => {
    
  };

  const handleSignOut = async () => {
    try{

      await signOut(auth);
      router.replace("/login");

    } catch (error) {
      alert("Could not sign out: " + error);
    }
  }
  


  return (

    <SafeAreaView style={styles.mainContainer}>

      <Pressable onPress={handleSignOut} style={styles.buttonContainer}>
      
          <Text style={styles.buttonText}>Log Out</Text>
      
      </Pressable>

      <View style={styles.imageContainer}>

        <Image 
            source={require('../../assets/images/default_pfp.png')} 
            style={[ styles.image ]} 
          />
      </View>

      <Text style={styles.nameText}>{auth.currentUser?.displayName?.slice(0, (auth.currentUser?.displayName?.search(" ") ?? 0) - 1) ?? "Guest"}</Text>

      <View style={styles.informationContainer}>
        <Text style={styles.emailTextHeader}>Email: </Text>
        <Text style={styles.emailText}>{auth.currentUser?.email ?? "No email"}</Text>
        <Text style={styles.numberTextHeader}>Phone number: </Text>
        <Text style={styles.numberText}>{user?.number ?? "No number"}</Text>
      </View>

      

    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f4f3f5",
  },
  buttonContainer: {
    backgroundColor: "#F44336",
    color: "#ffffff",
    fontSize: 20,
    width: "30%",
    marginHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    //textAlign: "",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    height: 45,
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 45,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18, 
  },
  imageContainer: {
    width: "50%",
    height: "30%",
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 100,
  },
  informationContainer: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 44,
    color: "#1e88e5",
    alignSelf: "center",
    fontWeight: "800",
  },
  emailTextHeader: {
    fontSize: 18,
    marginHorizontal: 20,
    color: "#1e88e5",
    fontWeight: "500",
    marginBottom: 5,
  },
  numberTextHeader: {
    fontSize: 18,
    marginHorizontal: 20,
    color: "#1e88e5",
    fontWeight: "500",
    marginBottom: 5,
  },
  emailText: {
    fontSize: 18,
    marginHorizontal: 30,
    color: "#373737",
    fontWeight: "500",
    marginBottom: 15,
    paddingBottom: 25,
    borderBottomColor: "#373737",
    borderBottomWidth: 0.28,
  },
  numberText: {
    fontSize: 18,
    marginLeft: 30,
    color: "#373737",
    fontWeight: "500",
    marginBottom: 15,
  },
});

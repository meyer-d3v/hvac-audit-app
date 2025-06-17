import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    
      <View style={styles.container}>

        <View style={styles.logo}>
          <Image
            source={require('../assets/images/dmlogo.png')}
            style={styles.ImageStyle}
          />
          <Text style={[styles.companyName, styles.textColor]}>Meyer Group</Text>
        </View>
        <Text style={[styles.subHeading, styles.textColor]}>HVAC Audit Mobile Platform</Text>
        <Text style={[styles.description, styles.textColor]}>Digitize and streamline your HVAC audit process with our comprehensive platform</Text>


        <Link href="/login" onPress={() => {
            console.log('Login Pressed');
          }} 
          style={[styles.loginButton, styles.buttonWidth, styles.buttonSpacing]}>
            
            <View style={[styles.loginButton, styles.buttonWidth]}>
              
              <Text style={{ color: '#ffffff' }}>Login</Text>
              
            </View> 

        </Link>

        <Link href="/register" onPress={() => {
            console.log('Register Pressed');
          }} 
          style={[styles.registerButton, styles.buttonWidth, styles.buttonSpacing]}>
            
            <View style={[styles.buttonWidth, styles.registerButton2]}>
              <Text style={{ color: '#1e88e5' }}>Register</Text>
            </View>

        </Link>

        
          
      </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    width: "100%",  
    height: "100%",
    backgroundColor: "#ffffff",
    //alignContent: "center",
    alignItems: "center",
  },
  textColor: {
    color: "#1e88e5",
  },
  ImageStyle: {
    width: 250,
    height: 150,
    borderRadius: 25,
    //marginRight: 10,
    //marginTop: 10,
    marginBottom: 10,
    //marginLeft: 10,
    transform: "scale(1.3)",
  },
  companyName: {
    fontFamily: "Arial",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeading: {
    fontFamily: "Arial",
    fontSize: 24,
    width: "60%",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontFamily: "Arial",
    fontSize: 15,
    marginBottom: 120,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 20,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#1e88e5",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  registerButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#1e88e5",
    borderWidth: 2,
    textAlign: "center",
  },
  registerButton2: {
    padding: 5,
  },
  buttonWidth: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSpacing: {
    marginBottom: 40,
  },
});

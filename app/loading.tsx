import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function LoadingScreen() {
  const router = useRouter();

  Toast.show({
              type: 'success',
              text1: 'Successfully logged in',
              //text2: 'Logged in with admin account',
              position: 'top',
            });



  useEffect(() => {
    const fetchData = async () => {
      // Put your dashboard loading logic here
      /*

        const q = await getDocs(collection(db, 'dashboardData'));
        
        const dashboard: { id: string; [key: string]: any }[] = [];

        for (const doc of q.docs) {
            dashboard.push({id: doc.id, ...doc.data() });
        }

        const encodedData = encodeURIComponent(JSON.stringify(dashboard));

      */

      console.log('Fetching dashboard data...');
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      //router.replace('/dashboard?data=${encodedData}'); // go to dashboard when done
      router.replace("/(tabs)/dashboard");
    };

    fetchData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image
                  source={require('../assets/images/dmlogo.png')}
                  style={styles.ImageStyle}
                />
      <ActivityIndicator size="large" color="#1e88e5" style={styles.activity}/>
      <Text style={styles.loadingText}>Loading your dashboard...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: "#ffffff",
  },
  loadingText: {
    color: "#1e88e5",
    fontSize: 18,
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
  activity: {
    marginBottom: 10,
  }
});

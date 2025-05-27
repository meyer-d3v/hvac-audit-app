import { router, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';


export default function TabTwoScreen() {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const goBack = () => {
    router.push("/(tabs)/dashboard")
  }
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

        <Text style={styles.headTitle}>Help & Support</Text>

      </View>

      <View style={styles.FAQContainer}>

        <Text style={styles.FAQDescription}>Frequently Asked Questions</Text>

          <View style={styles.questionsContainer}>
              
              <Text style={styles.question}>How do I create a new audit?</Text>
              <Text style={styles.answer}>From the dashboard, 
                tap the ‘+’ button in the top right corner or select ‘New Audit’ 
                from the bottom navigation menu. Follow the form instructions to 
                complete your audit.</Text>
          </View>

          <View style={styles.questionsContainer}>
              
              <Text style={styles.question}>Can I edit an audit after submitting it?</Text>
              <Text style={styles.answer}>Yes, you can edit any audit by opening it 
                from the dashboard or reports page and tapping the ‘Edit’ button in 
                the top right corner.</Text>
          </View>

          <View style={styles.questionsContainer}>
              
              <Text style={styles.question}>How do I export an audit as a PDF?</Text>
              <Text style={styles.answer}>Open the audit you want to export, scroll 
                to the bottom and tap ‘Export PDF’. You can also export the Reports 
                page by tapping the ‘Export’ button next to any audit.</Text>
          </View>

          <View style={styles.questionsContainer}>
              
              <Text style={styles.question}>How do I attach photos to an audit?</Text>
              <Text style={styles.answer}>While creating or editing an audit, 
                scroll to the attachments section and tap ‘Select Files’ to choose 
                photos from your device.</Text>
          </View>

          <View style={styles.questionsContainer}>
              
              <Text style={styles.question}>Can I use the app offline?</Text>
              <Text style={styles.answer}>Yes, you can create and edit audits offline. 
                They will automatically sync when you reconnect to the internet.</Text>
          </View>

          <View style={styles.questionsContainer}>
              
              <Text style={styles.question}>How do I reset my password?</Text>
              <Text style={styles.answer}>From the login screen, tap ‘Forgot Password’ 
                and follow the instructions sent to your email.</Text>
          </View>

          <View style={styles.questionsContainer}>
              
              <Text style={styles.question}>How do I change my profile information?</Text>
              <Text style={styles.answer}>Go to Settings from the bottom navigation menu 
                and tap ‘Edit’.</Text>
          </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f4f3f5",
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
  FAQContainer: {
    backgroundColor: "#ffffff",
    width: "90%",
    height: "auto",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    //alignItems: "center",
    alignSelf: "center",
    marginBottom: 30,
  },
  FAQDescription: {
    paddingLeft: 10,
    paddingTop: 25,
    paddingBottom: 10,
    color: "#1e88e5",
    fontSize: 16,
    width: "90%",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  questionsContainer: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: "#919191",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    paddingBottom: 30,
  },
  question: {
    color: "#373737",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
  },
  answer: {
    color: "#919191",
    fontSize: 13,
    lineHeight: 19,
  },
});

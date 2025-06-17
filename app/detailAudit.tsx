import { Colors } from '@/constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { db } from "../firebase";


export default function TabTwoScreen() {

  

  const navigation = useNavigation();
  

  const [equipment, setEquipment] = useState<{ id: string; [key: string]: any }[]>();
  const [amountEquipment, setAmountEquipment] = useState("");
  const [operational, setOperation] = useState("");
  const [nonOperation, setNonOperational] = useState("");

  const { auditId, auditLocation, auditDate } = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const goBack = () => {
    router.push("/(tabs)/reports")
  };

  const getStatusBackground = (colorStats: string) => {
      if (colorStats === "operational") {
        return "#C1FFA2"; // Green
    } else if (colorStats === "needs-maintenance") {
      return "#FFFA76"; // Yellow
    }  else {
      return "#FF7272";
    }
    }

  const getStatusTextColor = (colorStats: string) => {
      if (colorStats === "operational") {
        return "#0CB100"; // Green
    } else if (colorStats === "needs-maintenance") {
        return "#987500"; // Yellow
    }  else {
      return "#A20000";
    }
  }


  useEffect(() => {

    const getEquipment = async () => {

        try{

            const q = await query(collection(db, "equipment"), where("auditId", "==", auditId));

            const equipmentArray : { id: string; [key: string]: any }[] = [];
            let operationalAmount = 0, nonOperationAmount = 0;

            const results = await getDocs(q);
            
            results.forEach((doc) => {
                equipmentArray.push({id: doc.id, ...doc.data()});

                if (doc.data().status === "operational") {
                  operationalAmount++;
                  setOperation(operationalAmount.toString());
                } else {
                  nonOperationAmount++;
                  setNonOperational(nonOperationAmount.toString());
                }

                
                  
            });

            

            const len = (equipmentArray.length).toString();
            setEquipment(equipmentArray);
            setAmountEquipment(len);

        } catch (error) {

            alert("Failed to get equipment data. Error: " + error);
            console.log(error);

        }

    };

    getEquipment();


  }, []);



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

        <Text style={styles.headTitle}>Equipment ({amountEquipment})</Text>

        <Text style={styles.locationText}>Location: <Text style={styles.auditInfo}>{auditLocation}</Text></Text>
        <Text style={styles.dateText}>Audit Date: <Text style={styles.auditInfo}>{auditDate}</Text></Text>

      </View>

      <View style={styles.overviewContainer}>

        <View style={styles.overviewTextContainer}>
          <Text style={styles.overviewText}>Equipment Summary</Text>
        </View>

        <View style={styles.overviewEquipment}>

          <View style={styles.amountEquipment}>
              <Text style={[{ fontSize: 32, fontWeight: "bold" }, styles.amountText]}>{equipment?.length}</Text>
              <Text>Total Equipment</Text>
          </View>

          <View style={styles.statusContainer}>
            <Text style={[styles.statusText]}>Operational: {operational}</Text>
            <Text style={[styles.statusText]}>Non-operational: {nonOperation}</Text>
          </View>

        </View>

      </View>

      <FlatList
            //data={sampleAsset}
            data={equipment}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            nestedScrollEnabled={false}
            style={styles.flatlistContainer}
            renderItem={({item}) => (
            <View style={styles.equipmentContainer}>

            
            <View style={styles.equipment}>
              <FontAwesome5 name="wrench" size={24} color="#1e88e5" />
              <Text style={styles.equipmentName}>{item.equipmentName}</Text>
            </View>

              <View style={styles.row}>

                <View style={styles.column}>
                  <View style={styles.labels}>
                    <FontAwesome5 name="wrench" size={16} color={Colors.dark.grayText} />
                    <Text style={styles.staticText}>Model</Text>
                  </View>
                  <Text style={styles.dataText}>{item.model}</Text>
                </View>

                <View style={styles.column}>
                  <View style={styles.labels}>
                    <FontAwesome5 name="hashtag" size={16} color={Colors.dark.grayText} />
                    <Text style={styles.staticText}>Serial Number</Text>
                  </View>
                  <Text style={styles.dataText}>{item.serialNumber}</Text>
                </View>


              </View>

              <View style={styles.row}>

                <View style={styles.column}>
                  <View style={styles.labels}>
                    <FontAwesome5 name="star" size={16} color={Colors.dark.grayText} />
                    <Text style={styles.staticText}>Condition</Text>
                  </View>
                  <Text style={styles.dataText}>{item.equipmentCondition}</Text>
                </View>

                <View style={styles.column}>
                  <View style={styles.labels}>
                    <FontAwesome5 name="cog" size={16} color={Colors.dark.grayText} />
                    <Text style={styles.staticText}>Operational Status</Text>
                  </View>
                  <Text style={[{ backgroundColor: getStatusBackground(item.status), color: getStatusTextColor(item.status)}, styles.statusBackground]}>{item.status}</Text>
                </View>


              </View>

              <View style={styles.budgetContainer}>
                <View style={styles.budgetLabel}>
                  <FontAwesome5 name="dollar-sign" size={20} color="#1e88e5"/>
                  <Text style={styles.boldText}>Budget</Text>
                </View>
                <Text style={styles.budgetText}>R{item.budget}</Text>
              </View>

              <View style={styles.notesContainer}>
                <View style={styles.notesLabel}>
                  <FontAwesome5 name="file-alt" size={20} color="#1e88e5" />
                  <Text style={styles.boldText}>Notes & Observation</Text>
                </View>
                <Text style={styles.notesText}>{item.notes}</Text>
              </View>
            </View>
            )}></FlatList>

        

    

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f4f3f5",
    //backgroundColor: Colors.dark.backgroundColor,
    height: "100%",
  },
  headTitleContainer: {
    //color: "#1e88e5",
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 25,
  },
  headTitle: {
    fontSize: 32,
    color: "#1e88e5",
    fontWeight: "bold",
    marginBottom: 15,
 },
  backButtonContainer: {
    //Back button container
    marginTop: 40,
    marginLeft: 30,
    borderColor: "#1e88e5",
    borderWidth: 1,
    width: "20%",
    height: 30,
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: -10,
 },
  backButton: {
    //backgroundColor: "#1e88e5",
 },
  backButtonText: {
    color: "#1e88e5",
    fontSize: 16,
    display: "flex",
    textAlign: "center",
 },
 locationText: {
  fontSize: 16,
  fontWeight: 400,
 },
 dateText: {
  fontSize: 16,
  fontWeight: 400,
 },
 auditInfo: {
  fontWeight: 500,
 },
 flatlistContainer: {
    marginBottom: 30,
  },
  equipmentContainer: {
    backgroundColor: "#ffffff",
    width: "90%",
    alignSelf: "center",
    padding: 20,
    marginBottom: 30,
    //marginTop: 10,
    borderRadius: 20,
  },
  equipmentName: {
    fontSize: 24,
    //color: "#1e88e5",
    color: "#1E293B",
    fontWeight: "600",
    //marginBottom: 20,
    
  },
  statusBackground: {
    borderRadius: 15,
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  staticText: {
    color: "#919191",
    fontSize: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 10,
    gap: 5,
  },
  boldText: {
    color: "#292E39",
    fontSize: 20,
    fontWeight: 500,
    //marginTop: 10,
    //marginBottom: 10,
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
  },
  dataText: {
    fontSize: 16,
    color: "#373737",
    fontWeight: 500,
  },
  overviewContainer: {
    backgroundColor: "#ffffff",
    width: "90%",
    alignSelf: "center",
    //padding: 10,
    borderRadius: 15,
    marginBottom: 30,
    paddingBottom: 30,
  }, 
  statusContainer: {
    //fontSize: 14,
    display: "flex",
    justifyContent: "space-evenly",
  }, 
  statusText: {
    fontSize: 14,
  },
  overviewText: {
    fontSize: 24,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  overviewTextContainer: {
    //margin: 20,
    //backgroundColor: Colors.dark.backgroundColor,
  },
  overviewEquipment: {
    display: "flex",
    justifyContent: "space-around",
    gap: 30,
    flexDirection: "row",
    alignSelf: "center",
  },
  amountEquipment: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 10,
  },
  amountText: {
    display: "flex",
    textAlign: "center",
  }, 
  operational: {
    color: "#176548",
  },
  nonOperational: {
    color: "#FFFA76",
  },
  equipment: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 15,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  budgetContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
  },
  labels: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  budgetLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  budgetText: {
    padding: 10,
    backgroundColor: "#F8FAFC",
    width: "35%",
    marginTop: 5,
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 20,
    fontWeight: "500",
  },
  notesContainer: {
    display: "flex",
  },
  notesLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  notesText: {
    marginTop: 5,
    fontSize: 16,
    color: "#373737",
    fontWeight: 500,
    padding: 10,
    alignSelf: "center",
    //borderColor: "#ge2",
    //borderWidth: 2,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
  },
  
});

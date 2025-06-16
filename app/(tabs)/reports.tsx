import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from "expo-router";
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { db } from "../../firebase";
//import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default function TabTwoScreen() {

 

  const [sampleAsset, setSampleAsset] = useState<{ id: string; [key: string]: any }[]>();
  const [assets, setAssets] = useState<{ id: string; [key: string]: any }[]>();
  

   const getStatusBackground = (colorStats: string) => {
      if (colorStats === "completed" || colorStats === "Completed") {
        return "#C1FFA2"; // Green
    } else if (colorStats === "In Progress") {
      return "#FFFA76"; // Yellow
    }  else {
      return "#ffffff";
    }
    }

  const getStatusTextColor = (colorStats: string) => {
    if (colorStats === "completed" || colorStats === "Completed") {
      return "#0CB100"; // Green
  } else if (colorStats === "In Progress") {
      return "#987500"; // Yellow
  }  else {
    return "#919191";
  }
  }

  /*

  useEffect(() => {

    const getAudits = async () => {

      try{

        const query = await getDocs(collection(db, 'sampleAudits'));

        const auditsArray : { id: string; [key: string]: any }[] = [];

        query.docs.forEach((doc) => {
          auditsArray.push({id: doc.id, ...doc.data()});
        });

        


        setSampleAsset(auditsArray);
        console.log("Audits has been retrieved and set.");

      } catch (error) {
        console.log("Error encountered: " +  error);
      }

    };

    getAudits();
  }, []);

  */

  useEffect(() => {

    const getAudit = async () => {

      try{

        const q = await getDocs(collection(db, 'audits'));
        

        if (q.empty) {

          alert("There are no audits this far.");
          console.log("There are no audits this far.");
          return;
          
        };


        const audits : { id: string; [key: string]: any }[] = [];

        q.docs.forEach((doc) => {
          audits.push({id: doc.id, ...doc.data()});
        });


        setAssets(audits);

        
        

      } catch (error) {

        console.log(error);

      }


    }


    getAudit();
  }, []);

   const seeEquipment = (auditID: string, location: string, date: string) => {

     router.push({
      pathname: "../detailAudit",
      params: { 
        auditId: auditID, 
        auditLocation: location,
        auditDate: date,
       },
     });
   }

  return (

    <View style={styles.mainContainer}>

    <View style={styles.headerTextContainer}>
      <Text style={styles.headerText}>Audit Reports</Text>
    </View>

    <FlatList
          //data={sampleAsset}
          data={assets}
          keyExtractor={(item) => item.id}
          style={styles.flatlistContainer}
          renderItem={({item}) => (
            <View style={styles.auditsContainer}>

              <View style={styles.auditNameStatusContainer}>
                <FontAwesome5 name="building" size={26} color="#4287f5" />
                <Text style={styles.auditNameText}>{item.siteName}</Text>
              </View>

              <View style={styles.performedByContainer}>
                <FontAwesome5 name="male" size={20} style={styles.iconStyles}/>
                <Text style={styles.performedByText}>{item.performedBy}</Text>
              </View>

              
              <View style={styles.dateContainer}>
                <FontAwesome5 name="calendar" size={20} style={styles.iconStyles}/>
                <Text style={styles.dateText}>{item.createdOn}</Text>
              </View>

              
              <View style={styles.btnStatusContainer}>
                    <Text style={[{ backgroundColor: getStatusBackground(item.status), color: getStatusTextColor(item.status)}, styles.statusBackground]}>{item.status}</Text>
                    
                    <Pressable onPress={() => {
                      seeEquipment(item.id, item.siteName, item.createdOn);
                    }}
                      style={styles.buttonContainer}>

                        <Text style={styles.buttonText}>See details</Text>

                    </Pressable>
              </View>
 
            </View>
          )}></FlatList>

    </View>
    
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#f4f3f5",
    height: "100%",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "800",
    alignSelf: "center",
    color: "#1e88e5",
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    width: "90%",
    textAlign: "center",
    borderRadius: 10,
    height: 110,
    display: "flex",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  headerTextContainer: {
    //Type shiiiiiii
  },
  flatlistContainer: {
    height: "100%",
    width: "90%",
    alignSelf: "center",
  },
  auditsContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  auditNameStatusContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    //justifyContent: "space-between"
  },
  auditNameText: {
    fontSize: 20,
    color: "#49494a",
    fontWeight: "bold",
    marginLeft: 10,
  },
  statusBackground: {
    //paddingHorizontal: 10,
    //paddingVertical: 5,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    textAlignVertical: "center",
    borderRadius: 20,
    width: "40%",
    height: 35,
    marginBottom: 15,
    marginTop: -30,
  },
  buildingText: {
    fontSize: 13,
    color: "#373737",
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#919191",
    marginBottom: 10,
    display: "flex",
    //flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  performedByText: {
    fontSize: 16,
    color: "#919191",
    marginBottom: 10,
    marginLeft: 15,
  },
  buttonContainer: {
    backgroundColor: "#1e88e5",
    width: "40%",
    height: 35,
    textAlignVertical: "center",
    borderRadius: 20,
    //alignSelf: "flex-end",
    textAlign: "center",
    alignContent: "center",
    verticalAlign: "middle",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    textAlignVertical: "center",
    alignContent: "center",
    alignSelf: "center",
    verticalAlign: "middle",
  },
  btnStatusContainer: {
    display: "flex",
    //justifyContent: "flex-end",
    flexDirection: "column",
    //alignSelf: "center",
    alignContent: "flex-end",
    alignItems: "flex-end",
  }, 
  iconStyles: {
    color: "#919191",
    //paddingRight: 10,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
  }, 
  performedByContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  }
});

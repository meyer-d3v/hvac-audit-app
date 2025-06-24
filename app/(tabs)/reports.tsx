import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { router } from "expo-router";
import * as Sharing from 'expo-sharing';
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { db } from "../../firebase";

export default function TabTwoScreen() {

  const [equipment, setEquipment] = useState<{ id: string; [key: string]: any }[]>();
  const [amountEquipment, setAmountEquipment] = useState("");
  const [operational, setOperation] = useState("");
  const [nonOperation, setNonOperational] = useState("");
  const [loadingPDF, setLoadingPDF] = useState<string>("");
  const [loadingDelete, setLoadingDelete] = useState<string>("");
  const [loadingEquipment, setLoadingEquipment] = useState<string>("");
  

 

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
    getAudit();
  }, []);

  

    const getAudit = async () => {

      try{

        

        const querySnapshot = await query(collection(db, 'audits') ,orderBy('createdOn', 'desc'));

        const q = await getDocs(querySnapshot);

        //console.log(q.docs.length);
        

        if (q.empty) {

          alert("There are no audits this far.");
          console.log("There are no audits this far.");
          return;
          
        };


        const audits : { id: string; [key: string]: any }[] = [];

        q.docs.forEach((doc) => {
          audits.push({id: doc.id, ...doc.data()});
          console.log(doc.data().createdOn)
        });


        setAssets(audits);

        
        

      } catch (error) {

        console.log(error);

      }


    }



   const seeEquipment = async (auditID: string, location: string, date: number) => {

    setLoadingEquipment(auditID);

     try{

      router.push({
        pathname: "../detailAudit",
        params: { 
          auditId: auditID, 
          auditLocation: location,
          auditDate: date,
        },
     });

     } catch (error) {

      Toast.show({
        type: "error", 
        text1: "Error",
        text2: (error as Error).toString(),
      })

     } finally {

      setLoadingEquipment("");

     }
   }

  const deleteAudit = async (auditID: string) => {

    setLoadingDelete(auditID);

    try{

      await deleteDoc(doc(db, "audits", auditID));

      const q = await query(collection(db, "equipment"), where("auditId", "==", auditID));

      const results = await getDocs(q);

      results.docs.forEach(async (item) => {
        await deleteDoc(doc(db, "equipment", item.id));
      })

      Toast.show({
        type: "success", 
        text1: "Deleted",
        text2: "Successfully deleted audit.",
      });

      await getAudit();

      

    } catch (error) {

      Toast.show({
        type: "error", 
        text1: "Error",
        text2: (error as Error).toString(),
      })
    } finally {

      setLoadingDelete("");

    }
   }

   const generatePDF = async (auditData: any) => {

      setLoadingPDF(auditData.id);

      var equipmentHTMLContent = `<div>All equipment:</div>
                                <br>
                                <table>
                                  <tr>
                                    <th>Name</th>
                                    <th>Serial Number</th>
                                    <th>Model</th>
                                    <th>Status</th>
                                    <th>Condition</th>
                                    <th>Budget</th>
                                    <th>Notes</th>
                                  </tr>
                                `;
      var fileName = ``;

      try{

          
    
          const q = await query(collection(db, "equipment"), where("auditId", "==", auditData.id));
          

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

              equipmentHTMLContent += ` 

                  <tr>
                    <td>${doc.data().equipmentName}</td>
                    <td>${doc.data().serialNumber}</td>
                    <td>${doc.data().model}</td>
                    <td>${doc.data().status}</td>
                    <td>${doc.data().equipmentCondition}</td>
                    <td>${doc.data().budget}</td>
                    <td>${doc.data().notes}</td>
                  </tr>

                `

                /*
                <div><strong>Name: </strong>${doc.data().equipmentName}</div>
                  <div><strong>Serial Number: </strong>${doc.data().serialNumber}</div>
                  <div><strong>Model: </strong>${doc.data().model}</div>
                  <div><strong>Status: </strong>${doc.data().status}</div>
                  <div><strong>Condition: </strong>${doc.data().equipmentCondition}</div>
                  <div><strong>Budget: </strong>${doc.data().budget}</div>
                  <div><strong>Notes: </strong>${doc.data().notes}</div>
                */
              

              
                
          });

          equipmentHTMLContent += `
                              </table>
                              <div>====================================</div>
                              <div>end of equipment</div>`;

          setEquipment(equipmentArray);

          

      } catch (error) {

          console.log(error);

          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to get equipment data. Try again."
          })

      } finally {

        Toast.show({
            type: "success",
            text1: "Success",
            text2: "Successfully created PDF",
          });
      }

    setEquipment([]);

    fileName = `Audit_Report_${auditData.auditName}.pdf`;
    var fileURI = FileSystem.documentDirectory + fileName;

    console.log(fileName);
    console.log(fileURI);

    

    const htmlContent = `
    
      <DOCTYPE html>
      <html lang="en">
        <head>

          <title>PDF Export</title>

        </head>
        <body>

          <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #004080; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              .page-break { page-break-before: always; }
              .frontPageContainer { display: "flex"; justify-content: "center"; align-items: "center"; width: 100%; }
          </style>

          <div class="frontPageContainer">

            <img src="${'../../assets/images/dmlogo.png'} width="50%" alt="Company Logo"/>

            <h1>${auditData.siteName}</h1>

            <h1>Audit Report - ${auditData.auditName}</h1>
            <p><strong>Date:</strong> ${new Date(auditData.createdOn?.seconds * 1000).toDateString()}</p>
            <p><strong>Status:</strong> ${auditData.status}</p>
            <p><strong>Performed By:</strong> ${auditData.performedBy}</p>

          </div>

          <div class="page-break"></div>

          <div>${equipmentHTMLContent}</div>

        </body>
      </html>
    
    
    `

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await FileSystem.moveAsync({ from: uri, to: fileURI});
    setLoadingPDF("");
    await Sharing.shareAsync(fileURI);

    

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
                <Text style={styles.dateText}>{new Date(item.createdOn?.seconds * 1000).toDateString()}</Text>
              </View>

              
              <View style={styles.btnStatusContainer}>
                    <Text style={[{ backgroundColor: getStatusBackground(item.status), color: getStatusTextColor(item.status)}, styles.statusBackground]}>{item.status}</Text>
              </View>    

              <View style={styles.informationContainer}>

                <Pressable onPress={() => {
                        seeEquipment(item.id, item.siteName, item.createdOn.seconds);
                      }}
                      style={styles.seeDetails}>
                      
                      <View style={styles.buttonContainer}>

                          {loadingEquipment === item.id ?

                          (<ActivityIndicator size={"small"} color={"#1e88e5"}/>) 
                          :
                          (<View style={styles.seeDetailsContainer}>
                          <FontAwesome5 name="eye" size={20} color="#1e88e5" />
                          <Text style={styles.buttonText}>See details</Text>
                          </View>
                        )}
                      </View>
                </Pressable>

                <Pressable onPress={() => {
                        generatePDF(item);
                      }}
                      style={styles.btnExportContainer}>
                    
                    <View style={styles.buttonContainer}>

                          {loadingPDF === item.id ? 
                          (<ActivityIndicator size={"small"} color={"#364357"}/>) :
                          (<FontAwesome5 name="file-export" size={20} color="#364357" style={{ paddingLeft: 10 }} />)}
 
                    </View>
                </Pressable>

                <Pressable onPress={() => {
                        deleteAudit(item.id);
                      }}
                  style={styles.btnDeleteContainer}>

                      <View style={styles.buttonContainer}>

                          {loadingDelete === item.id ? 
                          (<ActivityIndicator size={"small"} color={"#DF3939"}/>) :
                          (<MaterialIcons name="delete" size={22} color="#DF3939" />)}

                      </View>
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
    //width: "40%",
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
  btnDeleteContainer: {
    backgroundColor: "#FEF2F2",
    borderColor: "#DF3939",
    borderWidth: 0.7,
    //width: "40%",
    height: 35,
    textAlignVertical: "center",
    borderRadius: 15,
    //alignSelf: "flex-end",
    textAlign: "center",
    alignContent: "center",
    verticalAlign: "middle",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "20%",
  },
  buttonText: {
    color: "#1e88e5",
    fontSize: 16,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    textAlignVertical: "center",
    alignContent: "center",
    alignSelf: "center",
    verticalAlign: "middle",
    fontWeight: 500,
    marginLeft: 5,
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
  },
  btnExportContainer: {
    backgroundColor: "#F8FAFC",
    borderColor: "#6B7585",
    borderWidth: 0.7,
    //marginTop: 20,
    display: "flex",
    textAlignVertical: "center",
    borderRadius: 15,
    //alignSelf: "flex-end",
    textAlign: "center",
    alignContent: "center",
    verticalAlign: "middle",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    alignSelf: "center",

  }, 
  informationContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 5,
  },
  seeDetails: {
    display: "flex",
    width: "50%",
    backgroundColor: "#EFF6FF",
    borderRadius: 15,
    borderColor: "#1e88e5",
    borderWidth: 0.7,
    
  },
  seeDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  }
});

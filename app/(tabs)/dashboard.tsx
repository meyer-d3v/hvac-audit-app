import Feather from '@expo/vector-icons/Feather';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { db } from "../../firebase";



export default function TabTwoScreen() {

  /*
  const { encodedData } = useLocalSearchParams();
  const decodedData =
    typeof encodedData === "string"
      ? JSON.parse(decodeURIComponent(encodedData))
      : Array.isArray(encodedData) && encodedData.length > 0
      ? JSON.parse(decodeURIComponent(encodedData[0]))
      : [];
  

      */

  //setting dashboard data to audits
  const [dashboardMockData, setDashboard] = useState<{ id: string; [key: string]: any }[]>([]);
  const [sampleAssets, setSampleAssets] = useState<{ id: string; [key: string]: any }[]>();
  const [audits, setAudits] = useState<{ id: string; [key: string]: any }[]>();

  //getting and setting icons state
  const [iconState, setIconState] = useState(false);


  const getStatusBackground = (colorStats: string) => {
    if (colorStats === "Operational") {
      return "#C1FFA2"; // Green
  } else {
    return "#FF7272"; // RedFF7272
    }
  }

  const getStatusTextColor = (colorStats: string) => {
    if (colorStats === "Operational") {
      return "#0CB100"; // Green
  } else {
    return "#A20000"; // Red
    }
  }

  //getting dashboard overall data
  useEffect(() => {

    const getDashBoardData = async () => {


      try{

        const q = await getDocs(collection(db, 'dashboardData'));

        const dashboard: { id: string; [key: string]: any }[] = [];


        /*
        q.docs.forEach((doc) => {
          //const auditData = doc.data();
          dashboard.push({id: doc.id, ...doc.data() });
        });
        */

        for (const doc of q.docs) {
          dashboard.push({id: doc.id, ...doc.data() });
        }


        

        setDashboard(dashboard);
        console.log(dashboardMockData.length);

      } catch(error) {
        alert("Error getting data. " + error)
      }

    }

    getDashBoardData();
    
    }, []);


useEffect(() => {

  const getDashBoardInfo = async () => {

    try{

      const query = await getDocs(collection(db, 'sampleAssetsData'));

      const assets: { id: string; [key: string]: any }[] = [];


      query.docs.forEach((doc) => {
        //const auditData = doc.data();
        assets.push({id: doc.id, ...doc.data() });
      });



      

      setSampleAssets(assets);
      console.log(assets.length);

    } catch(error) {
      alert("Error getting data. " + error)
    }

  }

  getDashBoardInfo();
  
  }, []);
  


  useEffect(() => {

    const getAudits = async () => {

        try{

            const q = await getDocs(collection(db, 'audits'));
        

            if (q.empty) {

                alert("There are no audits this far.");
                console.log("There are no audits this far.");
                return;
              
            };


            const audits : { id: string; [key: string]: any }[] = [];

            q.docs.forEach((doc) => {
              
              if (audits.length < 3) {
                audits.push({id: doc.id, ...doc.data()});
                console.log(doc.id);
              }

            });


            setAudits(audits);


        } catch (error) {

          Toast.show({
              type: 'error',
              text1: 'Error getting audits.',
              position: 'top',
          })
        }

        
    }


    getAudits();


  }, []);




  //function used to send sample data to db
  /*

  const addDataToDB = async () => {

    alert("pressed");
    console.log(audits.length);
    
    console.log("Trying to upload data to db");

    for (const data of sampleAudit) {
      try{
            await addDoc(collection(db, 'sampleAudits'), data);
            console.log("Audit: has been logged.");
            alert("Audit: has been logged.");
          } catch (error) {
            console.log("Error occured. Error: " + error + ". Data: was not saved.");
            alert("Error occured. Error: " + error + ". Data: was not saved.");
          }

    }
    
  }

  //loading icons
  useEffect(() => {

    const loadIcons = async () => {

      try{

        await Font.loadAsync ({

          Feather: Feather.font,

        });

        setIconState(true);

      } catch (error) {

        console.error("Error loading icons. Error: " + error);

      }
    }

    loadIcons();
  }, []);

*/
  
 
  return (
    <View style={styles.mainContainer}>

      <Text style={styles.dashboardText}>HVAC Audit Dashboard</Text>
      
      <View style={[styles.overviewContainer, styles.marginTopContainer]}>

        <View style={styles.dashContainer}>

            <View style={styles.displayIcon}>
              <Feather name="file-text" size={32} color="#03266D" />
            </View>
            <View style={styles.displayData}>
              <Text style={styles.displayDataText}>Total Audits:</Text>
              <Text style={styles.data}>{dashboardMockData[0]?.totalAudits ?? "Loading..."}</Text>
            </View>

        </View>

        <View style={styles.dashContainer}>

          <View style={styles.displayIcon}>
              <Feather name="alert-triangle" size={32} color="#FF8736" />
            </View>
            <View style={styles.displayData}>
              <Text style={styles.displayDataText}>Need Attention:</Text>
              <Text style={styles.data}>{dashboardMockData[0]?.needAttention ?? "Loading..."}</Text>
            </View>
        </View>

      </View>

      <View style={[styles.overviewContainer, styles.marginBottomContainer]}>

        <View style={styles.dashContainer}>

          <View style={styles.displayIcon}>
              <Feather name="dollar-sign" size={32} color="#00C81B" />
            </View>
            <View style={styles.displayData}>
              <Text style={styles.displayDataText}>Budget Used: (R)</Text>
              <Text style={styles.data}>{dashboardMockData[0]?.budgetUsed ?? "Loading..."}</Text>
            </View>

        </View>

        <View style={styles.dashContainer}>

          <View style={styles.displayIcon}>
              <Feather name="clock" size={32} color="#3E7088" />
            </View>
            <View style={styles.displayData}>
              <Text style={styles.displayDataText}>Recent Updates:</Text>
              <Text style={styles.data}>{dashboardMockData[0]?.recentUpdates ?? "Loading..."}</Text>
            </View>

        </View>

      </View>

      <Text style={styles.recentAuditsText}>Recent Audits</Text>


      <FlatList
        data={sampleAssets}
        //data={(sampleAssets && sampleAssets.length > 0) ? sampleAssets : decodedData}
        //data={audits}
        keyExtractor={(item) => item.id}
        style={styles.flatlistContainer}
        renderItem={({item}) => (
          <View style={styles.recentsContainer}>
            <Text style={styles.listHeadText}>{item.name ?? "Loading.."}</Text>
            <View style={styles.row}>
              <Text style={styles.listData}>{item.building ?? "Loading.."}</Text>
              <Text style={styles.listData2}>{item.condition ?? "Loading.."}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.listData}>{item.date ?? "Loading.."}</Text>
              <Text style={[{ backgroundColor: getStatusBackground(item.status), color: getStatusTextColor(item.status)}, styles.statusBackground]}>{item.status ?? "Loading.."}</Text>
            </View>
            
          </View>
        )}></FlatList>






      

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
  dashboardText: {
    fontSize: 32,
    fontWeight: "800",
    alignSelf: "center",
    color: "#1e88e5",
    marginTop: 60,
  },
  marginTopContainer: {
    marginTop: 35,
  },
  marginBottomContainer: {
    marginBottom: 35,
  },
  overviewContainer: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    marginVertical: 10,

  },
  dashContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    height: "100%",
    width: "45%",
    borderColor: "#dbdbdb",
    borderWidth: 0.35,
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  displayData: {
    display: "flex",
    flexDirection: "column",
  },
  displayDataText: {
    fontSize: 13,
    color: "#919191",
  },
  data: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "bold",
  },
  displayIcon: {
    //height: 24,
    //width: "50%",
  },
  flatlistContainer: {
    //marginBottom: 20,
  },
  recentAuditsText: {
    fontSize: 22,
    color: "#373737",
    marginLeft: 30,
  },
  recentsContainer: {
    backgroundColor: "#ffffff",
    width: "90%",
    alignSelf: "center",
    padding: 20,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 20,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 10,
    marginRight: 10,
  },
  listHeadText: {
    fontSize: 19,
    color: "#03266D",
    fontWeight: "500",
    marginVertical: 10,
  },
  listData: {
    fontSize: 14,
    color: "#919191",
    justifyContent: "center",
    display: "flex",
  },
  listData2: {
    fontSize: 15,
    color: "#1e1e1e",
    
  },
  statusBackground: {
    borderRadius: 15,
    padding: 5,
  },
  addNewContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "80%",
    height: 48,
    marginRight: 20,
  },
  addNew: {
    backgroundColor: "#1e88e5",
    color: "#1e88e5",
    width: 48,
    alignItems: "center",
  },
});

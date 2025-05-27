import Feather from '@expo/vector-icons/Feather';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { dashboardData, sampleAudits, sampleAssetsData } from "../../data/dashboardData";



export default function TabTwoScreen() {


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
              <Text style={styles.data}>{dashboardData.totalAudits}</Text>
            </View>

        </View>

        <View style={styles.dashContainer}>

          <View style={styles.displayIcon}>
              <Feather name="alert-triangle" size={32} color="#FF8736" />
            </View>
            <View style={styles.displayData}>
              <Text style={styles.displayDataText}>Need Attention:</Text>
              <Text style={styles.data}>{dashboardData.needAttention}</Text>
            </View>
        </View>

      </View>

      <View style={[styles.overviewContainer, styles.marginBottomContainer]}>

        <View style={styles.dashContainer}>

          <View style={styles.displayIcon}>
              <Feather name="dollar-sign" size={32} color="#00C81B" />
            </View>
            <View style={styles.displayData}>
              <Text style={styles.displayDataText}>Budget Used:</Text>
              <Text style={styles.data}>R{dashboardData.budgetUsed}</Text>
            </View>

        </View>

        <View style={styles.dashContainer}>

          <View style={styles.displayIcon}>
              <Feather name="clock" size={32} color="#3E7088" />
            </View>
            <View style={styles.displayData}>
              <Text style={styles.displayDataText}>Recent Updates:</Text>
              <Text style={styles.data}>{dashboardData.recentUpdates}</Text>
            </View>

        </View>

      </View>

      <Text style={styles.recentAuditsText}>Recent Audits</Text>


      <FlatList
        data={sampleAssetsData}
        keyExtractor={(item) => item.id}
        style={styles.flatlistContainer}
        renderItem={({item}) => (
          <View style={styles.recentsContainer}>
            <Text style={styles.listHeadText}>{item.name}</Text>
            <View style={styles.row}>
              <Text style={styles.listData}>{item.building}</Text>
              <Text style={styles.listData2}>{item.condition}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.listData}>{item.date}</Text>
              <Text style={[{ backgroundColor: getStatusBackground(item.status), color: getStatusTextColor(item.status)}, styles.statusBackground]}>{item.status}</Text>
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

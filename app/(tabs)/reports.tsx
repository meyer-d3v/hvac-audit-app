import { FlatList, StyleSheet, Text, View } from 'react-native';
import { sampleAudits } from "../../data/dashboardData";

export default function TabTwoScreen() {

   const getStatusBackground = (colorStats: string) => {
      if (colorStats === "Completed") {
        return "#C1FFA2"; // Green
    } else if (colorStats === "In-progress") {
      return "#FFFA76"; // Yellow
    }  else {
      return "#ffffff";
    }
    }

  const getStatusTextColor = (colorStats: string) => {
    if (colorStats === "Completed") {
      return "#0CB100"; // Green
  } else if (colorStats === "In-progress") {
      return "#987500"; // Yellow
  }  else {
    return "#919191";
  }
  }

  return (

    <View style={styles.mainContainer}>

    <View style={styles.headerTextContainer}>
      <Text style={styles.headerText}>Audit Reports</Text>
    </View>

    <FlatList
          data={sampleAudits}
          keyExtractor={(item) => item.id}
          style={styles.flatlistContainer}
          renderItem={({item}) => (
            <View style={styles.auditsContainer}>

              <View style={styles.auditNameStatusContainer}>
                <Text style={styles.auditNameText}>{item.name}</Text>
                <Text style={[{ backgroundColor: getStatusBackground(item.status), color: getStatusTextColor(item.status)}, styles.statusBackground]}>{item.status}</Text>
              </View>

              <Text style={styles.buildingText}>{item.building}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
 
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
  },
  headerText: {
    fontSize: 32,
    fontWeight: "800",
    alignSelf: "center",
    color: "#1e88e5",
    marginTop: 60,
    marginBottom: 30,
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
    justifyContent: "space-between"
  },
  auditNameText: {
    fontSize: 18,
    color: "#03266D",
    fontWeight: "bold",
  },
  statusBackground: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buildingText: {
    fontSize: 13,
    color: "#373737",
    marginVertical: 10,
  },
  dateText: {
    fontSize: 13,
    color: "#919191",
    marginBottom: 10,
  },
});

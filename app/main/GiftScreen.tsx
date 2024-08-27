import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

function GiftScreen(props: any) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FeatherIcon name="arrow-left" style={styles.backIcon}></FeatherIcon>
        <Text style={styles.headerText}>Gifts</Text>
      </View>

      {/* Gift Items */}
      <View style={styles.giftSection}>
        <Text style={styles.giftTitle}>Available Gifts</Text>
        <View style={styles.giftItem}>
          <Text style={styles.giftName}>Gift 1</Text>
          <Text style={styles.giftDescription}>Description of Gift 1</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Claim Gift</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.giftItem}>
          <Text style={styles.giftName}>Gift 2</Text>
          <Text style={styles.giftDescription}>Description of Gift 2</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Claim Gift</Text>
          </TouchableOpacity>
        </View>
        {/* Add more gift items as needed */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 20,
    elevation: 2
  },
  backIcon: {
    color: "#121212",
    fontSize: 30
  },
  headerText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "#121212"
  },
  giftSection: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  giftTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    color: "#121212",
    marginBottom: 15
  },
  giftItem: {
    backgroundColor: "#E6E6E6",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2
  },
  giftName: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: "#121212"
  },
  giftDescription: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#121212",
    marginVertical: 10
  },
  actionButton: {
    backgroundColor: "#E6E6E6",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 2
  },
  actionText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#121212"
  }
});

export default GiftScreen;

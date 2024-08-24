import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

function ProfileScreen(props: any) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FeatherIcon name="arrow-left" style={styles.backIcon}></FeatherIcon>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      
      {/* Profile Details */}
      <View style={styles.profileSection}>
        <Text style={styles.userName}>Asel Turatbek</Text>
        <Text style={styles.userEmail}>asel.turatbek@example.com</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
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
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  userName: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    color: "#121212",
    marginTop: 10
  },
  userEmail: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#121212",
    marginTop: 5
  },
  actionsSection: {
    marginTop: 30,
    paddingHorizontal: 20
  },
  actionButton: {
    backgroundColor: "#E6E6E6",
    borderRadius: 25,
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2
  },
  actionText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: "#121212"
  }
});

export default ProfileScreen;

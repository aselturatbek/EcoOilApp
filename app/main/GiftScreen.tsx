import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get("window");

function GiftScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGift, setSelectedGift] = useState<{ name: string; points: string; description: string } | null>(null);

  const gifts = [
    { name: "Bisiklet", points: "1000 Puan", description: "Harika bir bisiklet kazanın!" },
    { name: "Kupa", points: "500 Puan", description: "Özel tasarım bir kupa." },
    { name: "T-Shirt", points: "300 Puan", description: "EcoOil tasarımlı rahat bir tişört." },
    { name: "Çanta", points: "700 Puan", description: "Şık ve kullanışlı bir çanta." },
  ];

  const openModal = (gift: { name: string; points: string; description: string }) => {
    setSelectedGift(gift);
    setModalVisible(true);
  };

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Transparan Banner */}
          <View style={styles.banner}>
            <Text style={styles.title}>Geri Dönüştür, {"\n"}Ödüller Kazan!</Text>
            <View style={styles.pointsContainer}>
              <Image
                  source={require("../assets/images/final_clean_logo.png")}
                  style={styles.pointsIcon}
              />
              <Text style={styles.pointsText}>1000 Puan</Text>
            </View>
          </View>

          {/* Arama Butonu */}
          <View style={styles.searchSection}>
            <TextInput
                style={styles.searchInput}
                placeholder="Hediye arayın..."
                placeholderTextColor="rgba(0,77,64,0.5)"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FeatherIcon name="search" style={styles.searchIcon} />
          </View>

          {/* Kartlar */}
          <View style={styles.cardsRow}>
            {gifts.map((gift, index) => (
                <TouchableOpacity key={index} onPress={() => openModal(gift)} style={styles.card}>
                  <Image source={require("../assets/images/final_clean_logo.png")} style={styles.cardImage} />
                  <Text style={styles.giftName}>{gift.name}</Text>
                  <Text style={styles.cardPoints}>{gift.points}</Text>
                </TouchableOpacity>
            ))}
          </View>

          {/* Modal */}
          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedGift && (
                    <>
                      <Text style={styles.modalTitle}>{selectedGift.name}</Text>
                      <Text style={styles.modalPoints}>{selectedGift.points}</Text>
                      <Text style={styles.modalDescription}>{selectedGift.description}</Text>
                      <TouchableOpacity
                          style={styles.buyButton}
                          onPress={() => alert("Satın alma işlemi başlatıldı!")}
                      >
                        <Text style={styles.buyButtonText}>Satın Al</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButton}>Kapat</Text>
                      </TouchableOpacity>
                    </>
                )}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  banner: {
    backgroundColor: "rgba(2,117,97,0.22)",
    borderRadius: 20,
    width: width * 1,
    paddingVertical: 40,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    color: "#004d40",
    textAlign: "center",
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#004d40",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 5,
  },
  pointsIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  pointsText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    color: "#ffffff",
  },
  searchSection: {
    flexDirection: "row",
    width: width * 0.9,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#004d40",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#004d40",
  },
  searchIcon: {
    fontSize: 24,
    color: "#004d40",
  },
  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: width * 0.9,
  },
  card: {
    backgroundColor: "#004d40",
    opacity: 0.8,
    borderRadius: 20,
    width: width * 0.43,
    height: height * 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  giftName: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  cardPoints: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  modalPoints: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    marginBottom: 10,
    color: "#004d40",
  },
  modalDescription: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: "#004d40",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buyButtonText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: "white",
  },
  closeButton: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#004d40",
  },
});

export default GiftScreen;

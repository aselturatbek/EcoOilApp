import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function LocationScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.6354,  // Bartın'ın başlangıç noktası
          longitude: 32.3370, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 41.6354, longitude: 32.3370 }} // Bartın marker konumu
          title="Atık Yağ Toplama Noktası"
          description="Bu noktada atık yağlarınızı geri dönüştürebilirsiniz."
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

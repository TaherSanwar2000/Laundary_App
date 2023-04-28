import { View, Text, Pressable, Dimensions, ToastAndroid } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Maps = () => {

const navigation = useNavigation();


  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(" ");

  const handleRegionChangeComplete = (region, details) => {
    console.log("Current Region:", region);
    getCurrentLocation(region.latitude, region.longitude);
  };

  const getCurrentLocation = async (latitude, longitude) => {
    let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    console.log(response);
    for (let item of response) {
      let address = `${item.district} ${item.city} ${item.postalCode}`;
      setDisplayCurrentAddress(address);
    }
  };

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <MapView
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          position: "absolute",
        }}
        region={mapRegion}
        onRegionChangeComplete={handleRegionChangeComplete}
      ></MapView>

      <Entypo
        name="location-pin"
        size={50}
        color="red"
        style={{ flex: 1, marginTop: 300 }}
      />

      <View
        style={{
          flexDirection: "column",
          width: Dimensions.get("window").width,
          padding:10,
          marginHorizontal:10,
          backgroundColor: "white",
          
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: Dimensions.get("window").width,
            marginVertical: 20,
          }}
        >
          <Entypo
            name="location-pin"
            size={30}
            color="red"
            style={{ marginLeft: 10 }}
          />
          <Pressable
            style={{ marginLeft: 10 }}
          >
            <Text style={{ fontSize: 20, fontWeight: 400 }}>
              {displayCurrentAddress}
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            
            navigation.navigate('Home',{
                address: displayCurrentAddress
            })
          }}
          style={{
            width: Dimensions.get("window").width - 30,
            backgroundColor: "#002D62",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
            Confirm Your Location
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Maps;

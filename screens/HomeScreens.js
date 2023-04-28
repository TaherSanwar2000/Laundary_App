import {
  Text,
  View,
  Alert,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import Dresses from "../components/Dresses";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../productReducer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { AntDesign } from "@expo/vector-icons";

const HomeScreens = () => {
  const route = useRoute();
  const [items, setItems] = useState([]);

  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Finding Your Location.."
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  useEffect(() => {
    checkIfLocatoinEnabled();
    getCurrentLocation();
  }, []);

  checkIfLocatoinEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert("Location is Not Enabled", "Please Enabled the location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Please Allow the Permission", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    let { coords } = await Location.getCurrentPositionAsync();
    console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(response);
      for (let item of response) {
        let address = `${item.district} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = async () => {
      const colRef = collection(db, "type");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });

      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);

  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", marginTop: 35, padding: 10 }}
      >
        <View style={{ flexDirection: "row" }}>
          <Entypo
            name="location-pin"
            size={30}
            color="red"
            style={{ marginLeft: 10 }}
          />
          <Pressable
            onPress={() => navigation.navigate("Map")}
            style={{ marginLeft: 10 }}
          >
            <Text style={{ fontSize: 20, fontWeight: 400 }}>Home</Text>
            <Text style={{ fontSize: 15 }}>
              {displayCurrentAddress}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: 70 }}
          >
            <AntDesign name="user" size={35} color="black" />
          </Pressable>
        </View>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            borderWidth: 0.8,
            alignItems: "center",
            borderColor: "skyblue",
          }}
        >
          <TextInput
            placeholder="Search for items..."
            style={{ fontSize: 20 }}
          ></TextInput>
          <FontAwesome name="search" size={24} color="black" />
        </View>
        <Carousel />
        <Services />
        {product.map((item, index) => (
          <Dresses item={item} key={index} />
        ))}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable
          onPress={() => navigation.navigate("PickUp")}
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            margin: 15,
            borderRadius: 10,
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 15, fontWeight: 600, color: "white" }}>
              {" "}
              items = ${total}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "white",
                marginBottom: 5,
                marginTop: 3,
              }}
            >
              Extra charges may apply..
            </Text>
          </View>
          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: 500, color: "white" }}>
              Proceed to next..
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreens;

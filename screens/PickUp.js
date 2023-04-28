import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUp = () => {
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);
  const times = [
    {
      id: "0",
      time: "10:00 AM",
    },
    {
      id: "1",
      time: "11:00 AM",
    },
    {
      id: "2",
      time: "12:00 PM",
    },
    {
      id: "3",
      time: "1:00 PM",
    },
    {
      id: "4",
      time: "2:00 PM",
    },
  ];
  const deliveryDay = [
    {
      id: "0",
      day: "1-2 Days",
    },
    {
      id: "1",
      day: "2-3 Days",
    },
    {
      id: "2",
      day: "3-4 Days",
    },
    {
      id: "3",
      day: "4-5 Days",
    },
    {
      id: "4",
      day: "5-6 Days",
    },
  ];

  const ProceedToCart = () => {
    if (!selectedDate || !selectedDay || !selectedTime) {
      Alert.alert("Something Missing..", "Select All Detail..", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    if (selectedDate && selectedDay && selectedTime) {
      navigation.replace("CartScreen",{
        // pickUpdate:selectedDate,
        selectTime:selectedTime,
        no_of_day:selectedDay
      });
    }
  };

  return (
    <>
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 500,
            marginTop: 80,
            marginLeft: 20,
          }}
        >
          Enter Your Address...
        </Text>
        <TextInput
          style={{
            fontSize:15,
            padding: 10,
            borderWidth: 1,
            borderColor: "gray",
            paddingVertical: 10,
            borderRadius: 10,
            margin: 10,
          }}
        ></TextInput>
        <Text style={{ fontSize: 18, fontWeight: 500, marginHorizontal: 15 }}>
          Pick Up Your Date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-04-15")}
          endDate={new Date("2023-05-1")}
          initialSelectedDate={new Date("2023-04-14")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          // selectedItemTextStyle={styles.selectedItemTextStyle}
          // unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          // flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={{ fontSize: 18, fontWeight: 500, marginHorizontal: 15 }}>
          Select PickUp Time.
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.time)}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderWidth: 1,
                      borderColor: "red",
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderWidth: 1,
                      borderColor: "gray",
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={{ fontSize: 18, fontWeight: 500, marginHorizontal: 15 }}>
          Select Delivery Day.
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryDay.map((item, i) => (
            <Pressable
              key={i}
              onPress={() => setSelectedDay(item.day)}
              style={
                selectedDay.includes(item.day)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderWidth: 1,
                      borderColor: "red",
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderWidth: 1,
                      borderColor: "gray",
                    }
              }
            >
              <Text>{item.day}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {total === 0 ? null : (
        <Pressable
          onPress={ProceedToCart}
          style={{
            backgroundColor: "#088F8F",
            marginTop: "auto",
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
              {cart.length} items = ${total}
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

export default PickUp;

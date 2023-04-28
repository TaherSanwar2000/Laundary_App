import { View, Text, ScrollView, Pressable, ToastAndroid } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { cleanCart, decrementQuantity, incrementQuantity } from "../Cart";
import { decrementQty, incrementQty, cleanProduct } from "../productReducer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";


const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

    const userUid = auth.currentUser.uid;

    const PlaceOrder = async () => {
      ToastAndroid.showWithGravityAndOffset(
        'Order Confirmed',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      navigation.navigate("Order");
      dispatch(cleanCart());
      dispatch(cleanProduct())
      await setDoc(
        doc(db,"user",`${userUid}`),
        {
          orders:{...cart},
          pickUpDetails: route.params,
        },
        {
          merge:true,
        }
      )
    }

  const route = useRoute();
  return (
    <>
    <ScrollView style={{ marginTop: 50 }}>
      
        {/* <View
          style={{
            fontSize: 20,
            fontWeight: 500,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: 500, margin: 50 }}>
            Your cart is empty...
          </Text>
          <MaterialCommunityIcons name="cart-remove" size={30} color="black" />
        </View> */}
      
        <>
          <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            <AntDesign
              onPress={() => navigation.navigate("Home")}
              name="back"
              size={25}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 25, fontWeight: 500, marginLeft:20 }}>Your Bucket..</Text>
          </View>
          <Pressable
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              marginLeft: 12,
              marginRight: 12,
              padding: 10,
            }}
          >
            {cart.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 5,
                }}
              >
                <Text style={{ width: 100, fontSize: 20, fontWeight: 500 }}>
                  {item.name}
                </Text>
                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    alignItems: "center",
                    borderColor: "#BEBEBE",
                    borderWidth: 0.7,
                    borderRadius: 10,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      dispatch(decrementQuantity(item));
                      dispatch(decrementQty(item));
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: 600,
                      }}
                    >
                      -
                    </Text>
                  </Pressable>
                  <Pressable>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 8,
                        fontWeight: 600,
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      dispatch(incrementQuantity(item));
                      dispatch(incrementQty(item));
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: 600,
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Pressable>

                <Text style={{ fontSize: 20, fontWeight: 500 }}>
                  ${item.price * item.quantity}
                </Text>
              </View>
            ))}
          </Pressable>

          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ marginTop: 30, fontSize: 20, fontWeight: "bold" }}>
              Billing Details..
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  Item Total
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                  ${total}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  Delivery Fee | 2 Km
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}
                >
                  FREE
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  Free Delivery on your order
                </Text>
              </View>

              <View
                style={{
                  borderColor: "gray",
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              >
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Selected Date..
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                     {/* {route.params.pickUpdate}  */}
                  </Text>
                </View>
              
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  No. of days
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}
                >
                   {route.params.no_of_day} 
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                >
                  Selected Pick up time
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}
                >
                   {route.params.selectTime} 
                </Text>
              </View>
              
              <View
                style={{
                  borderColor: "gray",
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              >
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    To Pay..
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    ${total + 95}
                  </Text>
                </View>

              
            </View>
          </View>
        </>
      
    </ScrollView>
    {total === 0 ? null : (
        <Pressable
        onPress={PlaceOrder}
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
          <Pressable onPress={PlaceOrder}>
            <Text style={{ fontSize: 13, fontWeight: 500, color: "white" }}>
              Place Your order..
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

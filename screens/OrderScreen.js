import { Text, SafeAreaView, View, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const  navigation = useNavigation();
  return (
    <SafeAreaView>
      <LottieView
        source={require("../assets/thumbs.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 50,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 40,
          fontSize: 30,
          fontWeight: 300,
          textAlign: "center",
        }}
      >
        Your Order has been Placed
      </Text>

      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />

        <Pressable onPress={()=>{
          navigation.navigate("Home")
        }} style={{marginHorizontal:50,marginVertical:50,padding:10,borderWidth:1,borderRadius:10,backgroundColor:'#0645AD'}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}} >Go to Homepage</Text>
        </Pressable>

    </SafeAreaView>
  );
};

export default OrderScreen;

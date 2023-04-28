import { View, Text, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrementQty, incrementQty } from "../productReducer";
import { addToCart, decrementQuantity, incrementQuantity } from "../Cart";
import { AntDesign } from '@expo/vector-icons';

const Dresses = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  
  const addItemToCart = () => {
    dispatch(addToCart(item));
    dispatch(incrementQty(item));
  }

  return (
    <View>
      <Pressable
        style={{
          backgroundColor: "#F8F8F8",
          borderRadius: 8,
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <View>
          <Image
            style={{ width: 70, height: 70, margin: 10 }}
            source={{ uri: item.image }}
          />
          <Text style={{ textAlign: "center" }}>{item.name}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 500, textAlign: "center" }}>
            Price
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 400, textAlign: "center" }}>
            ${item.price}
          </Text>
        </View>

        {cart.some((c) => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
             onPress={()=>{
              dispatch(decrementQuantity(item));
              dispatch(decrementQty(item));
            }}
             
            >
             <AntDesign name="minuscircle" size={24} color="black" style={{height:40,width:30}} />
            </Pressable>

            <Pressable>
              <Text
                style={{ fontSize: 19, paddingHorizontal: 10, fontWeight: 600 }}
              >
               {" "}{item.quantity}{" "}
              </Text>
            </Pressable>
            
            <Pressable
            onPress={()=>{
              dispatch(incrementQuantity(item));
              dispatch(incrementQty(item));
            }}
        
            >
            <AntDesign name="pluscircle" size={24} color="black" style={{height:40,width:30}} />
            </Pressable>
          </Pressable>
          ) : (
          <Pressable onPress={addItemToCart} >
            <Text
              style={{
                borderRadius: 5,
                borderWidth: 1,
                width: 90,
                textAlign: "center",
                fontSize: 15,
                borderColor: "skyblue",
                padding: 3,
                fontWeight: 500,
              }}
            >
              ADD
            </Text>
          </Pressable>
          ) }
      </Pressable>
    </View>
  );
};

export default Dresses;

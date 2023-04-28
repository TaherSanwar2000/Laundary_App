import { View, ScrollView,Image, Pressable,Text} from 'react-native'
import React from 'react'

const Services = () => {
    const services = [
        {
          id: "0",
          image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
          name: "Washing",
        },
        {
          id: "11",
          image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
          name: "Laundry",
        },
        {
          id: "12",
          image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
          name: "Wash & Iron",
        },
        {
          id: "13",
          image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
          name: "Cleaning",
        },
      ];
  return (
    <View>
        <Text style={{fontSize:20,fontWeight:100,padding:10,}}>Services Available</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {services.map((taher,index)=>(
             <Pressable key={index} style={{backgroundColor:'white',margin:15}}>
                <Image source={{uri:taher.image}} style={{width:70,height:70,}}/>
                <Text style={{textAlign:'center'}}>{taher.name}</Text>
             </Pressable>
            ))}
        </ScrollView>
    </View>
  )
}

export default Services
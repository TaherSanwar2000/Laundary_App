import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../Firebase'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const signOutUser = ()=>{
    signOut(auth).then(()=>{
      navigation.replace("LoginIn");
    })
  }
  return (
    <SafeAreaView style={{flex:1,alignContent:'center',justifyContent:'center'}}>
      <Pressable>
        <Text style={{marginHorizontal:30,fontSize:25,fontWeight:800, borderWidth:1,padding:10,borderRadius:10,borderColor:"#002D62"}}>
          Welcome {user.email}
        </Text>
      </Pressable>
      <Pressable
         onPress={signOutUser}
          style={{
            width: 150,
            backgroundColor: "#002D62",
            borderRadius: 10,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
            Log out
          </Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default ProfileScreen
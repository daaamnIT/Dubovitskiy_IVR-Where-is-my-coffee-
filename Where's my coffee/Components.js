import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';
import Auth from './Token'
import Login from './UserInfo'
import {useState} from "react"


function arrowClick(){
  console.log("Arrow was clicked")
}

function editInfoClick(){
  console.log('Email: ' + Login.getInfoEmail())
  console.log('First name: ' + Login.getInfoFirstname())
  console.log('Last name: ' + Login.getInfoLastname())
  console.log('Date joined: ' + Login.getInfoJoined())
}

async function Logout(){
  console.log(Auth.getToken())
  const info = await fetch(`http://127.0.0.1:8000/api/auth/logout/`, {
    method: 'GET',
    headers: {
      Authorization: 'Token ' + Auth.getToken(),
    },
  });

  Auth.setToken('')
  Login.setInfo('anonym', 'anonym', '', '')

  console.log(Auth.getToken())
  console.log(Login.getInfoEmail())
}

async function getUserInfo(setInfo){
  const info = await fetch(`http://127.0.0.1:8000/api/me/`, {
    method: 'GET',
    headers: {
      Authorization: 'Token ' + Auth.getToken(),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    });
    const json = await info.json();
    console.log(json)
    var user_info = {
      email: json[0].fields.username,
      firstname: json[0].fields.first_name,
      lastname: json[0].fields.last_name,
      date_joined: json[0].fields.date_joined,
    }
    setInfo(user_info)
}

export default function Iphone81() {
  const [info, setInfo] = useState({
    email: 'anonym',
    firstname: '',
    lastname: '',
    date_joined: '',
  })
  // getUserInfo(setInfo)
    return (
    <View style={styles.Iphone81}>
      <View style={styles.Group066}>
        <View style={styles.Group268}>
          <TouchableOpacity onPress= {()=>arrowClick()} >
            <Image
              style={styles.KeyboardArrowLeft}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/lc1v1nwo5v-10%3A14?alt=media&token=91d7f314-17d5-4c61-9e9f-370c42d85bcb",
              }}
            />
          </TouchableOpacity>
          <Text style={styles.Txt258}>{info.firstname}</Text>
        </View>
        <View style={styles.Group775}>
          <View style={styles.Ellipse1} />
          <Text style={styles.Txt385}>{info.email}</Text>
          <TouchableOpacity onPress= {()=>editInfoClick()} >
            <View style={styles.Component1}>
              <Text style={styles.Txt816}>Изменить</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.Component11} onPress= {()=>Logout()} >
            <View style={styles.Component1}>
              <Text style={styles.Txt816}>Выйти</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Iphone81: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 48,
    paddingBottom: 364,
    paddingLeft: 11,
    paddingRight: 14,
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 375,
    height: 667,
  },
  Group133: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Txt767: {
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    color: "rgba(0,0,0,1)",
    marginBottom: 28,
  },
  Line3: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 348,
    height: 1,
    marginBottom: 30,
  },
  ButtonPrimary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 17,
    borderRadius: 4,
    backgroundColor: "rgba(93,95,239,1)",
  },
  Txt935: {
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    color: "rgba(0,0,0,1)",
  },

  Line1: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 348,
    height: 1,
    marginBottom: 26,
  },
  ButtonPrimary1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 29,
    borderRadius: 4,
    backgroundColor: "rgba(93,95,239,1)",
  },
  Txt935: {
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    color: "rgba(0,0,0,1)",
  },

  Line2: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 348,
    height: 1,
    marginBottom: 14,
  },
  ButtonPrimary2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 4,
    backgroundColor: "rgba(93,95,239,1)",
  },
  Txt935: {
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    color: "rgba(0,0,0,1)",
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  Iphone81: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 19,
    paddingBottom: 217,
    paddingLeft: 16,
    paddingRight: 28,
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 375,
    height: 667,
  },
  Group066: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 12,
  },
  Group268: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 36,
  },
  KeyboardArrowLeft: {
    width: 26,
    height: 24,
    marginRight: 125,
  },
  Txt258: {
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    color: "rgba(0,0,0,1)",
    marginLeft:-12,
  },

  Group775: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 23,
    paddingBottom: 61,
    paddingLeft: 59,
    paddingRight: 57,
    borderRadius: 45,
    backgroundColor: "rgba(196,196,196,0.18)",
    // shadowColor: "rgba(0,0,0,0.25)",
    // elevation: 0,
    // shadowOffset: { width: 0, height: 4 },
  },
  Ellipse1: {
    backgroundColor: "white",
    /*  linear-gradient(131.36deg, rgba(53,195,204,1) 2%, rgba(244,166,48,0.17) 100%, )  */
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(24,71,141,1)",
    shadowColor: "rgba(0,0,0,0.25)",
    elevation: 0,
    shadowOffset: { width: 2, height: 4 },
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  Txt385: {
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
    fontWeight: "800",
    color: "rgba(0,0,0,1)",
    marginBottom: 19,
  },
  Component1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 31,
    paddingRight: 23,
    borderRadius: 10,
    backgroundColor: "rgba(16,197,197,0.36)",
    shadowColor: "rgba(0,0,0,0.25)",
    elevation: 0,
    shadowOffset: { width: 2, height: 4 },
  },
  Component11:{
    marginTop: 14,
  },
  Txt816: {
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    fontWeight: "300",
    color: "rgba(0,0,0,1)",
  },

})
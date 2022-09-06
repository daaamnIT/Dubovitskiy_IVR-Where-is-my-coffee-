import React, {Component} from "react"
import { StyleSheet, Image, Text, View, ImageBackground, ActivityIndicator,SafeAreaView, Alert} from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';
import Auth from './Token'
import Login from './UserInfo'
import {useState, useEffect} from "react"
import { EventRegister } from 'react-native-event-listeners'
import { combineTransition } from "react-native-reanimated";
import { Svg, Path } from "react-native-svg";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();//Ignore all log notifications


export default class Profile_page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstname: 'anonym',
            lastname: '',
            date_joined: '',
            data: [],
            isLoading: true,
        };
      }

      async Logout(){
        console.log(Auth.getToken())
        const info = await fetch(`https://zkb-coffee-app.herokuapp.com/api/auth/logout/`, {
          method: 'GET',
          headers: {
            Authorization: 'Token ' + Auth.getToken(),
          },
        });
        this.setState({email: ''})
        this.setState({firstname: 'anonym'})
        this.setState({lastname: ''})
        this.setState({date_joined: ''})
        Auth.setToken('')
        console.log(this.state)
        Alert.alert("Вы вышли из своего аккаунта")
      }

      async getUserInfo(){
        const response = await fetch('https://zkb-coffee-app.herokuapp.com/api/me/', {
            method: 'GET',
            headers: {
              Authorization: 'Token ' + Auth.getToken(),
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          })
        const json = await response.json()
        console.log(json)
        this.setState({email: json[0].fields.username})
        this.setState({firstname: json[0].fields.first_name})
        this.setState({lastname: json[0].fields.last_name})
        this.setState({date_joined: json[0].fields.date_joined.slice(0, 10)})
      }
      
      componentDidMount() {
        this.listener = EventRegister.addEventListener('UserLogin', (data) => this.getUserInfo())
    }

      render(){
          return(
            <SafeAreaView>
                    <View>
        <View style = {stylesheet._Subtract}>
        </View>
        <View style = {stylesheet._Brand}>
          <View style = {stylesheet._cib_buy_me_a_coffee}>
            <Svg style = {stylesheet._Vector} fill = {"rgba(0, 0, 0, 1)"}>
            <Path fillRule = {"nonzero"} d = {"M 4.025999546051025 0.0010000000474974513 L 2.4070000648498535 3.735999822616577 L 0 3.735999822616577 L 0 7.09499979019165 L 0.9210000038146973 7.09499979019165 L 1.863999843597412 13.070000648498535 L 0.39099979400634766 13.070000648498535 L 2.3390002250671387 24.042999267578125 L 3.5879998207092285 24.027999877929688 L 4.844000339508057 32.000999450683594 L 16.735000610351562 32.000999450683594 L 16.81800079345703 31.469999313354492 L 17.989999771118164 24.02699851989746 L 19.178001403808594 24.04199981689453 L 21.121000289916992 13.069000244140625 L 19.714000701904297 13.069000244140625 L 20.6510009765625 7.093999862670898 L 21.66200065612793 7.093999862670898 L 21.66200065612793 3.734999895095825 L 19.104999542236328 3.734999895095825 L 17.479999542236328 0 L 4.025999546051025 0.0010000000474974513 Z M 4.730000019073486 1.0740000009536743 L 16.78700065612793 1.0740000009536743 L 17.812000274658203 3.4489998817443848 L 3.697000026702881 3.4489998817443848 L 4.730000019073486 1.0740000009536743 Z M 1.064000129699707 4.803999900817871 L 20.589000701904297 4.803999900817871 L 20.589000701904297 6.0320000648498535 L 1.064000129699707 6.0320000648498535 L 1.064000129699707 4.803999900817871 Z M 1.6680002212524414 14.13700008392334 L 19.85099983215332 14.13700008392334 L 18.283000946044922 22.959999084472656 L 10.746999740600586 22.880998611450195 L 3.235999584197998 22.959999084472656 L 1.6680002212524414 14.13700008392334 Z"}   strokeLinejoin = {"miter"}/>
            </Svg>
          </View>
          <View style = {stylesheet._Group_1}>
            <View style = {[stylesheet._ZKB_COFFEE, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
            <Text style = {[stylesheet._ZKB_COFFEE, {position: "relative", flexGrow: 0, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
              {this.state.firstname},
            </Text>
            </View>
            <View style = {[stylesheet._Find_Your_Coffee, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
            <Text style = {[stylesheet._Find_Your_Coffee, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
              C возвращением!
            </Text>
            </View>
          </View>
        </View>
        <View style = {[stylesheet._avtorizatsiya, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
        <Text style = {[stylesheet._avtorizatsiya, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
          Информация о Вас
        </Text>
        </View>
        <View style = {stylesheet._input_3}>
        </View>
        <View style = {[stylesheet._lastname, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
        <Text style = {[stylesheet._lastname, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
          {this.state.lastname}
          </Text>
        </View>
        <View style = {[stylesheet._last_name, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
        <Text style = {[stylesheet._adres_elektronnoi_pochti, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
          Ваша фамилия:
        </Text>
        </View>
        <View style = {stylesheet._input}>
        </View>
        <View style = {[stylesheet._Email, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
        <Text style = {[stylesheet._Email, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
          {this.state.email}
          </Text>
        </View>
        <View style = {[stylesheet._adres_elektronnoi_pochti, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
        <Text style = {[stylesheet._adres_elektronnoi_pochti, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
          Адрес электронной почты:
        </Text>
        </View>
        <View style = {stylesheet._input_2}>
        </View>
        <View style = {[stylesheet.passwordStyle, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
        <Text style = {[stylesheet.passwordStyle, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
          Вы присоединились к нам:
        </Text>
        </View>
        <View style = {[stylesheet._Parol_, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
        <Text style = {[stylesheet._Parol_, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
          {this.state.date_joined}
        </Text>
        </View>
        <View style = {[stylesheet._Zabili_, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
        </View>
        <View style = {stylesheet._Login_Button}>
          <View style = {[stylesheet._Voiti, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <TouchableOpacity onPress= {()=>this.Logout()} >
            <Text style = {[stylesheet._Voiti, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
              Выйти
            </Text> 
            </TouchableOpacity>
            </View>
        </View>
      </View>
            </SafeAreaView>
          );
      }
};

const stylesheet = StyleSheet.create({
  passwordStyle:{
    position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 580,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],

		textDecorationLine: "none",
		lineHeight: 20,
		fontSize: 12,
		color: "rgba(0, 0, 0, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
  },
	_Brand: {
		position: "absolute",
		width: 194,
		height: 49,
		transform: [
			{translateX: 110},
			{translateY: 124},
			{rotate: "0deg"},
		],
		overflow: "hidden",
		backgroundColor: "rgba(0,0,0,0)",
	},
	_cib_buy_me_a_coffee: {
		position: "absolute",
		width: 32,
		height: 32,
		borderRadius: 0,
		overflow: "hidden",
		left: 0,
		right: "auto",
		top: 0,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 5},
			{rotate: "0deg"},
		],
		backgroundColor: "rgba(255, 255, 255, 0)",
	},
	_Vector: {
		position: "absolute",
		color: "rgba(0, 0, 0, 1)",
		width: "auto",
		height: 32.000999450683594,
		borderRadius: 0,
		left: 5.170997619628906,
		right: 5.167001724243164,
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],
	},
	_Group_1: {
		position: "absolute",
		width: 155,
		height: 42,
		transform: [
			{translateX: 39},
			{translateY: 7},
			{rotate: "0deg"},
		],
		overflow: "hidden",
		backgroundColor: "rgba(0,0,0,0)",
	},
	_ZKB_COFFEE: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 0,
		right: "auto",
		top: 0,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],
		textDecorationLine: "none",
		lineHeight: 24,
		fontSize: 22,
		color: "rgba(0, 1, 19, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
	},
	_Find_Your_Coffee: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 0,
		right: "auto",
		top: 25,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],
		textDecorationLine: "none",
		fontSize: 14,
		color: "rgba(0, 1, 19, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
	},
	_avtorizatsiya: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 71,
		right: "auto",
		top: 331,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],
		textDecorationLine: "none",
		fontSize: 32,
		color: "rgba(30, 41, 59, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
	},
	_input: {
		position: "absolute",
		width: 298,
		height: 0,
		borderRadius: undefined,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgb(0,0,0)",
		left: 52,
		right: "auto",
		top: 557,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0.000005008956130975337deg"},
		],
	},
	_Email: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 527,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],
		textDecorationLine: "none",
		lineHeight: 20,
		fontSize: 14,
		color: "rgba(71, 85, 105, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
	},
	_adres_elektronnoi_pochti: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 494,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],

		textDecorationLine: "none",
		lineHeight: 20,
		fontSize: 12,
		color: "rgba(0, 0, 0, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
	},
  _last_name: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 404,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],

		textDecorationLine: "none",
		lineHeight: 20,
		fontSize: 12,
		color: "rgba(0, 0, 0, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
	},
	_input_2: {
		position: "absolute",
		width: 298,
		height: 0,
		borderRadius: undefined,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgba(0,0,0,1)",
		left: 52,
		right: "auto",
		top: 639,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0.000005008956130975337deg"},
		],
	},
  _lastname: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 440,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],

		textDecorationLine: "none",
		lineHeight: 20,
		fontSize: 12,
		color: "rgba(0, 0, 0, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
	},
	_input_3: {
		position: "absolute",
		width: 298,
		height: 0,
		borderRadius: undefined,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgba(0,0,0,1)",
		left: 52,
		right: "auto",
		top: 468,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0.000005008956130975337deg"},
		],
	},
	_Parol_: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 609,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],
		textDecorationLine: "none",
		lineHeight: 20,
		fontSize: 14,
		color: "rgba(71, 85, 105, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
	},
	_Zabili_: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 302,
		right: "auto",
		top: 589,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],
		textDecorationLine: "none",
		lineHeight: 20,
		fontSize: 14,
		color: "rgba(0, 1, 19, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
	},
	_Login_Button: {
		position: "absolute",
		width: 298,
		height: "auto",
		borderRadius: 4,
		left: 52,
		right: "auto",
		top: 658,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0deg"},
		],
		backgroundColor: "rgba(0, 1, 19, 1)",
		paddingTop: 10,
		paddingLeft: 0,
		paddingRight: 0,
		paddingBottom: 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	_Voiti: {
		position: "relative",
		width: "auto",
		height: "auto",
		minWidth: 0,
		transform: [
			{translateX: 130},
			{translateY: 0},
		],
		textDecorationLine: "none",
		lineHeight: 20,
		fontSize: 14,
		color: "rgba(255, 255, 255, 1)",
		textAlign: "left",
		textAlignVertical: "top",
		letterSpacing: 0.1,
		flexShrink: 0,
	},
});
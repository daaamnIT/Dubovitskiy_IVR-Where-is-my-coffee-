import React, { Component } from 'react';
import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, TextInputBase, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormData from 'form-data';
import Auth from './Token'
import { EventRegister } from 'react-native-event-listeners'
import { Svg, Path } from "react-native-svg";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();//Ignore all log notifications

export default class RegistrationScreen extends Component {

  emailInputRef = React.createRef();
  passwordInputRef = React.createRef();
  firstnameInputRef = React.createRef();
  lastnameInputRef = React.createRef();
  CountryInputRef = React.createRef();
  addressInputRef = React.createRef();
  zipInputRef = React.createRef();
  phoneInputRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        Country: '',
        address: '',
        zip: '',
        phone: '',
        showEmailError: false,
        showPasswordError: false,
        showFirstnameError: false,
        showLastnameError: false,
        showCountryError: false,
        showAddressError: false,
        showZipError: false,
        showPhoneError: false,
    };
    this.submitPressed = this.submitPressed.bind(this);
  }

  inputs = () => {
    return [
      this.emailInputRef,
      this.passwordInputRef,
      this.firstnameInputRef,
      this.lastnameInputRef,
      this.CountryInputRef,
      this.addressInputRef,
      this.zipInputRef,
      this.phoneInputRef,
    ];
  };

  onChangeEmailInputHandler = (value) => {
    this.setState({
      email: value,
    });
  }

  onChangePasswordInputHandler = (value) => {
    this.setState({
      password: value,
    });
  }

  onChangeFirstNameInputHandler = (value) => {
    this.setState({
        firstname: value,
    });
  }

  onChangeLastNameInputHandler = (value) => {
    this.setState({
        lastname: value,
    });
  }

  onChangeCountryInputHandler = (value) => {
    this.setState({
        Country: value,
    });
  }

  onChangeAddressInputHandler = (value) => {
    this.setState({
        address: value,
    });
  }

  onChangeZipcodeInputHandler = (value) => {
    this.setState({
        zipcode: value,
    });
  }

  onChangePhoneInputHandler = (value) => {
    this.setState({
        phone: value,
    });
  }

  async submitPressed() {
    console.log(this.state.email)
    console.log(this.state.password)
    console.log(this.state.firstname)
    console.log(this.state.lastname)
    console.log(this.state.Country)
    console.log(this.state.address)
    console.log(this.state.zip)
    console.log(this.state.phone)

    const formData = new FormData();
      formData.append('username', this.state.email);
      formData.append('password', this.state.password);
      formData.append('first_name', this.state.firstname)
      formData.append('last_name', this.state.lastname);

    const token = await fetch('https://zkb-coffee-app.herokuapp.com/api/auth/register/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: formData,
    });
    const json = await token.json();
    console.log(token)
    Auth.setToken(json.token)
    EventRegister.emit('UserLogin', '')
    console.log("TOKEN:", Auth.getToken())
	Alert.alert("Вы успешно создали аккаунт" )
  
    this.setState({
        showEmailError: this.state.email.length < 4,
        showPasswordError: this.state.password.length < 4,
        showFirstnameError: this.state.firstname.length < 4,
        showLastnameError: this.state.lastname.length < 4,
        showCountryError: this.state.Country.length < 4,
        showAddressError: this.state.address.length < 4,
        showZipError: this.state.zip.length < 4,
        showPhoneError: this.state.phone.length < 4,
        
    });
    Keyboard.dismiss();
  }

  render() {
    return (
      <ScrollView>
        <View>
          <View style = {stylesheet._Brand}>
            <View style = {stylesheet._cib_buy_me_a_coffee}>
              <Svg style = {stylesheet._Vector} fill = {"rgba(0, 0, 0, 1)"}>
              <Path fillRule = {"nonzero"} d = {"M 4.025999546051025 0.0010000000474974513 L 2.4070000648498535 3.735999822616577 L 0 3.735999822616577 L 0 7.09499979019165 L 0.9210000038146973 7.09499979019165 L 1.863999843597412 13.070000648498535 L 0.39099979400634766 13.070000648498535 L 2.3390002250671387 24.042999267578125 L 3.5879998207092285 24.027999877929688 L 4.844000339508057 32.000999450683594 L 16.735000610351562 32.000999450683594 L 16.81800079345703 31.469999313354492 L 17.989999771118164 24.02699851989746 L 19.178001403808594 24.04199981689453 L 21.121000289916992 13.069000244140625 L 19.714000701904297 13.069000244140625 L 20.6510009765625 7.093999862670898 L 21.66200065612793 7.093999862670898 L 21.66200065612793 3.734999895095825 L 19.104999542236328 3.734999895095825 L 17.479999542236328 0 L 4.025999546051025 0.0010000000474974513 Z M 4.730000019073486 1.0740000009536743 L 16.78700065612793 1.0740000009536743 L 17.812000274658203 3.4489998817443848 L 3.697000026702881 3.4489998817443848 L 4.730000019073486 1.0740000009536743 Z M 1.064000129699707 4.803999900817871 L 20.589000701904297 4.803999900817871 L 20.589000701904297 6.0320000648498535 L 1.064000129699707 6.0320000648498535 L 1.064000129699707 4.803999900817871 Z M 1.6680002212524414 14.13700008392334 L 19.85099983215332 14.13700008392334 L 18.283000946044922 22.959999084472656 L 10.746999740600586 22.880998611450195 L 3.235999584197998 22.959999084472656 L 1.6680002212524414 14.13700008392334 Z"}   strokeLinejoin = {"miter"}/>
              </Svg>
            </View>
            <View style = {stylesheet._Group_1}>
              <View style = {[stylesheet._ZKB_COFFEE, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
              <Text style = {[stylesheet._ZKB_COFFEE, {position: "relative", flexGrow: 0, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
                ZKB-COFFEE
              </Text>
              </View>
              <View style = {[stylesheet._Find_Your_Coffee, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
              <Text style = {[stylesheet._Find_Your_Coffee, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
                Find Your Coffee
              </Text>
              </View>
            </View>
          </View>
          <View style = {[stylesheet._registrazia, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <Text style = {[stylesheet._registrazia, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
            Регистрация
          </Text>
          </View>
          <View style = {[stylesheet._adres_elektronnoi_pochti, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <Text style = {[stylesheet._adres_elektronnoi_pochti, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
            Адрес электронной почты
          </Text>
          </View>
          <View style = {stylesheet._liniya_1}>
          </View>
          <View style = {[stylesheet._Email, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <TextInput style = {[stylesheet._Email, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}
            placeholder="Введите адрес электронной почты"
            returnKeyType="next"
            onChangeText={this.onChangeEmailInputHandler}
			placeholderTextColor="lightgrey"
          />
          </View>
          <View style = {[stylesheet._parol, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <Text style = {[stylesheet._parol, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
            Пароль
          </Text>
          </View>
          <View style = {[stylesheet._vvod_parol, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <TextInput style = {[stylesheet._vvod_parol, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}
            placeholder="Введите пароль"
            returnKeyType="next"
            secureTextEntry={true}
            onChangeText={this.onChangePasswordInputHandler}
			placeholderTextColor="lightgrey"
          />
          </View>
          <View style = {stylesheet._liniya_2}>
          </View>
          <View style = {[stylesheet._Name, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <Text style = {[stylesheet._Name, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
            Имя
          </Text>
          </View>
          <View style = {[stylesheet._vvod_name, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <TextInput style = {[stylesheet._vvod_name, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}
            placeholder="Введите Имя"
            returnKeyType="next"
            onChangeText={this.onChangeFirstNameInputHandler}
			placeholderTextColor="lightgrey"
          />
          </View>
          <View style = {stylesheet._liniya_3}>
          </View>
          <View style = {[stylesheet._Last_Name, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <Text style = {[stylesheet._Last_Name, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
            Фамилия
          </Text>
          </View>
          <View style = {[stylesheet._vvod_last_name, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <TextInput style = {[stylesheet._vvod_last_name, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}
            placeholder="Введите Фамилию"
            returnKeyType="next"
            onChangeText={this.onChangeLastNameInputHandler}
			placeholderTextColor="lightgrey"
          />
          </View>
          <View style = {stylesheet._liniya_4}>
          </View>
          <View style = {[stylesheet._Country, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <Text style = {[stylesheet._Country, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
            Страна
          </Text>
          </View>
          <View style = {[stylesheet._vvod_country, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
          <TextInput style = {[stylesheet._vvod_country, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}
            placeholder="Введите Страну"
            returnKeyType="next"
            onChangeText={this.onChangeCountryInputHandler}
			placeholderTextColor="lightgrey"
          />
          </View>
          <View style = {stylesheet._liniya_5}>
          </View>
          <View style = {stylesheet._registr_Button}>
            <View style = {[stylesheet._Done, {display: "flex", flexDirection: "row", alignItems: "center"}]}>
            <TouchableOpacity onPress={this.submitPressed}>
              <Text style = {[stylesheet._Done, {position: "relative", flexGrow: 1, left: 0, top: 0, height: "auto", transform: [{translateX: 0}, {translateY: 0}],}]}>
                Создать
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      );
  }
}

const stylesheet = StyleSheet.create({
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
  _registrazia: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 101,
		right: "auto",
		top: 250,
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
	_adres_elektronnoi_pochti: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 320,
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
	_Email: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 350,
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
  _liniya_1: {
		position: "absolute",
		width: 298,
		height: 0,
		borderRadius: undefined,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgba(0,0,0, 1)",
		left: 52,
		right: "auto",
		top: 380,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0.000005008956130975337deg"},
		],
	},
  _parol: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 400,
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
	_vvod_parol: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 430,
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
  _liniya_2: {
		position: "absolute",
		width: 298,
		height: 0,
		borderRadius: undefined,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgba(0,0,0,1)",
		left: 52,
		right: "auto",
		top: 460,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0.000005008956130975337deg"},
		],
	},
  _Name: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 480,
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
	_vvod_name: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 510,
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
  _liniya_3: {
		position: "absolute",
		width: 298,
		height: 0,
		borderRadius: undefined,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgb(0,0,0)",
		left: 52,
		right: "auto",
		top: 540,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0.000005008956130975337deg"},
		],
	},
  _Last_Name: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 560,
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
	_vvod_last_name: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 590,
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
  _liniya_4: {
		position: "absolute",
		width: 298,
		height: 0,
		borderRadius: undefined,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgb(0,0,0)",
		left: 52,
		right: "auto",
		top: 620,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0.000005008956130975337deg"},
		],
	},
  _Country: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 640,
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
	_vvod_country: {
		position: "absolute",
		width: "auto",
		height: "auto",
		left: 52,
		right: "auto",
		top: 670,
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
  _liniya_5: {
		position: "absolute",
		width: 298,
		height: 0,
		borderRadius: undefined,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgb(0,0,0)",
		left: 52,
		right: "auto",
		top: 700,
		bottom: "auto",
		transform: [
			{translateX: 0},
			{translateY: 0},
			{rotate: "0.000005008956130975337deg"},
		],
	},
	_registr_Button: {
		position: "absolute",
		width: 298,
		height: "auto",
		borderRadius: 4,
		left: 52,
		right: "auto",
		top: 730,
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
	_Done: {
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

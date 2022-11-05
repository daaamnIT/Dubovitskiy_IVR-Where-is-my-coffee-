import React, { Component } from 'react'
import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, View, Alert, Image, KeyboardAvoidingView, TouchableOpacity, LogBox, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Auth from '../../Token'
import Login from '../../UserInfo'
import { EventRegister } from 'react-native-event-listeners'
import { ScrollView } from 'react-native-gesture-handler'
import Svg, { Path, SvgUri } from 'react-native-svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import EStyleSheet from 'react-native-extended-stylesheet'
import { apiurl } from '../../URL'

LogBox.ignoreAllLogs()// Ignore all log notifications

const entireScreenWidth = Dimensions.get('window').width			// получение разрешения экрана

export default class LoginScreen extends Component {				// класс страницы входа в аккаунт
  emailInputRef = React.createRef()
  passwordInputRef = React.createRef()
  firstnameInputRef = React.createRef()
  lastnameInputRef = React.createRef()
  occupationInputRef = React.createRef()
  addressInputRef = React.createRef()
  zipInputRef = React.createRef()
  phoneInputRef = React.createRef()
  scrollViewRef = React.createRef()

  constructor (props) {				// конструктор
    super(props)
    this.state = {
      email: '',
      password: '',

      showEmailError: false,
      showPasswordError: false

    }
    this.submitPressed = this.submitPressed.bind(this)
  }

  inputs = () => {				// ф-ия ввода данных
    return [
      this.emailInputRef,
      this.passwordInputRef

    ]
  }

  onChangeEmailInputHandler = (value) => {			// ф-ия изменения данных в стейте
    this.setState({
      email: value
    })
  }

  onChangePasswordInputHandler = (value) => {		// ф-ия изменения данных в стейте
    this.setState({
      password: value
    })
  }

  async submitPressed () {							// ф-ия входа в аккаунт
    console.log(this.state.email)
    console.log(this.state.password)
    const formData = new FormData()
    formData.append('username', this.state.email)
    formData.append('password', this.state.password)

    const token = await fetch(apiurl + 'api/auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: formData
    })
    const jsonToken = await token.json()
    console.log(jsonToken)
    Auth.setToken(jsonToken.token)
    console.log('TOKEN:', Auth.getToken())
    EventRegister.emit('UserLogin', '')
    Keyboard.dismiss()
    if (typeof Auth.getToken() === 'undefined') {
      Alert.alert('Не получилось войти', 'Возможно вы ввели что-то не так')
    } else { Alert.alert('Вы вошли в свой профиль') }
  }

  render () {			// рендер информации на странице
    return (
		<SafeAreaView style={styles.container}>
			  <ScrollView style={styles.scrollView}>
				  <KeyboardAvoidingView
					style={{ flex: 1 }}
					keyboardVerticalOffset={100}
					behavior={'position'}
					>
						<View style = {styles.row}>
							<View style = {styles.svg}>
								<Image
									style={styles.tinyLogo}
									source={{ uri: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/buy_me_a_coffee_logo_icon_145434.png' }}
								/>
								</View>
								<View style = {styles.headers}>
									<View>
										<Text style = {styles.h1}>WHERE'S MY</Text>
									</View>
									<View>
										<Text style = {styles.h2}>COFFEE</Text>
									</View>
								</View>
							</View>
						<View style = {styles.mainheader}>
							<Text style = {styles.h3}>Авторизация</Text>
						</View>

						<View style = {styles.allinp}>

							<View style = {styles.names}>
								<Text style = {styles.names}>Адрес электронной почты</Text>
							</View>

							<View style = {styles.inputs}>
								<TextInput style = {styles.placeholder}
									placeholder="Почта"
									returnKeyType="next"
									onChangeText={this.onChangeEmailInputHandler}
									placeholderTextColor="lightgrey"
								/>
							</View>
							<View
									style={{
									  borderBottomColor: 'black',
									  borderBottomWidth: 2

									}}
								/>

							<View style = {styles.names}>
								<Text style = {styles.names}>Ваш пароль</Text>
							</View>

							<View style = {styles.inputs}>
								<TextInput style = {styles.placeholder}
									placeholder="Пароль"
									returnKeyType="next"
									onChangeText={this.onChangePasswordInputHandler}
									placeholderTextColor="lightgrey"
									secureTextEntry={true}
								/>
								<View
									style={{
									  borderBottomColor: 'black',
									  borderBottomWidth: 2,
									  borderBottomRadius: 10
									}}
								/>
							</View>
						</View>
						<View style = {styles.button_main}>
							<TouchableOpacity style = {styles.button_opac} onPress= {() => this.submitPressed()}>
								<Text style = {styles.button_text}>Войти</Text>
							</TouchableOpacity>
						</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>

    )
  }
}

// стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
	  },
	  scrollView: {
    // marginHorizontal: 20,
    // backgroundColor: "#7cb48f",
    height: '10%'
	  },
	  row: {
    marginTop: '20%',
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row'
	  },
	  svg: {
    // backgroundColor: "#7cb48f",
    flex: 0,
    width: 50 * (entireScreenWidth / 380),
    height: 50 * (entireScreenWidth / 380),
    margin: 4
	  },
	  h1: {
		  fontSize: 19 * (entireScreenWidth / 380)
	  },
	  h2: {
		  fontSize: 30 * (entireScreenWidth / 380),
		  fontWeight: '500'
	  },
	  headers: {
		  flexDirection: 'column',
		  flex: 0
	  },
	  mainheader: {
    marginTop: '15%',
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
	  },
	  h3: {
		  fontSize: 42,
		  fontWeight: '600'
    //   textDecorationLine: 'underline',

	  },
	  tinyLogo: {
    width: 50 * (entireScreenWidth / 380),
    height: 50 * (entireScreenWidth / 380)
	  },
	  allinp: {
    flex: 1,
    flexDirection: 'column',
    marginTop: '15%',
    // backgroundColor: "#7cb48f",
    alignSelf: 'center',
    // justifyContent: 'center',
    width: 280 * (entireScreenWidth / 380),
    height: 110 * (entireScreenWidth / 380)
	  },
	  names: {
    marginTop: 7 * (entireScreenWidth / 380),
    left: 0,
    fontSize: 12 * (entireScreenWidth / 380)
	  },
	  inputs: {
		  marginTop: 5 * (entireScreenWidth / 380)
	  },
	  placeholder: {
    fontSize: 9 * (entireScreenWidth / 380),
    // textDecorationLine: 'underline',
    alignSelf: 'flex-start',
    // backgroundColor: 'green',
    width: 280 * (entireScreenWidth / 380)
	  },
	  button_main: {
    justifyContent: 'center',
    alignItems: 'center'
	  },
	  button_opac: {
    width: 280 * (entireScreenWidth / 380),
    height: 20 * (entireScreenWidth / 380),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5 * (entireScreenWidth / 380)
	  },
	  button_text: {
    fontSize: 10 * (entireScreenWidth / 380),
    color: 'rgba(255, 255, 255, 1)'
	  }
})

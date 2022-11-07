import React, { Component } from 'react'
import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, TextInputBase, View, Alert, KeyboardAvoidingView, Image, TouchableOpacity, FlatList, LogBox, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FormData from 'form-data'
import Auth from '../../Token'
import { EventRegister } from 'react-native-event-listeners'
import { Svg, Path } from 'react-native-svg'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiurl } from '../../URL'
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath'

LogBox.ignoreAllLogs()// Ignore all log notifications

const entireScreenWidth = Dimensions.get('window').width			// получение разрешения экрана

export default class Profile_page extends Component {				// класс профиля
  constructor (props) {											// конструктор
    super(props)
    this.state = {
      email: '',
      firstname: 'anonym',
      lastname: '',
      date_joined: '',
      is_owner: 'none',
      data: [],
      isLoading: true,
      favourite: []
    }
  }

  async Logout () {												// ф-ия выхода из аккаунта
    console.log(Auth.getToken())
    const info = await fetch(apiurl + 'api/auth/logout/', {
      method: 'GET',
      headers: {
        Authorization: 'Token ' + Auth.getToken()
      }
    })
    this.setState({ email: '' })
    this.setState({ firstname: 'anonym' })
    this.setState({ lastname: '' })
    this.setState({ date_joined: '' })
    this.setState({ is_owner: 'none' })
    this.setState({ favourite: [] })
    Auth.setToken('noToken')
    console.log(this.state)
    console.log(Auth.getToken())
    Alert.alert('Вы вышли из своего аккаунта')
  }

  async getUserInfo () {											// ф-ия получения информации о юзере
    const response = await fetch(apiurl + 'api/me/', {
      method: 'GET',
      headers: {
        Authorization: 'Token ' + Auth.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    console.log(json)
    this.setState({ email: json[0].fields.username })
    this.setState({ firstname: json[0].fields.first_name })
    this.setState({ lastname: json[0].fields.last_name })
    this.setState({ date_joined: json[0].fields.date_joined.slice(0, 10) })

    const response2 = await fetch(apiurl + 'api/status/', {
      method: 'GET',
      headers: {
        Authorization: 'Token ' + Auth.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const json2 = await response2.json()
    this.setState({ is_owner: json2[0].fields.is_Owner })
    console.log(this.state.is_owner)
  }

	  async getFavourite () {
		  if (Auth.getToken != 'noToken') {
      const response = await fetch(apiurl + 'api/get_favourite/', {
        method: 'GET',
        headers: {
				  Authorization: 'Token ' + Auth.getToken(),
				  Accept: 'application/json',
				  'Content-Type': 'application/json'
        }
			  })
      const json = await response.json()
      console.log(json)
      this.setState({ favourite: json })
		  }
    console.log('Favourite')
    console.log(this.state.favourite)
	  }

  componentDidMount () {			// то, что должно выполнятся при первом создании страницы
    this.getUserInfo()
    this.getFavourite()
    this.listener = EventRegister.addEventListener('UserLogin', (data) => this.getUserInfo())
    this.listener = EventRegister.addEventListener('UserLogin', (data) => this.getFavourite())
  }

  Error = () => {			// обработка статуса пользователя
    if (this.state.is_owner == 'True') {
      return <Text>Вы владелец</Text>
    } else if (this.state.is_owner == 'False') {
      return <Text>Вы пользователь</Text>
    } else {
      return <Text>Вы не вошли</Text>
    }
  }

  // ShopList = () => {
  // 	if(Auth.getToken() != 'noToken'){
  // 		return (
  // 			<Text>Тут что-то должно быть</Text>
  // 			// <FlatList
  // 			// 	data={this.state.favourite}
  // 			// 	renderItem={({ item }) => (
  // 			// 		<Text style={styles.textinfo}>{item.fields.shop_name}</Text>
  // 			// 	)}
  // 			// 	keyExtractor={item => item.pk}
  // 			// />
  // 		)
  // 	}else{
  // 		return <Text>Авторизуйтесь для просмотра подробной информации</Text>
  // 	}
  // }

  ShopList = () => {			// обработка статуса пользователя
    if (Auth.getToken() != 'noToken') {
      return (
      <View>
        <Text style={styles.hinfo}>Ибранные кофейни</Text>
        <FlatList
          data={this.state.favourite}
          renderItem={({ item }) => (
            <Text style={styles.textinfo}>{item.fields.shop_name}</Text>
          )}
          keyExtractor={item => item.pk}
        />
      </View>
      )
    } else {
      return <Text style={styles.infonot}>Авторизуйтесь для просмотра подробной информации</Text>
    }
  }

  render () {		// рендер информации страницы
    return (
		<SafeAreaView style={styles.container}>
		<ScrollView style={styles.scrollView}>
				  <View style = {styles.row}>
					  <View style = {styles.svg}>
						  <Image
							  style={styles.tinyLogo}
							  source={{ uri: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/buy_me_a_coffee_logo_icon_145434.png' }}
						  />
						</View>
						<View style = {styles.headers}>
							<View>
								<Text style = {styles.h1}>C возвращением!</Text>
							</View>
							<View>
								<Text style = {styles.h2}>{this.state.firstname}</Text>
							</View>
						</View>
					</View>
				  <View style = {styles.mainheader}>
					  <Text style = {styles.h3}>Информация о Вас</Text>
				  </View>

				  <View style = {styles.allinp}>

					  <View style = {styles.names}>
						  <Text style = {styles.names}>Ваша фамилия:</Text>
					  </View>

					  <View style = {styles.inputs}>
					  	<Text>
							{this.state.lastname}
						</Text>
					  </View>
					  <View
						style={{
						  borderBottomColor: 'black',
						  borderBottomWidth: 2
						}}
						/>

						<View style = {styles.names}>
						  <Text style = {styles.names}>Адрес электронной почты:</Text>
					  </View>

					  <View style = {styles.inputs}>
					  	<Text>
							{this.state.email}
						</Text>
					  </View>
					  <View
						style={{
						  borderBottomColor: 'black',
						  borderBottomWidth: 2
						}}
						/>

					  <View style = {styles.names}>
						  <Text style = {styles.names}>Вы присоединились к нам:</Text>
					  </View>

					  <View style = {styles.inputs}>
					  	<Text>
							{this.state.date_joined}
						</Text>
					  </View>
					  <View
						style={{
						  borderBottomColor: 'black',
						  borderBottomWidth: 2
						}}
						/>

						<View style = {styles.names}>
						  <Text style = {styles.names}>Ваш статус:</Text>
					    </View>

					  <View style = {styles.inputs}>
						  <this.Error />
					  </View>
					  <View
						style={{
						  borderBottomColor: 'black',
						  borderBottomWidth: 2
						}}
						/>
						<View style = {styles.button_main}>
							<TouchableOpacity style = {styles.button_opac} onPress= {() => this.Logout()}>
								<Text style = {styles.button_text}>Выйти</Text>
							</TouchableOpacity>
						</View>
						<View>
							<this.ShopList />
						</View>
				  </View>

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
    marginTop: '10%',
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
		  fontSize: 14 * (entireScreenWidth / 380)
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
    marginTop: '10%',
    // backgroundColor: "#7cb48f",
    alignSelf: 'center',
    // justifyContent: 'center',
    width: 280 * (entireScreenWidth / 380),
    height: 500 * (entireScreenWidth / 380)
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
    marginTop: 5 * (entireScreenWidth / 380),
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
	  },
    infonot:{
      alignContent:'center',
      textAlign: 'center',
      marginTop: '5%',
    },
    textinfo:{
      borderRadius:10,
      borderWidth:2,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: '2%'
    },
    hinfo:{
      fontSize: 24 * (entireScreenWidth / 380),
      marginTop: 15 * (entireScreenWidth / 380),
      textAlign: 'center',
      textDecorationLine: 'underline',
      marginBottom: 5 * (entireScreenWidth / 380)
    }
})
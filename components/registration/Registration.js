import React, { Component } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native'
import FormData from 'form-data'
import { EventRegister } from 'react-native-event-listeners'
import { SafeAreaView } from 'react-native-safe-area-context'
import Auth from '../../Token'
import Login from '../../UserInfo'
import { apiurl } from '../../URL'

LogBox.ignoreAllLogs()// Ignore all log notifications

const entireScreenWidth = Dimensions.get('window').width
// const [selectedLanguage, setSelectedLanguage] = useState();
// const navigation = useNavigation();

export default class RegistrationScreen extends Component { // класс регистарции пользователя
  state = {
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
    user: ''
  }

  emailInputRef = React.createRef()
  passwordInputRef = React.createRef()
  firstnameInputRef = React.createRef()
  lastnameInputRef = React.createRef()
  CountryInputRef = React.createRef()
  addressInputRef = React.createRef()
  zipInputRef = React.createRef()
  phoneInputRef = React.createRef()
  scrollViewRef = React.createRef()

  constructor (props) { // конструктор
    super(props)
    const { navigation } = this.props

    this.submitPressed = this.submitPressed.bind(this)
    this.onChangeEmailInputHandler = this.onChangeEmailInputHandler.bind(this)
    this.onChangePasswordInputHandler = this.onChangePasswordInputHandler.bind(this)
    this.onChangeFirstNameInputHandler = this.onChangeFirstNameInputHandler.bind(this)
    this.onChangeLastNameInputHandler = this.onChangeLastNameInputHandler.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.Redirect = this.Redirect.bind(this)
  }

  updateUser = (user) => { // апдейтер
    this.setState({ user })
  }

  inputs = () => { // обработка ввода
    return [
      this.emailInputRef,
      this.passwordInputRef,
      this.firstnameInputRef,
      this.lastnameInputRef,
      this.CountryInputRef,
      this.addressInputRef,
      this.zipInputRef,
      this.phoneInputRef
    ]
  }

  onChangeEmailInputHandler = (value) => { // изменение стейта вводимых данных
    this.setState({
      email: value
    })
  }

  onChangePasswordInputHandler = (value) => { // изменение стейта вводимых данных
    this.setState({
      password: value
    })
  }

  onChangeFirstNameInputHandler = (value) => { // изменение стейта вводимых данных
    this.setState({
      firstname: value
    })
  }

  onChangeLastNameInputHandler = (value) => { // изменение стейта вводимых данных
    this.setState({
      lastname: value
    })
  }

  Redirect () { // переход на другу страницу
    console.log('redirection to owner registration')
    this.props.navigation.navigate('Регистрация', {
      screen: 'Регистрация владельца'
    })
  }

  async submitPressed () { // ф-ия обработки регестрации
    console.log(this.state.email)
    console.log(this.state.password)
    console.log(this.state.firstname)
    console.log(this.state.lastname)
    console.log(this.state.Country)
    console.log(this.state.address)
    console.log(this.state.zip)
    console.log(this.state.phone)
    if (this.state.email != '' && this.state.password != '' && this.state.firstname != '' && this.state.lastname != '' &&  this.state.email.length >= 5 && this.state.password.length >= 5){
    const formData = new FormData()
    formData.append('username', this.state.email)
    formData.append('password', this.state.password)
    formData.append('first_name', this.state.firstname)
    formData.append('last_name', this.state.lastname)

    const token = await fetch(apiurl + 'api/auth/register/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "multipart/form-data"
      },
      body: formData
    })

    const json = await token.json()
    console.log(token)
    Auth.setToken(json.token)
    EventRegister.emit('UserLogin', '')
    EventRegister.emit('UpdateTab', '')
    console.log('TOKEN:', Auth.getToken())
    Alert.alert('Вы успешно создали аккаунт')

    this.setState({
      showEmailError: this.state.email.length < 4,
      showPasswordError: this.state.password.length < 4,
      showFirstnameError: this.state.firstname.length < 4,
      showLastnameError: this.state.lastname.length < 4,
      showCountryError: this.state.Country.length < 4,
      showAddressError: this.state.address.length < 4,
      showZipError: this.state.zip.length < 4,
      showPhoneError: this.state.phone.length < 4

    })
    Keyboard.dismiss()

    const formDataStatus = new FormData()
    formDataStatus.append('username', this.state.email)
    formDataStatus.append('is_Owner', 'False')
    console.log(formDataStatus)

    fetch(apiurl + 'setStatus/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "multipart/form-data"
      },
      body: formDataStatus
    })

    Login.setStatus('False')
  }else{
    Alert.alert("Возможно вы ввели что-то не так", "Поля не должны быть пустые, а также почта и пароль должны иметь длину больше 4")
  }
  }

  // рендер страницы
  render () {
    return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        keyboardVerticalOffset={100}
                        behavior={'position'}
                    >
                        <View style={styles.row}>
                            <View style={styles.svg}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={{ uri: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/buy_me_a_coffee_logo_icon_145434.png' }}
                                />
                            </View>
                            <View style={styles.headers}>
                                <View>
                                    <Text style={styles.h1}>WHERE'S MY</Text>
                                </View>
                                <View>
                                    <Text style={styles.h2}>COFFEE</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.mainheader}>
                            <Text style={styles.h3}>Регистрация</Text>
                        </View>

                        <View style={styles.allinp}>

                            <View style={styles.names}>
                                <Text style={styles.names}>Адрес электронной почты</Text>
                            </View>

                            <View style={styles.inputs}>
                                <TextInput style={styles.placeholder}
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

                            <View style={styles.names}>
                                <Text style={styles.names}>Ваш пароль</Text>
                            </View>

                            <View style={styles.inputs}>
                                <TextInput style={styles.placeholder}
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
                                <View style={styles.names}>
                                    <Text style={styles.names}>Имя</Text>
                                </View>

                                <View style={styles.inputs}>
                                    <TextInput style={styles.placeholder}
                                               placeholder="Ваше имя"
                                               returnKeyType="next"
                                               onChangeText={this.onChangeFirstNameInputHandler}
                                               placeholderTextColor="lightgrey"
                                    />
                                    <View
                                        style={{
                                          borderBottomColor: 'black',
                                          borderBottomWidth: 2,
                                          borderBottomRadius: 10
                                        }}
                                    />
                                </View>
                                <View style={styles.names}>
                                    <Text style={styles.names}>Фамилия</Text>
                                </View>

                                <View style={styles.inputs}>
                                    <TextInput style={styles.placeholder}
                                               placeholder="Ваша фамилия"
                                               returnKeyType="next"
                                               onChangeText={this.onChangeLastNameInputHandler}
                                               placeholderTextColor="lightgrey"
                                    />
                                    <View
                                        style={{
                                          borderBottomColor: 'black',
                                          borderBottomWidth: 2,
                                          borderBottomRadius: 10
                                        }}
                                    />
                                </View>

                                {/* <View style={styles.names}> */}
                                {/*    <Text style={styles.names}>Выберите тип аккаунта</Text> */}
                                {/* </View> */}

                                {/* <View style={styles.picker}> */}
                                {/*    <Picker selectedValue={this.state.user} onValueChange={this.updateUser}> */}
                                {/*        <Picker.Item label="User" value="user"/> */}
                                {/*        <Picker.Item label="Owner" value="owner"/> */}
                                {/*    </Picker> */}
                                {/*    <Text style={styles.text}>{this.state.user}</Text> */}
                                {/* </View> */}

                            </View>
                        </View>
                        <View style={styles.button_main}>
                            <TouchableOpacity style={styles.button_opac} onPress={this.submitPressed}>
                                <Text style={styles.button_text}>Зарегестрироваться</Text>
                            </TouchableOpacity>
                        </View>
                      <View style={styles.owner}>
                                <TouchableOpacity onPress={this.Redirect}>
                                    <Text style={styles.ownerreg}>↓ Вы владелец? Зарагеструйтесь тут ↓</Text>
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
    marginTop: '10%',
    // backgroundColor: "#7cb48f",
    alignSelf: 'center',
    // justifyContent: 'center',
    width: 280 * (entireScreenWidth / 380),
    height: 260 * (entireScreenWidth / 380)
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
    // marginTop: 20 * (entireScreenWidth / 380),
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
  owner: {
    marginTop: 130 * (entireScreenWidth / 380),
    justifyContent: 'center',
    alignItems: 'center'
  },
  ownerreg: {
    color: 'purple'
  }
})

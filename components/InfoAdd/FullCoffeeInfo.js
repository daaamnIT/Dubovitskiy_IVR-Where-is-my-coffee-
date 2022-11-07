import * as React from 'react'
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { Text, View, TouchableHighlight, TextInput, FlatList, ActivityIndicator, Keyboard, TouchableOpacity, StyleSheet, Dimensions, Button, Alert, LogBox } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MapView, { Marker, Callout } from 'react-native-maps'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Component } from 'react/cjs/react.production.min'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import FormData from 'form-data'
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown'
import Auth from '../../Token'
import IpAdress from '../../getIP'
import Login from '../../UserInfo'
import { EventRegister } from 'react-native-event-listeners'
import { Rating, AirbnbRating } from 'react-native-ratings'
import MultiSelect from 'react-native-multiple-select'
import { apiurl } from '../../URL'

LogBox.ignoreAllLogs()// Ignore all log notifications

const entireScreenWidth = Dimensions.get('window').width			// получение разрешения экрана
const res = (entireScreenWidth / 380)

function reportPostNotExist (coffee_id_1) { // useless
  console.log(coffee_id_1)
}

let rate = null // переменная рейтинга

  const Grid_Header = () => {
    return (
      <View style={{
        height: 0*res,
        width: 300*res,

        // backgroundColor: "#FF6F00",
        justifyContent: 'center',
        alignItems: 'center'
      }}>
 
        <Text style={{ fontSize: 10*res, color: 'white' }}> В кофейне:</Text>
 
      </View>
    );
  }

export default class Full_About_Coffee extends Component { // класс экрана
  commentInputRef = React.createRef()

  constructor (props) { // конструктор
    super(props)
    this.state = {
      email: '',
      info: props.route.params.info,
      coffee_id: props.route.params.shop_id,
      text1: '',
      data: [],
      isLoading: true,
      reportReason: '',
      username: '',
      selectedItems: [],
      infodata: []
    }
    console.log(this.state.coffee_id)
    console.log(Login.getInfoFirstname())
    this.submitPressed = this.submitPressed.bind(this)
    this.ratingCompleted = this.ratingCompleted.bind(this)
    this.ratingPas = this.ratingPas.bind(this)
    this.AddInfo = this.AddInfo.bind(this)
    this.addToFavourite = this.addToFavourite.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.InfoList = this.InfoList.bind(this)
  }

  async getComments () { // функция получения комментов
    try {
      console.log(Auth.getToken())
      const response = await fetch(apiurl + 'comments_list/' + this.state.coffee_id + '/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      let json = await response.json()
      json = json.reverse()
      console.log(json)
      this.setState({ data: json })
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  async getUserInfo () { // ф-ия получения информации о пользователе
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
    this.setState({ username: json[0].fields.first_name })
    this.setState({ email: json[0].fields.username })
  }

  async getInfo () { // функция получения комментов
    try {
      console.log(Auth.getToken())
      const response = await fetch(apiurl + 'info_list/' + this.state.coffee_id + '/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': "multipart/form-data"
        }
      })
      let json = await response.json()
      json = json.reverse()
      console.log(json)
      this.setState({ infodata: json })
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isLoading: false })
    }
    console.log('INFOOOOOOO')
    console.log(this.state.infodata)
  }

  componentDidMount () { // ф-ии, которые должны выполнятся при первом запуске экрана
    this.listener = EventRegister.addEventListener('FullCoffeeInfo', (infodata) => this.getInfo())
    this.getComments()
    this.getUserInfo()
    this.getInfo()
  }

  inputs = () => { // ф-ия для ввода данных
    return [
      this.commentInputRef
    ]
  }

  onChangeCommentlInputHandler = (value) => { // ф-ия сохранения комментов в стейт
    this.setState({
      text1: value
    })
  }

  reportSystem () { // система репортов
    console.log('Test')
  }

  submitPressed () { // ф-ия записи коммента в бд
    console.log(this.state.text1)
    console.log(this.state.coffee_id)
    const formData = new FormData()
    formData.append('text', this.state.text1)
    formData.append('author', this.state.username)
    formData.append('coffee_shop_id', this.state.coffee_id)
    fetch(apiurl + 'comment_post/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "multipart/form-data"
      },
      body: formData
    }).then(() => this.getComments())
    Keyboard.dismiss()
  }

  ratingCompleted (rating) {
    rate = rating
    console.log(rate)
  }

  ratingPas () { // ф-ия записи рейтинга
    Alert.alert('Спасибо, что оставляете оценки', 'Вы делаете наш мир лучше!')
    const formData = new FormData()
    formData.append('rate', rate)
    formData.append('coffee_shop_id', this.state.coffee_id)
    fetch(apiurl + 'setRating/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "multipart/form-data"
      },
      body: formData
    }).then(() => EventRegister.emit('Rate', ''))
  }

  AddInfo () {
    console.log(1)
    this.props.navigation.navigate('Информация', {
      screen: 'AddInfo',
      params: { // В параметры передает всю информацию о маркере и его id
        info: this.state.info,
        shop_id: this.state.coffee_id
      }
    })
  }

  reportPressed () { // ф-ия обрабатывающая окно репортов
    Alert.alert(
      'Жалоба на эту кофейню',
      'Выберите причину',
      [
        {
          text: 'Этой кофейни не существует',
          onPress: () => Alert.alert(
            'Жалоба отправлена'
          )
        },
        {
          text: 'Отменить',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Оскорбительное описание',
          onPress: () => Alert.alert(
            'Жалоба отправлена'
          )
        },
        {
          text: 'Оскорбительные комментарии',
          onPress: () => Alert.alert(
            'Жалоба отправлена'
          )
        }
      ]
    )
  }

  addToFavourite () {
    if (Auth.getToken() != 'noToken') {
      const formData = new FormData()
      formData.append('shop_id', this.state.coffee_id)
      formData.append('username', this.state.email)
      formData.append('shop_name', this.props.route.params.info.name)
      fetch(apiurl + 'add_to_favourite/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': "multipart/form-data"
        },
        body: formData
      }).then(
        console.log('added'),
        Alert.alert('Кофейня добавлена в список избранных'),
        EventRegister.emit('UserLogin', '')
      )
    } else {
      Alert.alert('Пожалуйста авторизуйтесь')
    }
  }

  InfoList = () => {			// обработка статуса пользователя
    const { infodata, isLoading2 } = this.state
    if (this.state.infodata != []) {
      return (
        <View style={styles.info}>
            {isLoading2
              ? <ActivityIndicator/>
              : (
                <FlatList
                  style={styles.list}
                  data={infodata}
                  renderItem={({ item }) => (
                    <Text style={styles.textinfo}>• {item.fields.info}</Text>
                  )}
                  keyExtractor={item => item.pk}
                  numColumns={2}
                  key={item => item.pk}
                  ListHeaderComponent={Grid_Header}
              />
                )}
          </View>
      )
    } else {
      return <Text>Информации пока нет</Text>
    }
  }
  render () { // рендер страницы
    const { data, isLoading } = this.state
    return (
        <View style={{ flex: 1, padding: 24, backgroundColor: 'white' }}>
          <View style={styles.upBut}>
            <TouchableOpacity
              onPress={this.reportPressed}
              style={styles.Button}
            >
              <View style={styles.Component1}>
                <Text style={styles.Txt265}>Report</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.addToFavourite}
              style={styles.Button}
            >
              <View style={styles.Component1}>
                <Text style={styles.Txt265}>Love it!</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.maininfo}>
            <Text style={styles.header}>{this.props.route.params.info.name}</Text>
            <Text style={styles.text}>{this.props.route.params.info.description}</Text>
          </View>
          <View style={styles.button_main}>
            <Button style={styles.btnContainer1} color='#000' title="Добавить информацию" onPress={this.AddInfo} />
          </View>
          <this.InfoList />
          <Rating
            type='custom'
            ratingColor='#7154E0'
            ratingBackgroundColor='#fff'
            onFinishRating={this.ratingCompleted}
            imageSize={30}
          />
          <View style={styles.btnContainer}>
            <Button color='#000' title="Оставить оценку" onPress={this.ratingPas} />
          </View>
          <Text style={styles.postComment}>Оставьте свой комментарий</Text>
           <View style={styles.inputTextWrapper}>
              <TextInput
                  placeholder="Ваш комментарий"
                  style={styles.textInput}
                  returnKeyType="next"
                  onChangeText={this.onChangeCommentlInputHandler}
                  placeholderTextColor="lightgrey"
              />
          </View>
          <View style={styles.btnContainer}>
            <Button color='#000' title="Подтвердить" onPress={this.submitPressed} />
          </View>
          <Text style={styles.h2}>Комментарии</Text>
          <View style={{ flex: 1, paddingTop: 10, paddingBottom: 0 }}>
            {isLoading
              ? <ActivityIndicator/>
              : (
              <FlatList
                data={data}
                keyExtractor={({ id }, index) => index}
                renderItem={({ item }) => (
                  <Text style={styles.main}>
                    <Text style={styles.author}>Автор: {item.fields.author} {'\n'}</Text>
                    <Text style={styles.coment}>{item.fields.text}</Text>
                  </Text>
                )}
              />
                )}
          </View>

        </View>
    )
  }
};

// стили
const styles = StyleSheet.create({
  postComment: {
    textAlign: 'center',
    margin: 10 * res,
    fontSize: 20 * res,
  },
  main: {
    margin: 10 * res,
  },
  author: {
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  coment: {
    textAlign: 'center',
    marginBottom: 10 * res
  },
  container: {
    flex: 1,
    padding: 16 * res,
    paddingBottom: 100 * res
  },
  header: {
    fontSize: 36 * res,
    margin: 6 * res,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14 * res,
    textAlign: 'center',
    marginBottom: 30 * res
  },
  inputTextWrapper: {
    marginBottom: 24 * res
  },
  h2: {
    marginTop: 10 * res,
    fontSize: 30 * res,
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  textInput: {
    height: 40 * res,
    borderColor: '#000000',
    borderBottomWidth: 1,
    paddingRight: 30 * res
  },
  errorText: {
    fontSize: 10 * res
  },
  btnContainer1: {
    backgroundColor: 'white',
    marginTop: 5 * res,
    borderRadius:30,
    backgroundColor:'red',
    width: 300*res,
    alignItems:'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
  },
  button_main: {
    justifyContent: 'center',
    alignItems: 'center'
	  },
  Component1: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 8 * res,
    paddingBottom: 6 * res,
    paddingLeft: 19 * res,
    paddingRight: 18 * res,
    borderRadius: 15 * res,
    backgroundColor: 'rgba(148,155,255, 0.5)',
    shadowColor: 'rgba(0,0,0,0.25)',
    elevation: 0,
    shadowOffset: { width: 3, height: 5 },
    width: 78 * res,
    height: 32 * res
  },
  Txt265: {
    fontSize: 12 * res,
    fontWeight: '200',
    color: '#000'
  },
  Button: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10 * res,
    backgroundColor: 'white',
    marginRight: 10*res
  },
  starStyle: {
    width: 100 * res,
    height: 20 * res,
    marginBottom: 20 * res
  },
  MainContainer: {
    flex: 1,
    padding: 12 * res,
    backgroundColor: 'white'
  },

  text: {
    padding: 12 * res,
    fontSize: 15 * res,
    textAlign: 'center',
    color: 'black'
  },
  info: {
    flex: 1,
    alignItems: 'center',
    // marginTop: 5*res,
    // marginBottom: 5*res,
    // backgroundColor: 'green',
    height:100*res,
  },
  textinfo: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'rgba(148,155,255, 1)',
    borderRadius: 20,
    borderWidth:1,
    padding:5*res
  },
  upBut: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    // marginBottom: 15 * res,
    marginTop: -20*res,
    marginRight: 0
  },
  maininfo:{
    borderWidth: 1,
    borderColor: 'purple',
    // backgroundColor:'green',
    borderRadius: 50,
  },
  list: {
    // backgroundColor: 'green',
    height: 300*res
  },
})

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
  FlatList,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import FormData from 'form-data'
import { EventRegister } from 'react-native-event-listeners'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiurl } from '../../URL'

const entireScreenWidth = Dimensions.get('window').width // получение разрешения экрана

export default class Rating extends Component {
  state = {
    data: [],
    selectedId: null,
    isLoading: true
  }

  constructor (props) { // конструктор
    super(props)
    const { navigation } = this.props
    this.onPressShop = this.onPressShop.bind(this)
  }

  async getRateInfo () { // получение рейтинга
    const response = await fetch(apiurl + 'rate_list/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
	    	this.setState({ data: json })
    console.log(this.state.data)
  }

  componentDidMount () {
    this.getRateInfo()
  }

  onPressShop (id) { // ф-ия перехода на другую страницу
    this.setState({ selectedId: id.pk })
    console.log(id)
    this.props.navigation.navigate('Рейтинг', {
      screen: 'Кофейня на карте',
      params: {
        info: id,
        shop_id: id.pk
      }
    })
  }

  componentDidMount () {
    this.getRateInfo()
    this.listener = EventRegister.addEventListener('Rate', (data) => this.getRateInfo())
  }

  render () { // рендер информации
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
            <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
              <Text style={[styles.title, textColor]}>{item.fields.name} - {item.fields.rating.toFixed(1)}</Text>
            </TouchableOpacity>
    )

    const renderItem = ({ item }) => {
      const backgroundColor = item.id === this.selectedId ? '#949bff' : '#7154e0'
      const color = item.id === this.selectedId ? 'white' : 'black'

      return (
            <Item
                item={item}
                onPress={() => this.onPressShop(item)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
      )
    }

    return (

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.pk}
                    extraData={this.selectedId}
                />
            </SafeAreaView>
    )
  }
};

// стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
  },
  title: {
    fontSize: 20 * (entireScreenWidth / 380)
  }
})

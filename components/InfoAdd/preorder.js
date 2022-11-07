import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  LayoutAnimation,
  Image,
  Appearance,
  Button,
  Alert
} from 'react-native'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FormData from 'form-data'
import Auth from '../../Token'
import { EventRegister } from 'react-native-event-listeners'
import { apiurl } from '../../URL'

// Sorry for the mess
const entireScreenWidth = Dimensions.get('window').width			// получение разрешения экрана
const res = (entireScreenWidth / 380)


var items = []
console.log(items)

const items2 = []
for (let i = 0; i < 100; i++) {
  items2.push({
    id: i,
    title: `item ${i}`,
    children: [
      {
        id: `10${i}`,
        title: `child 10${i}`
      },
      {
        id: `11${i}`,
        title: `child 11${i}`
      },
      {
        id: `12${i}`,
        title: `child 12${i}`
      }
    ]
  })
}

const accentMap = {
  â: 'a',
  Â: 'A',
  à: 'a',
  À: 'A',
  á: 'a',
  Á: 'A',
  ã: 'a',
  Ã: 'A',
  ê: 'e',
  Ê: 'E',
  è: 'e',
  È: 'E',
  é: 'e',
  É: 'E',
  î: 'i',
  Î: 'I',
  ì: 'i',
  Ì: 'I',
  í: 'i',
  Í: 'I',
  õ: 'o',
  Õ: 'O',
  ô: 'o',
  Ô: 'O',
  ò: 'o',
  Ò: 'O',
  ó: 'o',
  Ó: 'O',
  ü: 'u',
  Ü: 'U',
  û: 'u',
  Û: 'U',
  ú: 'u',
  Ú: 'U',
  ù: 'u',
  Ù: 'U',
  ç: 'c',
  Ç: 'C'
}
const tintColor = '#174A87'

const Loading = (props) =>
  props.hasErrored
    ? (
    <TouchableWithoutFeedback onPress={props.fetchCategories}>
      <View style={styles.center}>
        <Text>oops... something went wrong. Tap to reload</Text>
      </View>
    </TouchableWithoutFeedback>
      )
    : (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
    </View>
      )

const Toggle = (props) => (
  <TouchableWithoutFeedback
    onPress={() => props.onPress(!props.val)}
    disabled={props.disabled}
  >
    <View style={styles.switch}>
      <Text style={styles.label}>{props.name}</Text>
      <Switch
        trackColor={tintColor}
        onValueChange={(v) => props.onPress(v)}
        value={props.val}
        disabled={props.disabled}
      />
    </View>
  </TouchableWithoutFeedback>
)

export default class Preorder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: null,
      loading: false,
      selectedItems: [],
      selectedItems2: [],
      selectedItemObjects: [],
      currentItems: [],
      showDropDowns: false,
      single: false,
      readOnlyHeadings: true,
      highlightChildren: false,
      selectChildren: false,
      hideChipRemove: false,
      hasErrored: false,
      isDarkMode: false,
      shop_id: props.route.params.shop_id,
      shop_info: props.route.params.info,
      menuarray: [],
      firstname: '',
      ownername: '',
    }
    this.termId = 100
    this.maxItems = 2
    this.SubmitPressed = this.SubmitPressed.bind(this)
  }

  componentDidMount () {
    Alert.alert("Приносим свои извинения", "В данный момент заказать можно только один пункт за один раз")
    items = []
    this.getUserInfo()
    this._getMenu()
    this.getOwnerName()
    this.pretendToLoad()
    const colorScheme = Appearance.getColorScheme()
    if (colorScheme === 'dark') {
      // Use dark color scheme
      this.setState({ isDarkMode: false })
    }
    console.log(this.props.route.params)
    // programatically opening the select
    // this.SectionedMultiSelect._toggleSelector()
  }

  // custom icon renderer passed to iconRenderer prop
  // see the switch for possible icon name
  // values
  icon = ({ name, size = 18, style }) => {
    // flatten the styles
    const flat = StyleSheet.flatten(style)
    // remove out the keys that aren't accepted on View
    const { color, fontSize, ...styles } = flat

    let iconComponent
    // the colour in the url on this site has to be a hex w/o hash
    const iconColor =
      color && color.substr(0, 1) === '#' ? `${color.substr(1)}/` : '/'

    const Search = (
      <Image
        source={{ uri: `https://png.icons8.com/search/${iconColor}ios/` }}
        style={{ width: size, height: size }}
      />
    )
    const Down = (
      <Image
        source={{ uri: `https://png.icons8.com/down/${iconColor}ios/` }}
        style={{ width: size, height: size }}
      />
    )
    const Up = (
      <Image
        source={{ uri: `https://png.icons8.com/up/${iconColor}ios/` }}
        style={{ width: size, height: size }}
      />
    )
    const Close = (
      <Image
        source={{ uri: `https://png.icons8.com/multiply/${iconColor}ios/` }}
        style={{ width: size, height: size }}
      />
    )

    const Check = (
      <Image
        source={{
          uri: `https://png.icons8.com/checkmark/${iconColor}android/`
        }}
        style={{ width: size / 1.5, height: size / 1.5 }}
      />
    )
    const Cancel = (
      <Image
        source={{ uri: `https://png.icons8.com/cancel/${iconColor}ios/` }}
        style={{ width: size, height: size }}
      />
    )

    switch (name) {
      case 'search':
        iconComponent = Search
        break
      case 'keyboard-arrow-up':
        iconComponent = Up
        break
      case 'keyboard-arrow-down':
        iconComponent = Down
        break
      case 'close':
        iconComponent = Close
        break
      case 'check':
        iconComponent = Check
        break
      case 'cancel':
        iconComponent = Cancel
        break
      default:
        iconComponent = null
        break
    }
    return <View style={styles}>{iconComponent}</View>
  }

  async _getMenu () { // функция получения комментов
    try {
        items.push({
            // title: "Что бы вы хотели?",
            // id: 1,
            // children: []
            title: 'Через сколько вы придете?',
            id: 0,
          
            children: [
              {
                title: '10 минут',
                id: 19
              },
              {
                title: '15 минут',
                id: 20
              },
              {
                  title: '20 минут',
                  id: 21
                },
            ]
            })
      const response = await fetch(apiurl + 'get_menu/' + this.props.route.params.shop_id + '/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': "multipart/form-data"
        }
      })
      let json = await response.json()
      console.log(items[0]['id'])
      var dataset = []
      console.log(json.length)
      console.log("DATASET", dataset)
      items.push({
          title: "Что бы вы хотели?",
          id: 2,
          children: []
      })
      for (let i = 0; i < json.length; i++) {
        items[1]['children'].push({
            title: json[i].fields.position,
            id: i+100
        });
      }
      console.log("ITIETIEITIEIT", items[1]['children'])
      this.setState({ menuarray: json })
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  async getOwnerName () {											// ф-ия получения информации о юзере
    const response = await fetch(apiurl + 'get_name/' + this.props.route.params.shop_id + '/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    this.setState({ ownername: json[0].fields.OwnerName })
    console.log(this.state.ownername)
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
    this.setState({ firstname: json[0].fields.first_name })
  }

  SubmitPressed () {
    if (this.state.selectedItems.length == 2){
        console.log('SUBMIT PRESSED')
        console.log(this.state.selectedItemObjects)

        const formData = new FormData()
        formData.append('position', this.state.selectedItemObjects[1].title)
        formData.append('time', this.state.selectedItemObjects[0].title)
        formData.append('username', this.state.firstname)
        formData.append('owner_name', this.state.ownername)
        console.log(formData)
        fetch(apiurl + 'makeorder/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': "multipart/form-data"
        },
        body: formData
        }).then(() => EventRegister.emit('FullCoffeeInfo', ''))

        Alert.alert("Предзаказ оформлен. Ждем вас в кофейне")
    }else{
        Alert.alert("Возможно вы что-то не выбрали", "Проверьте, пожалуйста, что вы выбрали и время, и напиток")
    }
  }

  getProp = (object, key) => object && this.removerAcentos(object[key])

  rejectProp = (items, fn) => items.filter(fn)

  pretendToLoad = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, items })
    }, 4000)
  }

  // testing a custom filtering function that ignores accents
  removerAcentos = (s) => s.replace(/[\W\[\] ]/g, (a) => accentMap[a] || a)

  filterItems = (searchTerm, items, { subKey, displayKey, uniqueKey }) => {
    let filteredItems = []
    let newFilteredItems = []
    items.forEach((item) => {
      const parts = this.removerAcentos(searchTerm.trim()).split(
        /[[ \][)(\\/?\-:]+/
      )
      const regex = new RegExp(`(${parts.join('|')})`, 'i')
      if (regex.test(this.getProp(item, displayKey))) {
        filteredItems.push(item)
      }
      if (item[subKey]) {
        const newItem = Object.assign({}, item)
        newItem[subKey] = []
        item[subKey].forEach((sub) => {
          if (regex.test(this.getProp(sub, displayKey))) {
            newItem[subKey] = [...newItem[subKey], sub]
            newFilteredItems = this.rejectProp(
              filteredItems,
              (singleItem) => item[uniqueKey] !== singleItem[uniqueKey]
            )
            newFilteredItems.push(newItem)
            filteredItems = newFilteredItems
          }
        })
      }
    })
    return filteredItems
  }

  onSelectedItemsChange = (selectedItems) => {
    console.log(selectedItems, selectedItems.length)

    if (selectedItems.length >= this.maxItems) {
      if (selectedItems.length === this.maxItems) {
        this.setState({ selectedItems })
      }
      this.setState({
        maxItems: true
      })
      return
    }
    this.setState({
      maxItems: false
    })

    const filteredItems = selectedItems.filter(
      (val) => !this.state.selectedItems2.includes(val)
    )
    this.setState({ selectedItems: filteredItems })
  }

  onSelectedItemsChange2 = (selectedItems) => {
    const filteredItems = selectedItems.filter(
      (val) => !this.state.selectedItems.includes(val)
    )
    this.setState({ selectedItems2: filteredItems })
  }

  onConfirm = () => {
    this.setState({ currentItems: this.state.selectedItems })
    console.log('CONFIRMMMMMM')
  }

  onCancel = () => {
    this.SectionedMultiSelect._removeAllItems()

    this.setState({
      selectedItems: this.state.currentItems
    })
    console.log(this.state.selectedItems)
  }

  onSelectedItemObjectsChange = (selectedItemObjects) => {
    this.setState({ selectedItemObjects })
    console.log(selectedItemObjects)
  }

  onSwitchToggle = (k) => {
    const v = !this.state[k]
    this.setState({ [k]: v })
  }

  fetchCategories = () => {
    this.setState({ hasErrored: false })
    fetch('http://www.mocky.io/v2/5a5573a22f00005c04beea49?mocky-delay=500ms', {
      headers: 'no-cache'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ cats: responseJson })
      })
      .catch((error) => {
        this.setState({ hasErrored: true })
        throw error.message
      })
  }

  filterDuplicates = (items) =>
    items.sort().reduce((accumulator, current) => {
      const length = accumulator.length
      if (length === 0 || accumulator[length - 1] !== current) {
        accumulator.push(current)
      }
      return accumulator
    }, [])

  noResults = (
    <View key="a" style={styles.center}>
      <Text>Sorry! No results...</Text>
    </View>
  )

  handleAddSearchTerm = () => {
    const searchTerm = this.SectionedMultiSelect._getSearchTerm()
    const id = (this.termId += 1)
    if (
      searchTerm.length &&
      !(this.state.items || []).some((item) => item.title.includes(searchTerm))
    ) {
      const newItem = { id, title: searchTerm }
      this.setState((prevState) => ({
        items: [...(prevState.items || []), newItem]
      }))
      this.onSelectedItemsChange([...this.state.selectedItems, id])
      this.SectionedMultiSelect._submitSelection()
    }
  }

  searchAdornment = (searchTerm) =>
    searchTerm.length ? (
      <TouchableOpacity
        style={{ alignItems: 'center', justifyContent: 'center' }}
        onPress={this.handleAddSearchTerm}
      >
        <View style={{}}>
          <Image
            source={{ uri: 'https://png.icons8.com/plus' }}
            style={{ width: 16, height: 16, marginHorizontal: 15 }}
          />
          {/*   <Icon size={18} style={{ marginHorizontal: 15 }} name="add" /> */}
        </View>
      </TouchableOpacity>
    ) : null

  renderSelectText = () => {
    const { selectedItemObjects } = this.state

    const selectText = selectedItemObjects.length
      ? `Вы Выбрали: ${selectedItemObjects
          .map((item, i) => {
            let label = `${item.title}, `
            if (i === selectedItemObjects.length - 2) { label = `${item.title} и ` }
            if (i === selectedItemObjects.length - 1) label = `${item.title}.`
            return label
          })
          .join('')}`
      : 'Выбрать'
    return (
      <Text
        style={{
          color: this.state.isDarkMode ? 'white' : 'black',
          fontSize: 18
        }}
      >
        {selectText}
      </Text>
    )
  }

  SelectOrRemoveAll = () =>
    this.SectionedMultiSelect && (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          height: 44,
          borderWidth: 0,
          paddingHorizontal: 10,
          backgroundColor: 'darkgrey',
          alignItems: 'center'
        }}
        onPress={
          this.state.selectedItems.length
            ? this.SectionedMultiSelect._removeAllItems
            : this.SectionedMultiSelect._selectAllItems
        }
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {this.state.selectedItems.length ? 'Remove' : 'Select'} all
        </Text>
      </TouchableOpacity>
    )

  onToggleSelector = (toggled) => {
    console.log('selector is ', toggled ? 'open' : 'closed')
  }

  customChipsRenderer = (props) => {
    console.log('props', props)
    return (
      <View style={{ backgroundColor: 'yellow', padding: 15 }}>
        <Text>Selected:</Text>
        {props.selectedItems.map((singleSelectedItem) => {
          const item = this.SectionedMultiSelect._findItem(singleSelectedItem)

          if (!item || !item[props.displayKey]) return null

          return (
            <View
              key={item[props.uniqueKey]}
              style={{
                flex: 0,
                marginRight: 5,
                padding: 10,
                backgroundColor: 'orange'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.SectionedMultiSelect._removeItem(item)
                }}
              >
                <Text>{item[props.displayKey]}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }

  render () {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        // style={{
        //   backgroundColor: this.state.isDarkMode ? '#333' : '#f8f8f8'
        // }}
        style={{
          backgroundColor: 'white'
        }}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.header}>
            {this.props.route.params.info.name}
        </Text>
        <SectionedMultiSelect
          items={this.state.items}
          ref={(SectionedMultiSelect) =>
            (this.SectionedMultiSelect = SectionedMultiSelect)
          }
          uniqueKey="id"
          subKey="children"
          displayKey="title"
          iconKey="icon"
          autoFocus
          modalWithTouchable
          modalWithSafeAreaView
          // showCancelButton
          // headerComponent={this.SelectOrRemoveAll}
          // hideConfirm
          loading={this.state.loading}
          // filterItems={this.filterItems}
          // alwaysShowSelectText
          // customChipsRenderer={this.customChipsRenderer}
          chipsPosition="bottom"
          searchAdornment={(searchTerm) => this.searchAdornment(searchTerm)}
          renderSelectText={this.renderSelectText}
          // noResultsComponent={this.noResults}
          loadingComponent={
            <Loading
              hasErrored={this.state.hasErrored}
              fetchCategories={this.fetchCategories}
            />
          }
          IconRenderer={Icon}
          //  cancelIconComponent={<Text style={{color:'white'}}>Cancel</Text>}
          showDropDowns={this.state.showDropDowns}
          expandDropDowns={this.state.expandDropDowns}
          animateDropDowns={false}
          readOnlyHeadings={this.state.readOnlyHeadings}
          single={this.state.single}
          showRemoveAll
          hideChipRemove={this.state.hideChipRemove}
          selectChildren={this.state.selectChildren}
          highlightChildren={this.state.highlightChildren}
          //  hideSearch
          //  itemFontFamily={fonts.boldCondensed}
          onSelectedItemsChange={this.onSelectedItemsChange}
          onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          confirmText={`${this.state.selectedItems.length}/${this.maxItems} - ${
            this.state.maxItems ? 'Max selected' : 'Confirm'
          }`}
        //   confirmText={`${this.state.selectedItems.length} - ${
        //     this.state.maxItems ? 'Max selected' : 'Confirm'
        //   }`}
          selectedItems={this.state.selectedItems}
          colors={{
            primary: '#5c3a9e',
            success: '#5c3a9e',
            chipColor: this.state.isDarkMode ? '#f7f7f7' : '#333'
          }}
          itemNumberOfLines={3}
          selectLabelNumberOfLines={3}
          styles={{
            // chipText: {
            //   maxWidth: Dimensions.get('screen').width - 90,
            // },
            // itemText: {
            //   color: this.state.selectedItems.length ? 'black' : 'lightgrey'
            // },
            // selectedItemText: {
            //   color: 'blue',
            // },
            // subItemText: {
            //   color: this.state.selectedItems.length ? 'black' : 'lightgrey'
            // },
            item: {
              paddingHorizontal: 10
            },
            subItem: {
              paddingHorizontal: 10
            },
            selectedItem: {
              backgroundColor: 'rgba(0,0,0,0.1)'
            },
            selectedSubItem: {
              backgroundColor: 'rgba(0,0,0,0.1)'
            },
            // selectedSubItemText: {
            //   color: 'blue',
            // },
            scrollView: { paddingHorizontal: 0 }
          }}
          // cancelIconComponent={<Icon size={20} name="close" style={{ color: 'white' }} />}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button color={'#7154E0'} title="Заказать" onPress={() => this.SubmitPressed()} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20*res }}>
          <Button color={'#7154E0'} title="Вернуться к кофейне" onPress={() => this.props.navigation.goBack()} />
        </View>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30
    },
    container: {
      paddingTop: 40,
      paddingHorizontal: 20
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#333',
      marginTop: 30 * res,
      textDecorationColor: 'black',
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    },
    border: {
      borderBottomWidth: 1,
      borderBottomColor: '#dadada',
      marginBottom: 20
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 20
    },
    label: {
      fontWeight: 'bold'
    },
    switch: {
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
    header: {
      fontSize: 36 * res,
      margin: 6 * res,
      textAlign: 'center',
      fontWeight: 'bold'
    },
  })
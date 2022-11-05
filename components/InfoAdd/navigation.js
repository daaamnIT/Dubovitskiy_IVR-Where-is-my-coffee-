import DropDown from './dropdowntest'
import Full_About_Coffee from './FullCoffeeInfo'
import { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack3 = createNativeStackNavigator()

export default class ShopNav extends Component { // класс отдельного навигатора для рейнтинг листа
  constructor (props) {
    super(props)
    const { navigation } = this.props
  }

  render () {
    return (
            <Stack3.Navigator>
                <Stack3.Screen
                    name="FullInfo"
                    component={Full_About_Coffee}
                    options={{ headerShown: false }}
                />
                <Stack3.Screen name="AddInfo" component={DropDown}
                    options={{ headerShown: true }}
                />
            </Stack3.Navigator>
    )
  }
}

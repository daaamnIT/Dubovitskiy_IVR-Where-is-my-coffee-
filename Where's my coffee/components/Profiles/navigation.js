import { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddMenu from './addMenu'
import Profile_page from './Profile2'

const Stack4 = createNativeStackNavigator()

export default class ProfileNav extends Component { // класс отдельного навигатора для рейнтинг листа
  constructor (props) {
    super(props)
    const { navigation } = this.props
  }

  render () {
    return (
            <Stack4.Navigator>
                <Stack4.Screen name="Profile" component={Profile_page}
                      options={{ headerShown: false,}}
                />
                <Stack4.Screen name="Добавлению меню" component={AddMenu}
                      options={{ headerShown: true,}}
                />
            </Stack4.Navigator>
    )
  }
}

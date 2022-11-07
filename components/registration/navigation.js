import RegistrationScreen from './Registration'
import OwnerRegistration from './OwnerRegistration'
import CoffeeShopAdd from '../screens/CoffeeShopAdd'
import { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default class RegistrationNav extends Component { // класс отдельного навигатора для регитсрации
  constructor (props) {
    super(props)
    const { navigation } = this.props
  }

  render () {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="RegScreen"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Регистрация владельца" component={OwnerRegistration}/>
            </Stack.Navigator>
    )
  }
}

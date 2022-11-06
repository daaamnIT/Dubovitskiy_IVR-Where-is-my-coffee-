import React, { useState, useEffect } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'

import * as Location from 'expo-location'
import { SafeAreaView } from 'react-native-safe-area-context'
import GetLocation from 'react-native-get-location'

export var text2 = ''

export default function Path () {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
    text2 = text
    console.log(text2)
  }

  return (
      <SafeAreaView>
        <View>
            <Text>{text}</Text>
        </View>
    </SafeAreaView>
  )
}
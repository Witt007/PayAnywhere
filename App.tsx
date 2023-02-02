/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { type PropsWithChildren, useState, Component, PureComponent, useMemo, useCallback } from 'react';
import {
  NavigatorIOSProps,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme, useWindowDimensions,PushNotification,
  View, NavigatorIOS, Image, ScaledSize, NativeScrollEvent, NativeSyntheticEvent, TouchableHighlight
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { YuEB } from "./src/components";




const App = () => {
const [isDarkBarStyle,setIsDarkBarStyle]=useState(false)
 const changeBarStyle=useCallback(function (val:boolean) {
  setIsDarkBarStyle(val);
 },[])

  return (
    <View style={{ width: "100%", height: "100%"  }}>
      <StatusBar barStyle={isDarkBarStyle ? 'dark-content' : 'light-content'}/>
      <YuEB changeBarStyle={changeBarStyle}></YuEB>
    </View>
  );
};




export default App;

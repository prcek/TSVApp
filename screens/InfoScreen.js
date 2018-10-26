import React from 'react';
//import { ExpoConfigView } from '@expo/samples';
import {  Text, View, ScrollView } from 'react-native';
import { Constants } from 'expo';
import { store } from '../store';

import JSONTree from 'react-native-json-tree'

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'info',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
        <ScrollView>
            <JSONTree data={store.getState()} />
            <JSONTree data={Constants.manifest} />
        </ScrollView>
    );
  }
}

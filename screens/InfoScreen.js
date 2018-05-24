import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'info',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}

import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Constants, WebBrowser } from 'expo';


export default class BrowserScreen extends React.Component {
  state = {
    result: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.paragraph}
          title="Open WebBrowser"
          onPress={this._handlePressButtonAsync}
        />
        <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
      </View>
    );
  }
  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.io');
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
});

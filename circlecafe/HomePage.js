import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, ListView, Text, View, } from 'react-native';

export default class Movies extends Component {
	  static navigationOptions = {
    title: 'Circle Café',
  };
 
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.movies),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.textstyle}>{rowData.title}, {rowData.releaseYear}</Text>}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textstyle: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
	borderBottomWidth: 0.5,
	borderColor: '#333333',
  },
});


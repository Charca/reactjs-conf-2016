'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Image,
  View,
  Text
} = React;

let globals = require('../globals');

class Tweet extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let data = this.props.data;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: data.user.profile_image_url}} />
        <View style={styles.tweet}>
          <Text style={styles.author}>{data.user.name}</Text>
          <Text style={styles.text}>{data.text}</Text>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 15
  },
  tweet: {
    flex: 1
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
    color: globals.colors.primary,
    marginBottom: 6
  }
});

module.exports = Tweet;

'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Image,
  View,
  Text
} = React;

let ParsedText = require('./ParsedText');
let moment = require('moment');
let globals = require('../globals');

class Tweet extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let data = this.props.data;

    return (
      <View>
        <View style={styles.content}>
          <Image style={styles.image} source={{uri: data.user.profile_image_url}} />
          <View style={styles.tweet}>
            <View style={styles.tweetHeader}>
              <Text style={styles.author}>{data.user.name} <Text style={styles.handler}>@{data.user.screen_name}</Text></Text>
              <Text style={styles.time}>{moment(new Date(data.created_at)).fromNow()}</Text>
            </View>
            <ParsedText
              style={styles.text}
              parse={[
                { pattern: /#(\w+)/, style: styles.hashtag }
              ]}>
              { data.text }
            </ParsedText>
          </View>
        </View>
        <View style={styles.separator}></View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  content: {
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
  tweetHeader: {
    flexDirection: 'row'
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: globals.colors.primary,
    marginBottom: 6
  },
  handler: {
    fontSize: 12,
    color: globals.colors.lightGrey
  },
  time: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: globals.colors.lightGrey,
    textAlign: 'right'
  },
  text: {
    fontSize: 14
  },
  hashtag: {
    color: globals.colors.secondary
  },
  separator: {
    height: .5,
    backgroundColor: globals.colors.lightGrey,
    marginBottom: 15
  }
});

module.exports = Tweet;

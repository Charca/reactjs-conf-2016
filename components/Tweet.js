'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} = React;

let ParsedText = require('react-native-parsed-text').default;
let URLHandler = require('react-native-url-handler');
let moment = require('moment');
let globals = require('../globals');

class Tweet extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let data = this.props.data;
    let entities = data.entities;
    let media;

    if(entities.media && entities.media[0].type === 'photo') {
      media = <Image source={{uri: entities.media[0].media_url}} style={styles.media} />
    }

    return (
      <TouchableOpacity onPress={this._onTweetPressed.bind(this)}>
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
            { media }
          </View>
        </View>
        <View style={styles.separator}></View>
      </TouchableOpacity>
    );
  }

  _onTweetPressed() {
    let data = this.props.data;
    let url = `https://twitter.com/${data.user.screen_name}/status/${data.id_str}`;

    console.log(URLHandler);

    URLHandler.openUrl(url);
  }
}

let styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    padding: 15
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12
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
    marginBottom: 4
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
  media: {
    height: 150,
    borderRadius: 4,
    marginTop: 6
  },
  separator: {
    height: .5,
    backgroundColor: globals.colors.lightGrey
  }
});

module.exports = Tweet;

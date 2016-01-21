'use strict';

let React = require('react-native');
let {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text
} = React;

let globals = require('../globals');

class TalkDetails extends React.Component {
  render() {
    let data = this.props.talk;
    let companyLabel;
    let noDescription;

    if(data.speaker.company) {
      companyLabel = `(${data.speaker.company})`;
    }

    if(!data.description) {
      data.description = [];
      noDescription = (
        <Text style={styles.noDescription}>No Description Available</Text>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.badge}>
          <Image style={styles.avatar} source={{uri: data.speaker.avatarUrl}} />
          <View style={styles.badgeInfo}>
            <Text style={styles.name}>{data.speaker.name} {companyLabel}</Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.time}>{data.startTime} - {data.endTime}</Text>
          { noDescription }
          {data.description.map(function(text, index) {
            return <Text style={styles.paragraph} key={index}>{ text }</Text>
          })}
        </View>
      </ScrollView>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  badge: {
    alignItems: 'center',
    padding: 15
  },
  badgeInfo: {
    alignItems: 'center',
    flex: 1
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: globals.colors.primary,
    borderWidth: 4,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  },
  time: {
    fontSize: 14,
    textAlign: 'center',
    color: globals.colors.lightGrey,
    marginBottom: 15
  },
  description: {
    flex: 1,
    padding: 15,
    paddingTop: 0
  },
  noDescription: {
    color: globals.colors.lightGrey,
    alignSelf: 'center',
    textAlign: 'center'
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 8
  }
});

module.exports = TalkDetails;

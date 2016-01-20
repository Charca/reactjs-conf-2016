'use strict';

let React = require('react-native');
let {
  Animated,
  Easing,
  StyleSheet,
  ListView,
  Image,
  View,
  Text
} = React;

let globals = require('../globals');

let day1Json = [
  {
    startTime: '9:00',
    endTime: '10:00',
    title: 'Registration & Breakfast'
  },
  {
    startTime: '10:00',
    endTime: '10:30',
    title: 'Keynote',
    speaker: {
      name: 'Nick Schrock',
      company: 'Facebook',
      avatarUrl: 'http://conf.reactjs.com/img/nick-schrock.jpg'
    }
  },
  {
    startTime: '10:30',
    endTime: '11:00',
    title: 'How To Use React In a Wedding Gift Without Being A Bad Friend',
    speaker: {
      name: 'Keith Poplawski',
      company: 'Namely',
      avatarUrl: 'http://conf.reactjs.com/img/keith-poplawski.jpg'
    }
  },
  {
    startTime: '11:00',
    endTime: '11:30',
    title: 'Break'
  },
  {
    startTime: '11:30',
    endTime: '12:00',
    title: 'Rich Text Editing with React',
    speaker: {
      name: 'Isaac Salier-Hellendag',
      company: 'Facebook',
      avatarUrl: 'http://conf.reactjs.com/img/isaac-salier-hellendag.jpg'
    }
  },
  {
    startTime: '12:00',
    endTime: '12:30',
    title: 'A Cartoon Guide to the Wilds of Data Handling',
    speaker: {
      name: 'Lin Clark',
      company: 'Mozilla',
      avatarUrl: 'http://conf.reactjs.com/img/lin-clark.jpg'
    }
  },
  {
    startTime: '12:30',
    endTime: '2:00',
    title: 'Lunch'
  },
  {
    startTime: '2:00',
    endTime: '2:30',
    title: 'Demystifying Tech Recruiting',
    speaker: {
      name: 'Helena Milosevic',
      company: 'Facebook',
      avatarUrl: 'http://conf.reactjs.com/img/helena-milosevic.jpg'
    }
  },
  {
    startTime: '2:30',
    endTime: '3:00',
    title: 'Web-like Release Agility for Native Apps',
    speaker: {
      name: 'Jonathan Carter',
      company: 'Microsoft',
      avatarUrl: 'http://conf.reactjs.com/img/jonathan-carter.jpg'
    }
  },
  {
    startTime: '3:00',
    endTime: '3:30',
    title: 'Break'
  },
  {
    startTime: '3:30',
    endTime: '4:00',
    title: 'React, Meet Virtual Reality',
    speaker: {
      name: 'Eric Florenzano',
      avatarUrl: 'http://conf.reactjs.com/img/eric-florenzano.jpg'
    }
  },
  {
    startTime: '4:00',
    endTime: '4:30',
    title: 'Building a Progressive Web App',
    speaker: {
      name: 'Aditya Punjani',
      company: 'Flipkart',
      avatarUrl: 'http://conf.reactjs.com/img/aditya-punjani.jpg'
    }
  },
];

let scheduleJson = {
  'Day 1': day1Json,
  'Day 2': day1Json
};

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      loading: true,
      scrollDistance: new Animated.Value(0),
      dataSource: ds.cloneWithRowsAndSections(scheduleJson)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSectionHeader={this.renderSectionHeader.bind(this)}
          contentInset={{bottom:48}}
          automaticallyAdjustContentInsets={false}
          onScroll={this._handleScroll.bind(this)} />
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title, styles.titleSingle]}>{rowData.title}</Text>;
    let companyLabel;

    if(rowData.speaker) {
      if(rowData.speaker.company) {
        companyLabel = `(${rowData.speaker.company})`;
      }
      title = (
        <View style={styles.speakerInfo}>
          <Image style={styles.speakerAvatar} source={{uri: rowData.speaker.avatarUrl}} />
          <View style={styles.speakerDescription}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.speakerName}>{rowData.speaker.name} { companyLabel }</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.row} key={rowID}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{rowData.startTime}</Text>
        </View>
        <View style={styles.details}>
          <View style={styles.circle}></View>
          { title }
          <View style={styles.separator}></View>
        </View>
      </View>
    );
  }

  renderSectionHeader(sectionData, sectionID) {
    let scrollDistance = this.state.scrollDistance;
    let headerStyles = {
      // height: scrollDistance.interpolate({
      //   inputRange: [40, 130],
      //   outputRange: [130, 40],
      //   extrapolate: 'clamp',
      // })
    };

    return (
      <Animated.View style={[styles.sectionHeader, headerStyles]}>
        <Text style={styles.sectionHeaderText}>
          {sectionID}
        </Text>
      </Animated.View>
    );
  }

  _handleScroll(event) {
    let {
      contentInset: { top: topInset },
      contentOffset: { y: scrollY },
    } = event.nativeEvent;
    let scrollDistance = scrollY + topInset;
    this.state.scrollDistance.setValue(scrollDistance);
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // ListView
  list: {
    flex: 1
  },
  // SectionHeader
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: globals.colors.secondary,
    height: 30,
    justifyContent: 'center'
  },
  sectionHeaderText: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'center'
  },
  // Row
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  timeContainer: {
    width: 40
  },
  timeText: {
    color: globals.colors.lightGrey,
    textAlign: 'right'
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: globals.colors.secondary,
    position: 'absolute',
    left: -5,
    top: 0
  },
  details: {
    borderColor: globals.colors.lightGrey,
    borderLeftWidth: 1,
    flexDirection: 'column',
    flex: 1,
    marginLeft: 20,
    paddingLeft: 20
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: globals.colors.primary,
    marginBottom: 6
  },
  titleSingle: {
    marginBottom: 0
  },
  speakerInfo: {
    flexDirection: 'row'
  },
  speakerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  speakerDescription: {
    flex: 1
  },
  separator: {
    height: .5,
    backgroundColor: globals.colors.lightGrey,
    marginTop: 15,
    marginBottom: 15
  }
});

module.exports = Schedule;

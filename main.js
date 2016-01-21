/**
 * This is the entry point for your experience that you will run on Exponent.
 *
 * Start by looking at the render() method of the component called
 * FirstExperience. This is where the text and example components are.
 */
'use strict';

let React = require('react-native');
let {
  AppRegistry,
  BackAndroid,
  Image,
  Navigator,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
} = React;

let TabNavigator = require('react-native-tab-navigator').default;
let NavBar = require('./components/NavBar');
let Screen = require('./components/Screen');
let Schedule = require('./components/Schedule');
let TalkDetails = require('./components/TalkDetails');
let Venue = require('./components/Venue');
let Tweets = require('./components/Tweets');
let globals = require('./globals');

let ICON_SIZE = 24;

let routes = {
  list: { name: 'list', title: 'Schedule' },
  details: { name: 'details', title: 'Talk Details' }
};

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: 'schedule'
    };
  }

  componentDidMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setStyle('light-content', true);
      StatusBarIOS.setHidden(false, 'fade');
    }

    if (BackAndroid) {
      BackAndroid.addEventListener('hardwareBackPress', this._handleBackButtonPress.bind(this));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            title="Schedule"
            renderIcon={() => <Image source={{uri: `${globals.serverUrl}/images/reactjs-conf/schedule-icon.png`}} style={styles.icon} />}
            selected={this.state.selectedTab === 'schedule'}
            onPress={() => { this.setState({selectedTab: 'schedule'}); }}>
            <Navigator
              style={[styles.container, styles.navigator]}
              initialRoute={routes.list}
              renderScene={this.renderScene.bind(this)}
              navigationBar={NavBar}
              ref={component => this._navigator = component} />
          </TabNavigator.Item>
          <TabNavigator.Item
            title="Venue"
            renderIcon={() => <Image source={{uri: `${globals.serverUrl}/images/reactjs-conf/venue-icon.png`}} style={styles.icon} />}
            selected={this.state.selectedTab === 'venue'}
            onPress={() => { this.setState({selectedTab: 'venue'}); }}>
            <Screen title="Venue">
              <Venue />
            </Screen>
          </TabNavigator.Item>
          <TabNavigator.Item
            title="Tweets"
            renderIcon={() => <Image source={{uri: `${globals.serverUrl}/images/reactjs-conf/tweets-icon.png`}} style={styles.icon} />}
            selected={this.state.selectedTab === 'tweets'}
            onPress={() => { this.setState({selectedTab: 'tweets'}); }}>
            <Screen title="Tweets">
              <Tweets />
            </Screen>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }

  renderScene(route, navigator) {
    if(route.name === 'list') {
      return <Schedule navigator={navigator} />
    } else if(route.name === 'details') {
      return <TalkDetails navigator={navigator} talk={route.talkInfo} />
    }
  }

  _handleBackButtonPress() {
    if (this._navigator.getCurrentRoutes().length > 1) {
      this._navigator.pop();
      return true;
    }

    return false;
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navigator: {
    paddingTop: 64
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain'
  }
});

AppRegistry.registerComponent('main', () => App);

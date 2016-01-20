/**
 * This is the entry point for your experience that you will run on Exponent.
 *
 * Start by looking at the render() method of the component called
 * FirstExperience. This is where the text and example components are.
 */
'use strict';

let React = require('react-native');
let {
  Animated,
  AppRegistry,
  Easing,
  Image,
  ScrollView,
  StatusBarIOS,
  TabBarIOS,
  StyleSheet,
  Text,
  View,
} = React;

let Screen = require('./components/Screen');
let Schedule = require('./components/Schedule');
let Tweets = require('./components/Tweets');
let globals = require('./globals');

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: 'schedule'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS
          tintColor={globals.colors.secondary}
          barTintColor="#EEE">
          <TabBarIOS.Item
            title="Schedule"
            icon={require('./assets/schedule-icon.png')}
            selected={this.state.selectedTab === 'schedule'}
            onPress={() => { this.setState({selectedTab: 'schedule'}); }}>
            <Screen title="Schedule">
              <Schedule style={{padding: 0}}/>
            </Screen>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Venue"
            icon={require('./assets/venue-icon.png')}
            selected={this.state.selectedTab === 'venue'}
            onPress={() => { this.setState({selectedTab: 'venue'}); }}>
            <Screen title="Venue">
              <Text>Hey</Text>
            </Screen>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Tweets"
            icon={require('./assets/tweets-icon.png')}
            selected={this.state.selectedTab === 'tweets'}
            onPress={() => { this.setState({selectedTab: 'tweets'}); }}>
            <Screen title="Tweets">
              <Tweets />
            </Screen>
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }

  componentDidMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setStyle('light-content', true);
      StatusBarIOS.setHidden(false, 'fade');
    }
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

AppRegistry.registerComponent('main', () => App);

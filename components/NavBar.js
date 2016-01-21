'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Navigator,
  TouchableOpacity,
  Platform,
  Text,
  Image
} = React;

var globals = require('../globals');

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: globals.colors.primary,
    height: 64
  },
  navBarText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: (Platform.OS === 'ios') ? 12 : 24
  },
  navBarTitleText: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  }
});

var NavigationBarRouteMapper = {
  Title(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },
  LeftButton(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    // var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={styles.navBarText}>Back</Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  }
};

module.exports = (
  <Navigator.NavigationBar
    style={styles.navBar}
    routeMapper={NavigationBarRouteMapper} />
);

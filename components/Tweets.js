'use strict';

let React = require('react-native');
let {
  StyleSheet,
  ListView,
  View,
  Text
} = React;

let Tweet = require('./Tweet');
let Spinner = require('./Spinner');
let globals = require('../globals');

class Tweets extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      loading: true,
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    this.loadTweets();
  }

  loadTweets() {
    this.setState({loading: true});
    var url = `${globals.serverUrl}/reactjs-conf/twitter`;
    return fetch(url).then((res) => res.json())
      .then((res) => {
        this.setState({
          loading: false,
          dataSource: this.state.dataSource.cloneWithRows(res.statuses)
        });
      });
  }

  render() {
    if(this.state.loading) {
      return <Spinner />;
    }

    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false} />
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <Tweet key={rowID} data={rowData} />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1
  }
});

module.exports = Tweets;

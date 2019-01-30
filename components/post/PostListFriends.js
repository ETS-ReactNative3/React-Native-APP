import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';

import { sendPijn, postsFetch } from '../../actions';
import PostListItem from './PostListItem';

class PostListFriends extends Component {
  componentWillMount() {
    this.props.postsFetch();
  }

  renderRow = (post) => {
    return (
      <PostListItem post={post} redirect={this.props.redirect} />
    );
  }

  renderHeader = () => {
    return (
      <View style={styles.writePostView}>
        <Button
          title="Search for friends!"
          onPress={() => this.props.redirect('SearchFriends')}
          backgroundColor="rgba(0,125,255,1)"
          borderRadius={20}
          icon={{ name: 'search' }}
        />
      </View>
    );
  }

  render() {
    const { posts } = this.props;

    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={posts}
          renderItem={({ item }) => this.renderRow(item)}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={({ item }, postId) => postId.toString()}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
  },
  writePostView: {
    paddingTop: 10,
    paddingBottom: 5
  }
};

function mapStateToProps(state) {
  const { user } = state;
  let posts = _.map(state.posts, (val, uid) => {
    const pijnSentToday = !!state.pijnLog[uid];
    const { navigation } = state;
    let comments = _.map(val.comments, (value, commentId) => {
      return { ...value, commentId };
    });
    return {
      ...val, postId: uid, sendPijn, pijnSentToday, user, navigation, comments
    };
  }).reverse();
  return { posts };
}

export default connect(mapStateToProps, { postsFetch })(PostListFriends);
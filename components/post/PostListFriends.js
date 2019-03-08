import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';
import axios from 'axios';

import { sendPijn, postsFetch, fetchUserFeed } from '../../actions';
import PostListItem from './PostListItem';

const ROOT_URL = 'https://us-central1-pijns-dc1c1.cloudfunctions.net';

class PostListFriends extends Component {
  constructor(props) {
    super(props);
    this.props.postsFetch();
    this.props.fetchUserFeed(this.props.user.uid);
  }

  getUserFeed() {
    return axios.post(`${ROOT_URL}/getUserFeed`, { userId: this.props.user.uid });
  }

  renderRow = (post) => {
    return (
      <PostListItem
        post={post}
        redirect={this.props.redirect}
        redirectTo='FriendPostComments'
        tab={this.props.tab}
      />
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
  const { user, userFeed } = state;
  let posts = _.map(userFeed, (post, index) => {
    const pijnSentToday = !!state.pijnLog[post.postId];
    const { navigation } = state;
    return {
      ...post, sendPijn, pijnSentToday, user, navigation, index
    };
  });
  return { posts, user };
}

export default connect(mapStateToProps, { postsFetch, fetchUserFeed })(PostListFriends);

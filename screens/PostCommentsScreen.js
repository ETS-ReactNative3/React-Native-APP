import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { Input } from '../components/common';
import * as actions from '../actions';

class PostCommentsScreen extends Component {
  static navigationOptions = {
    title: 'Username',
  };

  state = {
    newValue: '',
    height: 40
  }

  logoutPress = () => {
    this.props.logout(() => {
      this.props.navigation.navigate('Auth');
    });
  }

  updateSize = (height) => {
    this.setState({ height });
  }

  render() {
    const { newValue, height } = this.state;
    const { keyboardAvoidStyle, containerViewStyle, inputStyle } = styles;
    let newStyle = { height };

    return (
      <KeyboardAvoidingView style={keyboardAvoidStyle} behavior="padding" enabled>
        <View style={containerViewStyle}>
          <TextInput
            placeholder="Add a comment..."
            onChangeText={(value) => this.setState({ newValue: value })}
            style={[inputStyle, newStyle]}
            editable
            multiline
            value={newValue}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  keyboardAvoidStyle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  containerViewStyle: {
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#D3D3D3'
  },
  inputStyle: {
    color: '#000',
    fontSize: 16,
    lineHeight: 23,
  }
};

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(PostCommentsScreen);

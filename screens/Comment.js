import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, TextInput } from 'react-native';
import { addComment } from '../actions/post';

class Comment extends React.Component {
  state = {
  	comment: ''
  }

  postComment = () => {
  	const { params } = this.props.navigation.state
  	this.props.addComment(this.state.comment, params.id)
  	this.setState({comment: ''})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.comment}</Text>
	      <TextInput
	        style={styles.input}
	        onChangeText={(comment) => this.setState({comment})}
	        value={this.state.comment}
	        returnKeyType='send'
          placeholder='Add Comment'
          onSubmitEditing={this.postComment}/>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addComment }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
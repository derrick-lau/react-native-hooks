import React from 'react';
import styles from '../styles'
import ENV from '../env';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Location, Permissions } from 'expo';
import { updateDescription, updateLocation, uploadPost } from '../actions/post'
import { FlatList, Modal, SafeAreaView, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

class Post extends React.Component {
  state = {
    showModal: false, 
    locations: []
  }

  post = () => {
    this.props.uploadPost()
    this.props.navigation.navigate('Home')
  }

  setLocation = (location) => {
    const place = {
      name: location.name,
      coords: {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng
      }
    }
    this.setState({ showModal: false })
    this.props.updateLocation(place)
  }

  getLocations = async () => {
    this.setState({ showModal: true })
    const permission = await Permissions.askAsync(Permissions.LOCATION)
    if (permission.status === 'granted') {
      const location = await Location.getCurrentPositionAsync()
      const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=${ENV.googleApiKey}`
      const response = await fetch(url)
      const data = await response.json()
      this.setState({ locations: data.results })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal animationType='slide' transparent={false} visible={this.state.showModal}>
          <SafeAreaView style={[styles.container, styles.center]}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={this.state.locations}
              renderItem={({ item }) => (
              <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                <Text style={styles.gray}>{item.name}</Text>
                <Text style={styles.gray}>{item.vicinity}</Text>
              </TouchableOpacity>
            )}/> 
          </SafeAreaView>
        </Modal>
      	<Image style={styles.postPhoto} source={{uri: this.props.post.photo }}/>
        <TextInput
        	style={styles.border}
        	value={this.props.post.description}
        	onChangeText={text => this.props.updateDescription(text)}
        	placeholder='Description'
        />
        <TouchableOpacity style={styles.border} onPress={this.getLocations}>
          <Text style={styles.gray}>{this.props.post.location ? this.props.post.location.name : 'Add a Location'}</Text>
        </TouchableOpacity>
      	<TouchableOpacity style={styles.button} onPress={this.post}>
      		<Text>Post</Text>
      	</TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateDescription, uploadPost, updateLocation }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
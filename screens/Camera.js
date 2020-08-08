import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadPhoto } from '../actions/index';
import { Camera, Permissions, ImageManipulator } from 'expo';
import { Ionicons } from '@expo/vector-icons'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

class CameraUpload extends React.Component {

  snapPhoto = async () => {
    const permission = await Permissions.askAsync(Permissions.CAMERA)
    if (permission.status === 'granted') {
      const image = await this.camera.takePictureAsync()
      if(!image.cancelled ){
        const resize = await ImageManipulator.manipulateAsync(image.uri, [], { format: 'jpg', compress: 0.1 })
        const url = await this.props.dispatch(uploadPhoto(resize))
        console.log(url)
      }
    }
  }

  render() {
    return (
      <Camera style={{flex:1}} ref={ref => { this.camera = ref }} type={Camera.Constants.Type.back}>
        <SafeAreaView style={{flex:1}}>
          <TouchableOpacity style={{ paddingLeft: 30 }} onPress={() => this.props.navigation.goBack()} >
            <Ionicons color={'white'} name={'ios-arrow-back'} size={50}/>
          </TouchableOpacity>
        </SafeAreaView>
        <TouchableOpacity style={styles.cameraButton} onPress={() => this.snapPhoto()} />
      </Camera>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadPhoto }, dispatch)
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(CameraUpload)
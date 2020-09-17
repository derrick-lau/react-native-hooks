import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { Text, View, FlatList, ActivityIndicator, Image} from 'react-native';
import db from '../config/firebase';
import orderBy from 'lodash/orderBy'

class Activity extends React.Component {
	state = {
		activity: []
	}

  componentDidMount = () => {
    this.getActivity()
  }

  getActivity = async () => {
  	let activity = []
    const query = await db.collection('activity').where('uid', '==', this.props.user.uid).get()
    query.forEach((response) => {
      activity.push(response.data())
    })
		this.setState({activity: activity})
  }

  render() {
  	if (this.state.activity.length <= 0 ) return <ActivityIndicator style={styles.container}/>
    return (
    	<View style={styles.container}>
				<FlatList
				  data={this.state.activity}
				  keyExtractor={(item) => JSON.stringify(item.date)}
				  renderItem={({ item }) => (
	        <View style={[styles.row, styles.space]}>
	        	<Image style={styles.roundImage} source={{uri: item.likerPhoto}}/>
            <View style={[styles.container, styles.left]}>
              <Text>{item.likerName}</Text>
              <Text>Liked Your Photo</Text>
              <Text>{item.date}</Text>
            </View>
            <Image style={styles.roundImage} source={{uri: item.postPhoto}}/>
          </View>
				)}/>
			</View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Activity)
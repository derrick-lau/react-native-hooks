import firebase from 'firebase';

export const updateEmail = (email) => {
	return {type: 'UPDATE_EMAIL', payload: email}
}

export const updatePassword = (password) => {
	return {type: 'UPDATE_PASSWORD', payload: password}
}

export const updateUsername = (username) => {
	return {type: 'UPDATE_USERNAME', payload: username}
}

export const updateBio = (bio) => {
	return {type: 'UPDATE_BIO', payload: bio}
}

export const login = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password } = getState().user
			console.log(email, password)
			const response = await firebase.auth().signInWithEmailAndPassword(email, password)
	    console.log(response)
	    // firebase.auth().signInWithEmailAndPassword(email, password)
	    // .then(function(){
	    // 	console.log('success')
	    // })
	    // .catch(function(error) {
	    //   alert(error)
	    // });
		} catch (e) {
			alert(e)
		}
	}
}

// export const signup = () => {
// 	return () => {
//     firebase.auth().createUserWithEmailAndPassword(this.props.user.email, this.props.user.password).catch(function(error) {
//       alert(error)
//     });
// 	}
// }
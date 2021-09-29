import React, { Component } from 'react'
import { View } from 'react-native'

class JamComponent extends Component {

	render() {

		console.log("editor");
		console.log(this.props.editor);
		console.log(this.props);

		return <View/>;
	}
}

export default JamComponent

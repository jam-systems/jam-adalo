import React, { Component, StyleSheet } from "react";
import { View } from "react-native";

class JamComponent extends Component {
  render() {
    console.log("editor");
    console.log(this.props.editor);
    console.log(this.props);

    let iFrameHash = base64.encodeUrl(
      JSON.stringify({
        room: {
          stageOnly: this.props.stageOnly ? true : false,
        },
        ux: {
          autoCreate: "true",
        },
        identity: {
          name: this.props.identity?.displayName,
          avatar: this.props.identity?.avatar?.uri,
        },
      })
    );
    let uri = `https://${this.props.advanced?.jamHost || "jam.systems"}/${
      this.props.roomId
    }#${iFrameHash}`;

    return (
      <View style={styles.wrapper}>
        <WebView
          source={{ uri }}
          // width="100%"
          // allow="microphone *;"
          style={{ border: 0, height: 600 }}
        ></WebView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default JamComponent;

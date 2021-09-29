import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import base64 from "compact-base64";
import editorImage from "./editorImage";

class JamComponent extends Component {
  render() {
    console.log(this.props);

    if (this.props.editor) {
      return (
        <View style={styles.wrapper}>
          <img width="100%" height="600" src={editorImage} alt="" />
        </View>
      );
    }

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
        {/* <View style={{ flex: 1, backgroundColor: "#ffff00" }} /> */}
        <WebView
          // style={{ flex: 1, backgroundColor: "#ffff00" }}
          source={{ uri }}
          // width="100%"
          // allow="microphone *;"
          // style={{ border: 0, height: 600 }}
        ></WebView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default JamComponent;

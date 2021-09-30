import React, { Component } from "react";
import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import { toBase64, toUrl } from "./base64";

const injectedJavaScript = `
window.globalThis = window;
window.queueMicrotask = f => Promise.resolve().then(f);
//console.log = (...args) => window.ReactNativeWebView.postMessage(JSON.stringify(args));
console.warn = (...args) => window.ReactNativeWebView.postMessage(JSON.stringify(args));
console.error = (...args) => window.ReactNativeWebView.postMessage(JSON.stringify(args.map(a => (a && a.message) || a)));
`;

export default class JamComponent extends Component {
  render() {
    console.log("RENDERING NATIVE COMPONENT!!!!!!!!");
    console.log(this.props);

    let iFrameHash = toUrl(
      toBase64(
        JSON.stringify({
          room: {
            stageOnly: this.props.stageOnly ? true : false,
          },
          ux: {
            autoCreate: "true",
          },
          identity: {
            name: this.props.identity?.displayName || undefined,
            avatar: this.props.identity?.avatar?.uri || undefined,
          },
          debug: true,
        })
      )
    );
    let uri = `https://${this.props.advanced?.jamHost || "jam.systems"}/${
      this.props.roomId
    }#${iFrameHash}`;
    console.log(uri);

    return (
      <WebView
        // TODO: responsive styling
        style={{ flex: 1 }}
        source={{ uri }}
        injectedJavaScript={injectedJavaScript}
        onMessage={(event) => {
          console.log(...JSON.parse(event.nativeEvent.data));
        }}
        userAgent={userAgent}
        domStorageEnabled={true}
      ></WebView>
    );
  }
}

const userAgent = Platform.select({
  ios: "JamWebView/ios",
  android: "JamWebView/android",
});

// Import Librairies
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Import Constants
import { COLORS_APP } from "../utils/ConstantColors";

const ContainerPage = ({ children, style, hide_status = false }) => {
  return (
    <SafeAreaView style={[styles.safeContainer, style]}>
      {/* <TouchableWithoutFeedback> */}
        <View style={styles.container}>
          <StatusBar
            hidden={hide_status}
            animated={"slide"}
            translucent
            barStyle={"light-content"}
            backgroundColor={COLORS_APP.background}
          />
          {children}
        </View>
      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
};

export default ContainerPage;

// Style Component
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS_APP.background,
  },

  container: {
    flexGrow: 1,
    backgroundColor: COLORS_APP.background,
  },
});

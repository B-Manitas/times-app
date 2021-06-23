// Librairies
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { useDispatch } from "react-redux";

// Custom components
import ButtonToggle from "./ButtonToggle";
import ButtonPlus from "./ButtonPlus";

// Main app properties
import { ColorsApp } from "../utils/app_properties";
import {
  onPressToggleOptions,
  onPressRemoveWorkout,
} from "../scripts/buttonAction";

const SeriesFieldView = ({ navigation, workout }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [txtBtnOptions, setTxtBtnOptions] = useState("+");

  const colors_difficulty = ["#f5f5f5", "#daffef", "#FCD99C", "#FE9C9A", "#706993"];

  return (
    <View style={[styles.ctn_main, {borderColor: colors_difficulty[workout.difficulty-1]}]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Timer", { workoutId: workout.id })}
        style={styles.ctn_title}
      >
        <Text style={styles.txt_workout_name}>{workout.title}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.ctn_action}>
          <TouchableOpacity
            style={[styles.btn_action, styles.btn_remove]}
            onPress={() => onPressRemoveWorkout(dispatch, workout.id)}
          >
            <Text style={[styles.btn_txt_action, styles.btn_txt_remove]}>
              Remove
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn_action}
            onPress={() =>
              navigation.navigate("Edit", { workout_UID: workout.id })
            }
          >
            <Text style={styles.btn_txt_action}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
      <ButtonPlus
        action={() =>
          onPressToggleOptions(showOptions, setShowOptions, setTxtBtnOptions)
        }
        size={22}
        positionY={-10}
        positionX={-10}
        text={txtBtnOptions}
      />
    </View>
  );
};

export default SeriesFieldView;

// Style Component
const styles = StyleSheet.create({
  ctn_main: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderRadius: 5,

    margin: 8,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,

    flex: 1,
    justifyContent: "center",
  },
  
  ctn_title: {
    width: "100%",
    // alignItems: "center",
  },

  ctn_action: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 10,
  },

  txt_workout_name: {
    color: ColorsApp.light_font,
    fontWeight: "bold",
    marginBottom: 3,
  },

  btn_action: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: ColorsApp.border,
    marginHorizontal: 2,
    paddingVertical: 5,
  },

  btn_txt_action: {
    color: ColorsApp.light_font,
  },

  btn_txt_remove: {
    color: "#FE9C9A",
    fontWeight: "bold"
  },

  btn_remove: {
    // borderColor: "#FE9C9A",
  },
});
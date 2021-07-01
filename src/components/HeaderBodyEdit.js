// Import Librairies
import React from "react";
import { StyleSheet, View  } from "react-native";

// Import Customs Components.
import TextField from "./TextField";
import LabelContainer from "./LabelContainer";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";

const HeaderBodyEdit = ({ workout, setWorkout }) => {
  return (
    <View style={styles.ctn_main}>
      <LabelContainer text={"Workout options"} />

      <TextField
        txt_label={"Workout name"}
        txt_placeholder={"Upper Body Workout"}
        max_len={40}
        value={workout.title}
        onChange={(v) => setWorkout((p) => ({ ...p, title: v }))}
        key={"wourkout-name"}
      />
      <View style={styles.ctn_input}>
        <TextField
          txt_label={"Round"}
          txt_placeholder={"1"}
          max_len={3}
          is_center={true}
          is_numeric={true}
          value={workout.round}
          onChange={(v) => setWorkout((p) => ({ ...p, round: v }))}
          key={"wourkout-round"}
        />
        <TextField
          txt_label={"Rest time"}
          txt_placeholder={"10s"}
          max_len={4}
          is_center={true}
          is_numeric={true}
          value={workout.rest_time}
          onChange={(v) => setWorkout((p) => ({ ...p, rest_time: v }))}
          key={"wourkout-rest"}
        />
        <TextField
          txt_label={"Final rest"}
          txt_placeholder={"60s"}
          max_len={4}
          is_center={true}
          is_numeric={true}
          value={workout.final_rest}
          onChange={(v) => setWorkout((p) => ({ ...p, final_rest: v }))}
          key={"wourkout-final-rest"}
        />
      </View>
      <LabelContainer text={"Program"} />
    </View>
  );
};

export default HeaderBodyEdit;

const styles = StyleSheet.create({
  ctn_main: {
    backgroundColor: COLORS_APP.background,
  },

  ctn_input: {
    flexDirection: "row",
  },
});

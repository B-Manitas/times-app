// Import Librairies
import React from "react";
import { StyleSheet, View } from "react-native";

// Import Functions.
import { getPlaceholderText, getTradText } from "../scripts";

// Import Customs Components.
import TextField from "./TextField";
import LabelContainer from "./LabelContainer";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";

const HeaderBodyEdit = ({ language, workout, setWorkout }) => {
  const propsNumeric = {
    max_len: 3,
    is_center: true,
    is_numeric: true,
  };

  return (
    <View style={styles.ctn_main}>
      <LabelContainer key_text={"workout_options"} />

      <TextField
        key_text={"workout_name"}
        placeholder={getPlaceholderText(language, "workout_name")}
        max_len={40}
        value={workout.title}
        onChange={(v) => setWorkout((p) => ({ ...p, title: v }))}
        key={"wourkout-name"}
      />
      <View style={styles.ctn_input}>
        <TextField
          key_text={"round"}
          placeholder={"1"}
          value={String(workout.round)}
          onChange={(v) => setWorkout((p) => ({ ...p, round: Number(v) }))}
          {...propsNumeric}
          key={"wourkout-round"}
          is_center={true}
          flex={1 / 2}
        />
        <TextField
          flex={1 / 2}
          key_text={"rest_time"}
          placeholder={"10s"}
          value={String(workout.rest_time)}
          onChange={(v) => setWorkout((p) => ({ ...p, rest_time: Number(v) }))}
          key={"wourkout-rest"}
          {...propsNumeric}
        />
        <TextField
          key_text={"final_rest"}
          placeholder={"60s"}
          value={String(workout.final_rest)}
          onChange={(v) => setWorkout((p) => ({ ...p, final_rest: Number(v) }))}
          key={"wourkout-final-rest"}
          {...propsNumeric}
        />
      </View>
      <LabelContainer key_text={"program"} />
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

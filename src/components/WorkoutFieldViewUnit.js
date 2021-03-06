// Import Librairies
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Import Functions.
import { isLastHorizontalField } from "../scripts";

// Import Custom Components.
import TextTraduction from "./TextTraduction";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const WorkoutFieldViewUnit = ({
  source,
  data,
  index,
  workout_len,
  key_text,
  suffix,
}) => {
  return (
    <View
      style={[
        styles.ctn_info_sub,
        !isLastHorizontalField(workout_len, index) && {
          marginHorizontal: 3,
        },
      ]}
    >
      <Image source={source} style={styles.info_img} />
      <Text style={styles.txt_info}>{data}</Text>
      {isLastHorizontalField(workout_len, index) && (
        <TextTraduction
          key_text={key_text}
          suffix={suffix}
          style={styles.txt_info}
        />
      )}
    </View>
  );
};

export default WorkoutFieldViewUnit;

const styles = StyleSheet.create({
  ctn_info_sub: {
    flexDirection: "row",
    marginHorizontal: 10,
  },

  txt_info: {
    paddingLeft: 2,
    color: COLORS_APP.font_third,
    fontFamily: FONT_FAMILY.main,
    textTransform: "lowercase",
  },

  info_img: {
    width: 18,
    height: 18,
  },
});

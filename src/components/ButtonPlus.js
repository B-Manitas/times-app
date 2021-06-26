import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ColorsApp, FontFamily } from "../utils/app_properties";

const ButtonPlus = ({
  action,
  style,
  bg_color,
  txt_color="#fff",
  size = 40,
  positionX = 0,
  positionY = 0,
  text = "+",
  shadow=true
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={[
        styles.btn_add_series,
        {
          width: size,
          height: size,
          bottom: positionY,
          right: positionX,
          backgroundColor: bg_color,
        },style,shadow&&styles.shadow
      ]}
    >
      <Text style={[styles.txt_add_series, {color:txt_color}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPlus;

const styles = StyleSheet.create({
  btn_add_series: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  
  txt_add_series: {
    fontFamily: FontFamily.main,
    color: ColorsApp.light_font,
    fontWeight: "bold",
  },

  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  }
});

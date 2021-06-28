import React, { useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { ColorsApp } from "../utils/app_properties";

const ButtonToggle = ({
  text,
  txt_active,
  txt_colors,
  state,
  onChange,
  style,
  style_active,
  style_txt_active,
  font_size = 15,
  shadow = true,
  disabled = false,
}) => {
  const [isActive, setIsActive] = useState(state);

  const isPressed = () => {
    setIsActive((isActive) => !isActive);
    onChange();
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={isPressed}
      style={[
        styles.btn_boxes,
        style,
        shadow && styles.shadow,
        isActive && style_active,
        disabled && styles.disabled
      ]}
    >
      <Text
        style={[
          styles.txt,
          { fontSize: font_size },
          {color:txt_colors},
          isActive && style_txt_active,
        ]}
      >
        {isActive && txt_active ? txt_active : text}
      </Text>
    </Pressable>
  );
};

export default ButtonToggle;

const styles = StyleSheet.create({
  btn_boxes: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 2,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 2,
    marginHorizontal: 2,
    
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "transparent",
    backgroundColor: "#fff"
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  txt: {
    textAlign: "center",
    color: ColorsApp.font_main,
    width: "100%",
    fontWeight: "bold",
  },

  disabled:{
    opacity: .3
  }
});

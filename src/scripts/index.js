// Import Librairies
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import * as Notifications from "expo-notifications";

// Import Constants.
import { ALERT, PLACEHOLDER, TRADUCTION } from "../utils/ConstantTraduction";

// This following fields can be not empty.
let whitelist = [
  "uid",
  "publish",
  "description",
  "muscles",
  "difficulty",
  "days",
  "notification",
];

/**
 * Get an UID.
 * @param {Number} baseInt the base used to convert number. By default is 36.
 * @returns Return a random UID.
 */
export function getRandUID(baseInt = 36) {
  return Math.random().toString(baseInt).substr(2, 9);
}

/**
 * Get the index of the workout.
 * @param {Object} workouts The dictionary containing the workouts list.
 * @param {Number} UID The uid of the workout.
 * @returns The position of the workout in the list.
 */
export function getID(workouts, UID) {
  return workouts.findIndex((workout) => workout.uid === UID);
}

/**
 * Calculate the sum of values of a key in an object.
 * @param {Object} listObj A list of object.
 * @param {String} key The key of the value.
 * @returns The sum of the values of the key.
 */
export function sumValueInObject(listObj, key) {
  var result = 0;
  for (const obj in listObj) {
    if (Object.hasOwnProperty.call(listObj, obj)) {
      var value = parseInt(listObj[obj][key]);
      if (!isNaN(value)) result += value;
    }
  }

  return result;
}

/**
 * Play a sound.
 * @param {Function} setSound The hook function called to set the sound.
 * @param {String} file The path of the sound file.
 */
export async function playSound(file) {
  const { sound } = await Audio.Sound.createAsync(file);
  await sound.playAsync();
}

/**
 * Get the format of a seconds to following array [MM, SS].
 * @param {Number} secs The seconds to format
 * @returns An array of strings containing in the following order
 * the minutes and seconds in the correct format.
 */
export function getStopwatchFormat(secs) {
  return [
    String(secs >= 60 ? Math.floor(secs / 60) : 0),
    String(Math.floor(secs % 60)),
  ];
}

/**
 * Create a timer.
 * @param {Function} setTime The hook function called to set the current time.
 * @returns An array containings start, stop timer functions and a boolean set to true if the timer is running.
 */
export function useTimer(setTime) {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!busy) return;

    setBusy(true);
    const timer = setTimeout(setTime, 850);

    return () => {
      setBusy(false);
      clearTimeout(timer);
    };
  });

  return [() => setBusy(true), () => setBusy(false), busy];
}

/**
 * Get the text of the remaining number series.
 * @param {Number} nb_series The number of the current series.
 * @param {Number} nb_max_series The total number of series.
 * @param {Number} nb_round The number of the current round.
 * @param {Number} nb_max_round The total number of round.
 * @returns The text containing series and round stats.
 */
export function getTxtCountSeries(
  nb_series,
  nb_max_series,
  nb_round,
  nb_max_round
) {
  return `Exercice: ${nb_series}/${nb_max_series}\nRound: ${nb_round}/${nb_max_round}`;
}

/**
 * Change the orientation of screen.
 * @param {Boolean} is_portrait The orientation of the screen is portrait by default.
 */
export async function setOrient(is_portrait = true) {
  await lockAsync(
    is_portrait ? OrientationLock.PORTRAIT_UP : OrientationLock.LANDSCAPE
  );
}

/**
 * Check if the workout is empty.
 * @param {Object} workout The dictionary containing the state of the workout.
 * @returns False if the workout is filled. Otherwise, return true.
 */
export const isEmpty = (workout) => {
  for (var key in workout) {
    if (!whitelist.includes(key.toString())) {
      const value = workout[key];

      // The value is an empty array.
      if (Array.isArray(value) && value.length === 0) return true;

      // The value an array containing sub-object.
      if (Array.isArray(value) && value.length !== 0)
        for (var sub_object in value)
          for (var key in sub_object) {
            const element = sub_object[key];
            if (element.length === 0) return true;
            else if (isEmpty(value[sub_object[key]])) return true;
          }

      // The value is empty object.
      if (!Array.isArray(value) && value !== undefined && value.length === 0)
        return true;
    }
  }

  return false;
};

/**
 * Check if all fields of the workout are empty.
 * @param {Object} workout The dictionary containing the state of the workout.
 * @param {Object} whitelist The dictionary containing the fields that are not checked.
 * @returns True if the all field are empty. Otherwise, return false.
 */
export const allAreEmpty = (object) => {
  for (var key in object)
    if (!whitelist.includes(key.toString()))
      if (object[key].length > 0) return false;

  return true;
};

/**
 * Get the welcome key_text.
 * @returns The key_text corresponding to the welcome phrase depending on the time.
 */
export function getWelcomeTxt() {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 0 && hours <= 12) return "good_morning";
  else if (hours > 12 && hours <= 18) return "good_afternoon";
  else return "good_evening";
}

/**
 * Get the duration of a workout.
 * @param {Array} series_list The list containing series.
 * @param {Number} nb_round The number of round.
 * @returns The duration of the workout.
 */
export function getDuration(series_list, nb_round = 0) {
  var time = sumValueInObject(series_list, "lap");
  return getStopwatchFormat(time * nb_round)[0];
}

/**
 * Check if it's the last workout in the list.
 * @param {Number} workouts_len The number of workouts.
 * @param {Number} index The position of the workout.
 * @returns True if the workout is the last. Otherwise, return false.
 */
export function isLastHorizontalField(workouts_len, index) {
  return workouts_len % 2 != 0 && index + 1 == workouts_len;
}

/**
 * Convert milliseconds to "MM:SS" format.
 * @param {Number} ms The time in milliseconds.
 * @returns The time with the following format: "MM:SS".
 */
export function convertMSToMin(ms) {
  var min = Math.floor(ms / 60000);
  var secs = Math.floor((ms % 60000) / 1000).toFixed(0);
  return min + ":" + secs.padStart(2, "0");
}

/**
 * Convert milliseconds to seconds.
 * @returns The time in seconds.
 */
export function getCurrentTimeSecs() {
  return Math.round(new Date() / 1000);
}

/**
 * Check if spotify token is valid.
 * @param {Object} state The state of the token
 * @returns True if the token is valid. Otherwise, return false.
 */
export function isValidTokenMusic(state) {
  try {
    return state.time_init + Number(state.expire_in) > getCurrentTimeSecs();
  } catch {
    return false;
  }
}

/**
 * Schedule a notification.
 * @param {Number} weekday The weekday of the notification.
 * @param {Number} hour The hour of the notification.
 * @param {Number} minute The minute of the notification.
 */
export async function schedulePushNotification(weekday, hour, minute) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time's App",
      body: "It's time to train.",
      sound: "default",
    },

    trigger: {
      weekday,
      hour,
      minute,
      second: 0,
      repeats: true,
    },
  });
}

/**
 * Register process to send notification.
 * @param {Function} setUser The hooks function called to update the user state.
 * @returns The notification token.
 */
export async function registerForPushNotificationsAsync(setUser) {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus != "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus != "granted") {
    setUser((p) => ({ ...p, notification: { ...p.notification, is_active:false } }));
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

/**
 * Check if hour is valid.
 * @param {Number} hour The hour.
 * @returns True if the hour is valid. Otherwise, return false.
 */
export const isValidHour = (hour) => {
  return hour >= 0 && hour < 24;
};

/**
 * Check if hour is valid.
 * @param {String} email The email.
 * @returns True if the email is valid. Otherwise, return false.
 */
export function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+$/;
  return pattern.test(email);
}

/**
 * Get a translated text.
 * @param {String} language The language selected by user. ("En" || "Fr")
 * @param {String} key_text The key of the text in the ConstantTraduction files.
 * @returns The translated text.
 */
export function getTradText(language, key_text) {
  return TRADUCTION[key_text != undefined ? key_text : ""][language];
}

/**
 * Get a translated text used for alert.
 * @param {String} language The language selected by user. ("En" || "Fr")
 * @param {String} key_text The key of the text in the ConstantTraduction files.
 * @returns The translated text.
 */
export function getAlertText(language, key_text) {
  return ALERT[key_text != undefined ? key_text : ""][language];
}

/**
 * Get a translated text used for placeholder.
 * @param {String} language The language selected by user. ("En" || "Fr")
 * @param {String} key_text The key of the text in the ConstantTraduction files.
 * @returns The translated text.
 */
export function getPlaceholderText(language, key_text) {
  return PLACEHOLDER[key_text != undefined ? key_text : ""][language];
}

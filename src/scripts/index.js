import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

/**
 * Return a random UID.
 * @param {Number} baseInt the base used to convert number. By default is 36.
 */
export function randUID(baseInt = 36) {
  return Math.random().toString(baseInt).substr(2, 9);
}

/**
 * Return the ID of the workout.
 * @param {Number} UID the uid of the workout.
 */
export function getID(workouts, UID) {
  return workouts.findIndex((workout) => workout.uid === UID);
}

/**
 * Calculate the sum of values of a key in an object.
 * @param {Object} listObj a list of object.
 * @param {String} key the key of the value.
 * @returns the sum of the values of the key.
 */
export function sumValueInObject(listObj, key) {
  var result = 0;
  for (const obj in listObj) {
    if (Object.hasOwnProperty.call(listObj, obj)) {
      var value = parseInt(listObj[obj][key]);
      if(!isNaN(value))
        result += value;
    }
  }

  return result;
}

/**
 * Return true a key of the object is empty, else false.
 * @param {Object} obj the object to check if it is empty.
 */
export function isEmptyKey(obj) {
  for (const value in obj) {
    var v = obj[value];
    if (v.length !== 0 && Array.isArray(v))
      for (const i in v) if (isEmptyField(v[i])) return true;

    if (v.length === 0) return true;
  }

  return false;
}

/**
 * Play a sound.
 * @param {Function} setSound the hook function called to set the sound.
 * @param {String} file the path of the sound file.
 */
export async function playSound(setSound, file) {
  const { sound } = await Audio.Sound.createAsync(file);
  setSound(sound);
  await sound.playAsync();
}

/**
 * Format seconds to format [HH, MM, SS].
 * @param {Number} secs the seconds to format
 * @returns an array of strings containing in the following order
 * the hours, minutes and seconds in the correct format.
 */
export function arrFormatHHMMSS(secs) {
  return [
    String(Math.floor(secs / 3600)).padStart(2, "0"),
    String(Math.floor(secs / 60) % 60).padStart(2, "0"),
    String(secs % 60).padStart(2, "0"),
  ];
}

export function getDurationFormat(secs){
  var format_secs = String(Math.floor(secs / 60));
  if (format_secs == 0)
    return `${secs}s`
    
  else
    return `~${format_secs}min`
}

/**
 * A timer.
 * @param {Function} setTime the hook function called to set the current time.
 * @returns An array containings start, stop timer functions and a boolean set to true if the timer is running.
 */
export function useTimer(setTime) {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!busy) return;

    setBusy(true);
    const timer = setTimeout(setTime, 1000);

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
 * @returns the remaining text.
 */
export function getTxtCountSeries(nb_series, nb_max_series, nb_round, nb_max_round) {
  return `Exercice: ${nb_series}/${nb_max_series}\nRound: ${nb_round}/${nb_max_round}`;
}

/**
 * Change the orientation of screen.
 * @param {Boolean} is_portrait The orientation of the screen.
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
    const value = workout[key];

    // The value is an empty array.
    if (Array.isArray(value) && value.length === 0) return true;

    // The value an array containing sub-object.
    if (Array.isArray(value) && value.length !== 0)
      for (var sub_object in value) {
        for (var key in sub_object) {
          const element = sub_object[key];
          if (element.length === 0) return true;
        }
      }

    // The value is empty object.
    if (!Array.isArray(value) && value.length === 0) return true;
  }

  return false;
};

/**
 * Check if all fields of the workout are empty.
 * @param {Object} workout The dictionary containing the state of the workout.
 * @param {Object} whitelist The dictionary containing the fields that are not checked.
 * @returns True if the all field are empty. Otherwise, return false.
 */
export const allAreEmpty = (object, whitelist=["uid", "difficulty", "days"]) => {
  for (var key in object) {
    if (!whitelist.includes(key.toString())) {
      var value = object[key];
      if (value.length > 0) return false;
    }
  }

  return true;
};

export function getWelcomeTxt () {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 0 && hours <= 12)
    return "Good Morning";
  
  else if (hours > 12 && hours <= 18)
    return "Good Afternoon";
  
  else
    return "Good Evening";
  
}

export function getDuration(series_list){
  var time = sumValueInObject(series_list, "lap");
  return getDurationFormat(time);
}

export function isLastHorizontalField(workouts_len, index){
  return workouts_len % 2 != 0 && index + 1 == workouts_len;
}

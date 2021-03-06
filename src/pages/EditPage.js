// Import Librairies
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";

// Import Custom components.
import ButtonCTA from "../components/ButtonCTA";
import ContainerPage from "../components/ContainerPage";
import EditBodyOptions from "../components/EditBodyOptions";
import EditFooter from "../components/EditFooter";
import HeaderBodyEdit from "../components/HeaderBodyEdit";
import Header from "../components/Header";
import WorkoutField from "../components/WorkoutField";

// Import Functions
import {
  allAreEmpty,
  getID,
  isValidHour,
  schedulePushNotification,
  setOrient,
  getRandUID,
  getTradText,
  getAlertText,
} from "../scripts";
import {
  editWorkoutCreator,
  removeWorkoutCreator,
} from "../redux/actionCreators";

// Import Constants
import { COLORS_APP } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { ICON, LOGO } from "../utils/ConstantImages";
import { seriesState } from "../redux/state";
import { HOME } from "../utils/ConstantPage";

const EditPage = ({ navigation, route }) => {
  // Set the orientation to portrait.
  setOrient();

  // Get states from redux store.
  const workouts_store = useSelector((state) => state.workouts);
  const user_store = useSelector((state) => state.user);

  // Define variables.
  const dispatch = useDispatch();
  const id = getID(workouts_store, route.params.workout_UID);
  const [workout, setWorkout] = useState(workouts_store[id]);
  const [user, setUser] = useState(user_store);
  const [showOptions, setShowOptions] = useState(false);

  const ListHeaderComponent = useCallback(
    () => (
      <HeaderBodyEdit
        language={user_store.language}
        workout={workout}
        setWorkout={(v) => setWorkout(v)}
      />
    ),
    [showOptions, workout.days, workout.difficulty]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <WorkoutField
        series_state={item}
        setWorkout={setWorkout}
        state_rest={item.rest}
        language={user_store.language}
      />
    ),
    []
  );

  const ListFooterComponent = useCallback(
    () => <EditFooter onPressAddSeries={addSeries} />,
    [workout]
  );

  const keyExtractor = useCallback((item) => item.uid, []);

  return (
    <ContainerPage style={styles.ctn_main}>
      <Header
        key_text={"title_edit_page"}
        path_img={LOGO.edit}
        onPressClose={alertUnsaved}
      />

      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={"padding"}
        style={styles.ctn_body}
      >
        {!showOptions ? (
          <FlatList
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            contentContainerStyle={{ paddingBottom: 150 }}
            extraData={workout}
            data={workout.series}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EditBodyOptions
            alertRemove={alertRemove}
            setWorkout={setWorkout}
            workout={workout}
            user={user}
            setUser={setUser}
            dispatch={dispatch}
          />
        )}
      </KeyboardAvoidingView>

      <View style={styles.ctn_footer}>
        <ButtonCTA
          source={ICON.white.option}
          onPress={() => setShowOptions(!showOptions)}
          is_main={false}
        />
        <ButtonCTA
          source={ICON.white.save}
          onPress={saveWorkout}
          key_text={"save"}
        />
      </View>
    </ContainerPage>
  );

  /** Add a new series in the workout. */
  function addSeries() {
    const uid = getRandUID(16) + "_";

    setWorkout((p) => ({
      ...p,
      series: [...p.series, seriesState(uid)],
    }));
  }

  /** Show an alert if the workout wasn't be saved. */
  function alertUnsaved() {
    // At less one field is field. And title is filled.
    if (!allAreEmpty(workout)) {
      Alert.alert(
        getAlertText(user_store.language, "unsaved_ttl"),
        getAlertText(user_store.language, "unsaved_body"),
        [
          {
            text: getAlertText(user_store.language, "unsaved_btn_1"),
            style: "cancel",
          },
          {
            text: getAlertText(user_store.language, "unsaved_btn_2"),
            style: "destructive",
            onPress: () => navigation.navigate(HOME),
          },
        ]
      );
    } else removeWorkout();
  }

  /** Show before to remove the workout. */
  function alertRemove() {
    Alert.alert(
      getAlertText(user_store.language, "rmv_workout_ttl"),
      getAlertText(user_store.language, "rmv_workout_body"),
      [
        {
          text: getAlertText(user_store.language, "rmv_workout_btn"),
          style: "destructive",
          onPress: removeWorkout,
        },
        {
          text: getAlertText(user_store.language, "cancel"),
          style: "cancel",
        },
      ]
    );
  }

  /** Save workout to redux store. Then, back to homepage. */
  function saveWorkout() {
    if (
      workout.notification.alert_hour == "" ||
      !isValidHour(workout.notification.alert_hour)
    ) {
      setWorkout((p) => ({
        ...p,
        notification: {
          ...p,
          alert_hour: workoutState.notification.alert_hour,
        },
      }));
    }

    if (workout.notification.is_active && workout.notification.token !== null) {
      const id_days = [2, 3, 4, 5, 6, 7, 1];
      for (let index = 0; index < 6; index++)
        if (workout.days[index])
          schedulePushNotification(
            id_days[index],
            Number(workout.notification.alert_hour),
            0
          );
    }

    dispatch(editWorkoutCreator(workout.uid, workout));
    navigation.navigate(HOME);
  }

  /** Remove workout to redux store. Then, back to homepage. */
  function removeWorkout() {
    dispatch(removeWorkoutCreator(workout.uid));
    navigation.navigate(HOME);
  }
};

export default EditPage;

const styles = StyleSheet.create({
  ctn_flex: {
    flexDirection: "row",
  },

  ctn_header: {
    padding: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  icn_logo: {
    width: 64,
    height: 64,
  },

  txt_header: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
  },

  btn_close: {
    position: "absolute",
    right: 0,
    padding: 10,
  },

  ctn_body: {
    width: "90%",
    flex: 1,
    alignSelf: "center",
  },

  ctn_footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS_APP.background,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    paddingVertical: 15,
  },
});

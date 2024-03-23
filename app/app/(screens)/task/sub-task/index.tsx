import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import moment from "moment";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import PrioritySelector from "../../../../../src/components/complex/prioritySelector/PrioritySelector";
import SecondaryHeader from "../../../../../src/components/modular/molecular/headers/SecondaryHeader";
import { SubTaskDTO } from "../../../../../src/models/task/TaskSchema";
import { addSubTask } from "../../../../../src/redux/slices/TaskSlice";

type Props = object;

const Index = (props: Props) => {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState(
    moment(new Date()).format("hh:mm A"),
  );
  const [endTime, setEndTime] = useState(moment(new Date()).format("hh:mm A"));

  //   time pickers
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);

  //   Name Error
  const [nameError, setNameError] = useState(false);

  //   Funtions
  const createSubTask = () => {
    if (name === "") {
      setNameError(true);
    } else {
      const data: SubTaskDTO = {
        name: name!,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        priority,
        startDate: startDate
          ? moment(startDate).format("MMM Do YY")
          : undefined,
        endDate: endDate ? moment(endDate).format("MMM Do YY") : undefined,
        startTime,
        endTime,
        id: id! as string,
      };

      dispatch(addSubTask(data));
      router.back();
    }
  };

  return (
    <View className="flex-1">
      <View className="mx-6 flex-1">
        <SecondaryHeader title="Update Sub-Task" />

        {/* Form */}
        <ScrollView className="mt-12 flex-1">
          <KeyboardAwareScrollView extraHeight={200}>
            {/* Name and Type */}
            <View className="flex-row justify-center w-full gap-x-6">
              <View className="flex-1">
                {/* Name */}
                <TextInput
                  label="Task Name *"
                  value={name}
                  onChangeText={setName}
                  onBlur={() => {
                    if (name === "") {
                      setNameError(true);
                    } else {
                      setNameError(false);
                    }
                  }}
                />
                {nameError && (
                  <HelperText type="error" visible={nameError}>
                    Name is required
                  </HelperText>
                )}
              </View>
            </View>

            {/* Date Pickers */}
            <View className="mt-6 flex-row items-center gap-x-6">
              <DatePickerInput
                locale="en-GB"
                label="Start Date"
                value={!startDate ? new Date() : startDate}
                onChange={(d) => setStartDate(d as Date)}
                inputMode="start"
                mode="outlined"
                validRange={{ startDate: new Date() }}
              />
              <DatePickerInput
                locale="en-GB"
                label="End Date"
                value={
                  !endDate ? (startDate ? startDate : new Date()) : endDate
                }
                onChange={(d) => setEndDate(d as Date)}
                inputMode="start"
                mode="outlined"
                validRange={{
                  startDate: startDate ? startDate : new Date(),
                }}
              />
            </View>

            {/* Time Pickers */}
            <View className="mt-6 flex-row items-center gap-x-6">
              <TextInput
                label="Start Time"
                value={startTime}
                onFocus={() => setVisible1(true)}
                right={
                  <TextInput.Icon
                    icon="clock"
                    onPress={() => setVisible1(true)}
                  />
                }
                style={{ flex: 1 }}
              />

              <TextInput
                label="End Time"
                value={endTime}
                onFocus={() => setVisible2(true)}
                right={
                  <TextInput.Icon
                    icon="clock"
                    onPress={() => setVisible2(true)}
                  />
                }
                style={{ flex: 1 }}
              />
            </View>

            {/* Priority Selectors */}
            <View className="mt-6 flex-row items-center justify-between">
              <PrioritySelector current={priority} setPriority={setPriority} />
            </View>

            {/* Submit Button */}
            <View className="mt-12 flex justify-center">
              <Button
                onPress={createSubTask}
                mode="contained"
                style={{ alignSelf: "center", width: "50%" }}
                compact
              >
                Save
              </Button>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>

        {/* time picker modals */}
        {visible1 && (
          <Animated.View
            className="bg-background/95 absolute top-0 bottom-0 left-0 right-0"
            entering={FadeIn}
            exiting={FadeOut}
          >
            <TimePickerModal
              visible={visible1}
              onDismiss={() => setVisible1(false)}
              onConfirm={({ hours, minutes }) => {
                setVisible1(false);
                setStartTime(moment({ hours, minutes }).format("hh:mm A"));
              }}
              hours={
                startTime !== ""
                  ? parseInt(startTime.split(":")[0], 10)
                  : parseInt(moment(new Date()).format("HH"), 10)
              }
              minutes={
                startTime !== ""
                  ? parseInt(startTime.split(":")[1], 10)
                  : parseInt(moment(new Date()).format("MM"), 10)
              }
              locale="en-GB"
            />
          </Animated.View>
        )}

        {visible2 && (
          <Animated.View
            className="bg-background/95 absolute top-0 bottom-0 left-0 right-0"
            entering={FadeIn}
            exiting={FadeOut}
          >
            <TimePickerModal
              visible={visible2}
              onDismiss={() => setVisible2(false)}
              onConfirm={({ hours, minutes }) => {
                setVisible2(false);
                setEndTime(moment({ hours, minutes }).format("hh:mm A"));
              }}
              hours={
                endTime !== ""
                  ? parseInt(endTime.split(":")[0], 10)
                  : parseInt(moment(new Date()).format("HH"), 10)
              }
              minutes={
                endTime !== ""
                  ? parseInt(endTime.split(":")[1], 10)
                  : parseInt(moment(new Date()).format("MM"), 10)
              }
              locale="en-GB"
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default Index;

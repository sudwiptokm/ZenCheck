import Animated, { LinearTransition } from "react-native-reanimated";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import HomeHeader from "../../../src/components/modular/molecular/headers/HomeHeader";
import { TaskDTO } from "../../../src/models/task/TaskSchema";
import TaskView from "../../../src/components/modular/atomic/TaskView";
import { selectAllTasks } from "../../../src/redux/slices/TaskSlice";
import { useAppSelector } from "../../../src/redux/hooks";
import { useNavigation } from "expo-router";

type Props = object;

const CompletedTasks = (props: Props) => {
  const navigation = useNavigation();

  const tasks: TaskDTO[] = useAppSelector(selectAllTasks);

  const [localTasks, setLocalTasks] = React.useState(
    tasks.filter((task) => task.isCompleted === true),
  );

  useEffect(() => {
    setLocalTasks(tasks.filter((task) => task.isCompleted === true));
  }, [tasks]);
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#121212" }}>
      <View className="min-h-screen px-6">
        {/* Main Logo Text */}
        <HomeHeader navigation={navigation} title="Completed Tasks" />

        {/* Task View */}
        <ScrollView className="mt-12">
          <Animated.View className="gap-y-6" layout={LinearTransition}>
            {localTasks.map((task, index) => (
              <TaskView task={task} key={task.id} />
            ))}
          </Animated.View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CompletedTasks;

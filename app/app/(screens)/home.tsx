import Animated, { LinearTransition } from "react-native-reanimated";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { router, useNavigation } from "expo-router";

import { FAB } from "react-native-paper";
import HomeHeader from "../../../src/components/modular/molecular/headers/HomeHeader";
import { TaskDTO } from "../../../src/models/task/TaskSchema";
import TaskView from "../../../src/components/modular/atomic/TaskView";
import { selectAllTasks } from "../../../src/redux/slices/TaskSlice";
import { useAppSelector } from "../../../src/redux/hooks";

type Props = object;

const Index = (props: Props) => {
  const navigation = useNavigation();

  const tasks: TaskDTO[] = useAppSelector(selectAllTasks);

  const [localTasks, setLocalTasks] = React.useState(
    tasks.filter((task) => task.isCompleted === false),
  );

  useEffect(() => {
    setLocalTasks(tasks.filter((task) => task.isCompleted === false));
  }, [tasks]);

  return (
    <SafeAreaView className="">
      <View className="min-h-screen px-6">
        {/* Main Logo Text */}
        <HomeHeader navigation={navigation} />

        {/* Task View */}
        <ScrollView className="mt-12">
          <Animated.View className="gap-y-6" layout={LinearTransition}>
            {localTasks.map((task, index) => (
              <TaskView task={task} key={task.id} />
            ))}
          </Animated.View>
        </ScrollView>
      </View>
      <FAB
        icon="plus"
        onPress={() => router.push("app/task/create-task")}
        className="absolute right-0 bottom-10 m-4 bg-surface"
        variant="surface"
      />
    </SafeAreaView>
  );
};

export default Index;

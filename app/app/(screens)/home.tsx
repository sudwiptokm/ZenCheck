import Animated, { LinearTransition } from "react-native-reanimated";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { router, useNavigation } from "expo-router";
import {
  sortTasksByDate,
  sortTasksByPriority,
} from "../../../src/utils/helperFunctions";

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

  console.log({ tasks });

  const [localTasks, setLocalTasks] = React.useState(
    tasks.filter((task) => task.isCompleted === false),
  );
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [sortType, setSortType] = React.useState<"date" | "priority">("date");

  // Sorting the tasks based on the sortType and sortOrder
  useEffect(() => {
    if (sortType === "priority") {
      const sortedTasks = sortTasksByPriority(localTasks, sortOrder);
      setLocalTasks(sortedTasks);
    } else if (sortType === "date") {
      const sortedTask = sortTasksByDate(localTasks, sortOrder);
      setLocalTasks(sortedTask);
    }
  }, [sortOrder, sortType]);

  useEffect(() => {
    setLocalTasks(tasks.filter((task) => task.isCompleted === false));
  }, [tasks]);

  return (
    <SafeAreaView className="">
      <View className="min-h-screen px-6">
        {/* Main Logo Text */}
        <HomeHeader
          navigation={navigation}
          setSortOrder={setSortOrder}
          setSortType={setSortType}
          sortOrder={sortOrder}
          sortType={sortType}
        />

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

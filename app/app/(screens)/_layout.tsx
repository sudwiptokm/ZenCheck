import { Stack } from "expo-router";
import React from "react";

type Props = object;

const Layout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#121212" },
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="task" />
      <Stack.Screen name="test" />
    </Stack>
  );
};

export default Layout;

import { Pressable, SafeAreaView, View } from "react-native";

import { DrawerContentComponentProps } from "@react-navigation/drawer";
import Logo from "@assets/images/zen_check.svg";
import { MaterialIcons } from "@expo/vector-icons";
import PText from "../modular/molecular/texts/PText";
import React from "react";
import { router } from "expo-router";

type Props = {
  props: DrawerContentComponentProps;
};

const contents = [
  {
    icon: "home",
    text: "Home",
    href: "app/home",
  },
  {
    icon: "settings",
    text: "Settings",
    href: "/settings",
  },
  {
    icon: "calendar-month",
    text: "Sync with Calender",
    href: "/calendar",
  },
  {
    icon: "check",
    text: "Completed Tasks",
    href: "app/drawer/completed-tasks",
  },
  {
    icon: "show-chart",
    text: "Goal Analysis",
    href: "/goal-analysis",
  },
  {
    icon: "edit",
    text: "Notes",
    href: "/notes",
  },
  {
    icon: "chat-bubble-outline",
    text: "Feedback",
    href: "/feedback",
  },
  {
    icon: "support",
    text: "Support",
    href: "/support",
  },
  {
    icon: "star-border",
    text: "Rate us",
    href: "/rate-us",
  },
];

const CustomDrawerContent = (props: Props) => {
  return (
    <View className="flex-1 bg-surface">
      <SafeAreaView className="mx-4">
        <Logo height={60} width={60} />
        <View className="mt-10">
          {contents.map((content, index) => (
            <Pressable
              key={index}
              className="py-5 flex-row items-center gap-x-3"
              onPress={() => router.push(content.href)}
            >
              <MaterialIcons
                name={content.icon as keyof typeof MaterialIcons.glyphMap}
                size={24}
                color="white"
              />
              <PText className="text-2xl font-semibold">{content.text}</PText>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CustomDrawerContent;

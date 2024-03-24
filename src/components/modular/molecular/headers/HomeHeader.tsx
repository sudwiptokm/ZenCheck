import { Divider, Menu } from "react-native-paper";
import { DrawerActions, NavigationProp } from "@react-navigation/native";
import { Pressable, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import PText from "../texts/PText";
import React from "react";

type Props = {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  title?: string;
  sortOrder?: "asc" | "desc";
  sortType?: "date" | "priority";
  setSortOrder?: (order: "asc" | "desc") => void;
  setSortType?: (type: "date" | "priority") => void;
};

const HomeHeader = (props: Props) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View className="flex-row justify-between items- mt-6">
      <Pressable
        onPress={() => {
          props.navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        <MaterialIcons name="menu" size={24} color="white" />
      </Pressable>
      <PText className="text-2xl font-semibold">
        {props.title ? props.title : "Your Tasks"}
      </PText>

      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Pressable onPress={() => setVisible(true)}>
            <MaterialIcons name="filter-list" size={24} color="white" />
          </Pressable>
        }
        anchorPosition="bottom"
      >
        <Menu.Item
          onPress={() => {
            props.setSortType!("date");
          }}
          title="By Date"
          leadingIcon={props.sortType === "date" ? "check" : undefined}
        />
        <Menu.Item
          onPress={() => {
            props.setSortType!("priority");
          }}
          title="By Priority"
          leadingIcon={props.sortType === "priority" ? "check" : undefined}
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            props.setSortOrder!("asc");
          }}
          title="Ascending"
          leadingIcon={props.sortOrder === "asc" ? "check" : undefined}
        />
        <Menu.Item
          onPress={() => {
            props.setSortOrder!("desc");
          }}
          title="Descending"
          leadingIcon={props.sortOrder === "desc" ? "check" : undefined}
        />
      </Menu>
    </View>
  );
};

export default HomeHeader;

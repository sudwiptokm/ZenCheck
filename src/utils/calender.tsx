import * as Calendar from "expo-calendar";

import { useEffect } from "react";
import { Platform } from "react-native";

const useCalendarPermissions = () => {
  const getCalendarPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT,
      );
      console.log("Here are all your calendars:");
      console.log({ calendars });
    }
  };

  useEffect(() => {
    getCalendarPermissions();
  }, []);
};

export default useCalendarPermissions;

export async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT,
  );
  const defaultCalendars = calendars.filter(
    (each) => each.source.name === "Default",
  );
  return defaultCalendars.length
    ? defaultCalendars[0].source
    : calendars[0].source;
}

export async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "Expo Calendar" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Expo Calendar",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: (defaultCalendarSource as Calendar.Source)?.id,
    source: defaultCalendarSource as Calendar.Source,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
  return newCalendarID;
}

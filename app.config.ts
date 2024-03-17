import { ExpoConfig } from "expo/config";

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  name: "my-app",
  slug: "my-app",
  scheme: "my-circle",
  plugins: ["expo-router", "@react-native-google-signin/google-signin"],
  userInterfaceStyle: "dark",
  backgroundColor: "#121212",
  android: {
    package: "com.sudwiptokm.zencheck",
  },
};

export default config;

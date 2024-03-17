// import React, { useEffect } from "react";
// import { SafeAreaView, View } from "react-native";

// import PrimaryButton from "@components/modular/molecular/buttons/PrimaryButton";
// import PText from "@components/modular/molecular/texts/PText";
// import { router } from "expo-router";
// import PagerView from "react-native-pager-view";
// import Logo from "../assets/images/zen_check.svg";

// type Props = object;

// /* Indicator */
// const IndicatorBar = ({ activeCarousel }) => {
//   return (
//     <View className="flex-row justify-center gap-x-4">
//       <View
//         className={`w-7 h-2 rounded-full bg-gray-400 ${
//           activeCarousel === 0 && "bg-white"
//         } transition-colors ease-in`}
//       />
//       <View
//         className={`w-7 h-2 rounded-full bg-gray-400 ${
//           activeCarousel === 1 && "bg-white"
//         } transition-colors ease-in`}
//       />
//       <View
//         className={`w-7 h-2 rounded-full bg-gray-400 ${
//           activeCarousel === 2 && "bg-white"
//         } transition-colors ease-in`}
//       />
//     </View>
//   );
// };

// const Index = (props: Props) => {
//   const [activeCarousel, setActiveCarousel] = React.useState<number>(0);

//   let timer: NodeJS.Timer;
//   const pagerViewRef = React.useRef<PagerView>(null);

//   useEffect(() => {
//     timer = setInterval(() => {
//       setActiveCarousel((prev) => {
//         if (prev === 2) {
//           return 0;
//         } else {
//           return prev + 1;
//         }
//       });
//     }, 3000);
//   }, []);

//   useEffect(() => {
//     pagerViewRef.current?.setPage(activeCarousel);
//   }, [activeCarousel]);

//   return (
//     <SafeAreaView className="flex-1 mx-6">
//       <PText className="text-center text-3xl font-bold mt-10">
//         Welcome to ZenCheck
//       </PText>
//       <PText className="text-center mt-6">
//         Please login or create new account to continue
//       </PText>

//       {/* Logo */}
//       <View className="mt-10 justify-end items-center ">
//         <Logo />
//       </View>

//       {/* Carousel */}
//       <View className="flex-1 justify-center ">
//         <PagerView
//           style={{ flex: 0.5 }}
//           initialPage={activeCarousel}
//           onPageSelected={(e) => {
//             setActiveCarousel(e.nativeEvent.position);
//           }}
//           ref={pagerViewRef}
//         >
//           <View className="flex-1 justify-center items-center" key="1">
//             <PText className="text-center text-xl font-bold">
//               Manage your tasks
//             </PText>
//             <PText className="text-center mt-6 text-nowrap">
//               You can easily manage all of your daily tasks in DoMe for free
//             </PText>
//           </View>
//           <View className="flex-1 justify-center items-center" key="2">
//             <PText className="text-center text-xl font-bold">
//               Create daily routine
//             </PText>
//             <PText className="text-center mt-6">
//               In ZenCheck you can create your personalized routine to stay
//               productive
//             </PText>
//           </View>
//           <View className="flex-1 justify-center items-center" key="3">
//             <PText className="text-center text-xl font-bold">
//               Organize your tasks
//             </PText>
//             <PText className="text-center mt-6">
//               You can organize your daily tasks by adding your tasks into
//               separate categories
//             </PText>
//           </View>
//         </PagerView>
//       </View>
//       <View className="flex-1 justify-between">
//         <IndicatorBar activeCarousel={activeCarousel} />
//         <View className="flex-row gap-x-4 items-center mb-6">
//           <PrimaryButton
//             title="Login"
//             onPress={() => {
//               clearTimeout(timer);
//               router.push("auth/login");
//             }}
//             className="flex-1"
//           />
//           <PrimaryButton
//             title="Register"
//             onPress={() => {
//               clearTimeout(timer);
//               router.push("auth/register");
//             }}
//             variant="outline"
//             className="flex-1"
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Index;

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { SafeAreaView } from "react-native";

export default function App() {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      "837589719811-o0kkvde18rau4ffsvc0eo4seuja3s9lc.apps.googleusercontent.com",
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({ userInfo });
      console.log(JSON.stringify(userInfo, null, 2));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </SafeAreaView>
  );
}

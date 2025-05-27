/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#1e88e5';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    //icon: '#687076',
    icon: '#000000',
    //tabIconDefault: '#687076',
    tabIconDefault: '#000000',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    //text: '#000000',
    background: '#151718',
    tint: tintColorDark,
    //icon: '#9BA1A6',
    icon: '#000000',
    //tabIconDefault: '#9BA1A6',
    tabIconDefault: '#000000',
    tabIconSelected: tintColorDark,
  },
};

import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';

export default function Main() {
  return (
    // Wraps the whole app to use react-native-paper library
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);

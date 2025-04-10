import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootSiblingParent} from 'react-native-root-siblings';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <RootSiblingParent>
          <RootNavigator />
        </RootSiblingParent>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

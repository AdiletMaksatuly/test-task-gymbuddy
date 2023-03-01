import {StatusBar, StyleSheet, View} from 'react-native';
import ExerciseScreen from "./src/components/ExerciseScreen";

export default function App() {
  return (
      <>
        <StatusBar hidden={false} />
        <View style={styles.container}>
          <ExerciseScreen />
        </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

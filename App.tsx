import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import ExerciseScreen from "./src/components/ExerciseScreen";

export default function App() {
  return (
      <>
        <StatusBar hidden={false} />
        <ScrollView style={styles.container}>
          <ExerciseScreen />
        </ScrollView>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

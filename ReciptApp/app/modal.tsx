import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'react-native';

export default function ModalScreen() {
  const theme = useColorScheme(); // This hook returns 'light' or 'dark'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SplitIt!</Text>
      <View style={theme === 'light' ? styles.separatorLight : styles.separatorDark} />
      <Text style={styles.description}>
        Easily split your meal costs with friends! Simply scan your receipt, and 
        select the items you've enjoyed. You can then specify what percentage 
        of each item you had, and we'll calculate your individual cost.
      </Text>
      <Text style={styles.instructions}>
        To get started, scan your receipt using the button below and follow the 
        on-screen instructions.
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    textAlign: 'center',
    color: 'grey',
  },
  separatorLight: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee', // Light background color
  },
  separatorDark: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.1)', // Dark background color
  },
});
import {StyleSheet, Text, View} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'red'}}>Home Screen changed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

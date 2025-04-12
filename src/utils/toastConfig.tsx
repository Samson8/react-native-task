import {BaseToast, ToastConfig} from 'react-native-toast-message';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet} from 'react-native';

/*
  1. Create the config
*/
export const getToastConfig = (): ToastConfig => ({
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: props => (
    <BaseToast
      {...props}
      style={styles.toast}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.success}
      text2Style={styles.body}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: props => (
    <BaseToast
      {...props}
      style={styles.toast}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.error}
      text2Style={styles.body}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
    />
  ),
});

const styles = StyleSheet.create({
  toast: {
    borderLeftWidth: 0,
    backgroundColor: Colors.grey,
  },
  toastContent: {paddingHorizontal: 4},
  error: {
    color: Colors.red,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  success: {
    color: Colors.green,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  body: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
});

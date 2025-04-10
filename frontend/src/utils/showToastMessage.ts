import Toast from 'react-native-root-toast';

const showToastMessage = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
  });
};

export default showToastMessage;

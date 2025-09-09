import { Alert } from "react-native";

export default function handleSubmitDev(
  fieldOne: string,
  fieldTwo: string,
  clearFields: () => void,
) {
  const output: string = `Submitted\nField 1: ${fieldOne}\nField 2: ${fieldTwo}`;

  Alert.alert(output);
  console.log(output);

  clearFields();
}

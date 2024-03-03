import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";
import { fontFamily } from "../constants/fontFamily";

export const globalStyles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:appColors.white,
  },

  text:{
    fontFamily:fontFamily.regular,
    fontSize:14,
    color: appColors.text,
    
  }
})
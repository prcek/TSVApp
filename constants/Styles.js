import { Platform,StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    text_ok: {
      fontWeight: 'bold',
      color:"green",
      fontSize: 25,
    },
    text_ko: {
      fontWeight: 'bold',
      color:"red",
      fontSize: 25,
    },
    
    input: Platform.OS === 'ios' ? {
      //margin:16,
      //fontWeight: 'bold',
      fontSize: 25,
      borderColor: 'gray', 
      borderWidth: 1
    }:{
      //fontWeight: 'bold',
      fontSize: 25,
    },
  });

  
  export default styles;
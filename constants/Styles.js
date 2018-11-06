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
    
    button: {
        height:50,
        margin:4,
    },

    buttonT: {
      height:50,
      margin:4,
      fontSize: 40,
      fontWeight: '400',
    },

    screen_view: { 
        padding: 16, 
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        alignItems: 'stretch'
    },

    input: Platform.OS === 'ios' ? {
      margin:4,
      //fontWeight: 'bold',
      fontSize: 25,
      borderColor: 'gray', 
      borderWidth: 1
    }:{
      //fontWeight: 'bold',
      //margin:4,
      paddingLeft:5,
      height:50,
      fontSize: 25,
    },

    input2: Platform.OS === 'ios' ? {
      margin:4,
      //fontWeight: 'bold',
      flexGrow:1,
      fontSize: 25,
      borderColor: 'gray', 
      borderWidth: 1
    }:{
      //fontWeight: 'bold',
      //margin:4,
      flexGrow:1,
      paddingLeft:5,
      height:50,
      fontSize: 25,
    },

  });

  
  export default styles;
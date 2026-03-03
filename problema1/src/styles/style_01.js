	import { StyleSheet } from 'react-native';

export const style_01 = StyleSheet.create({

  card:{
    backgroundColor:'#FFFFFF',
    padding:10,
    margin:8,
    borderRadius:10,

    flexDirection:'row',     // horizontal
    alignItems:'flex-start' // NO center (causa salto abajo)
  },

  img:{
    width:80,
    height:80,
    resizeMode:'contain',   // evita que la imagen se expanda
    marginRight:10
  },

  info:{
    flex:1                  // ocupa el resto del ancho
  },

  title:{
    fontSize:16,
    fontWeight:'bold'
  },

  text:{
    fontSize:13
  }

});

import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { style_01 } from '../styles/style_01';

const zodiacData = [

{
 nombre:'Acuario',
 fecha:'20 Enero - 18 Febrero',
 elemento:'Aire',
 astro:'Urano',
 piedra:'Amatista',
 img: require('../images/01_Acuario.png')
},

{
 nombre:'Piscis',
 fecha:'19 Febrero - 20 Marzo',
 elemento:'Agua',
 astro:'Neptuno',
 piedra:'Aguamarina',
 img: require('../images/02_Pisis.png')
},

{
 nombre:'Aries',
 fecha:'21 Marzo - 19 Abril',
 elemento:'Fuego',
 astro:'Marte',
 piedra:'Diamante',
 img: require('../images/03_Aries.png')
},

{
 nombre:'Tauro',
 fecha:'20 Abril - 20 Mayo',
 elemento:'Tierra',
 astro:'Venus',
 piedra:'Esmeralda',
 img: require('../images/04_Tauro.png')
},

{
 nombre:'Géminis',
 fecha:'21 Mayo - 20 Junio',
 elemento:'Aire',
 astro:'Mercurio',
 piedra:'Ágata',
 img: require('../images/05_Geminis.png')
},

{
 nombre:'Cáncer',
 fecha:'21 Junio - 22 Julio',
 elemento:'Agua',
 astro:'Luna',
 piedra:'Perla',
 img: require('../images/06_Cancer.png')
},

{
 nombre:'Virgo',
 fecha:'23 Agosto - 22 Septiembre',
 elemento:'Tierra',
 astro:'Mercurio',
 piedra:'Zafiro',
 img: require('../images/08_Virgo.png')
},

{
 nombre:'Libra',
 fecha:'23 Septiembre - 22 Octubre',
 elemento:'Aire',
 astro:'Venus',
 piedra:'Ópalo',
 img: require('../images/09_Libra.png')
},

{
 nombre:'Escorpio',
 fecha:'23 Octubre - 21 Noviembre',
 elemento:'Agua',
 astro:'Plutón',
 piedra:'Topacio',
 img: require('../images/10_Escorpio.png')
},

{
 nombre:'Sagitario',
 fecha:'22 Noviembre - 21 Diciembre',
 elemento:'Fuego',
 astro:'Júpiter',
 piedra:'Turquesa',
 img: require('../images/11_Sagitario.png')
},

{
 nombre:'Capricornio',
 fecha:'22 Diciembre - 19 Enero',
 elemento:'Tierra',
 astro:'Saturno',
 piedra:'Granate',
 img: require('../images/12_Capricornio.png')
}

];

const Index = () => {
  return (

    <ScrollView>

      {zodiacData.map((item,index)=>(

        <View style={style_01.info} key={index}>

          <Image source={item.img} style={style_01.img} />

          <View style={style_01.info}>
            <Text style={style_01.title}>{item.nombre}</Text>
            <Text style={style_01.text}>Fechas: {item.fecha}</Text>
            <Text style={style_01.text}>Elemento: {item.elemento}</Text>
            <Text style={style_01.text}>Astro: {item.astro}</Text>
            <Text style={style_01.text}>Piedra: {item.piedra}</Text>
          </View>

        </View>

      ))}

    </ScrollView>

  );
}

export default Index;

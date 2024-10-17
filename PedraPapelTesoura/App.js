import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [jogadaSelecionada, setJogadaSelecionada] = useState(0);
  const [jogadaAleatoriaSelecionada, setJogadaAleatoriaSelecionada] = useState(0);
  let [textoVitorioso, setTextoVitorioso] = useState('');

  const [jogadas, setJogadas] = useState([
    {key: 1, nome: 'Escolha', urlIMG: require('./vazio.png'), enable: false, ganha: null},
    {key: 2, nome: 'Pedra', urlIMG: require('./pedra.png'), enable: true, ganha: 'Papel'},
    {key: 3, nome: 'Papel', urlIMG: require('./papel.png'), enable: true, ganha: 'Tesoura'},
    {key: 4, nome: 'Tesoura', urlIMG: require('./tesoura.png'), enable: true, ganha: 'Pedra'}
  ]);
  const [jogadaComputador, setJogadaComputador] = useState([
    {key: 1, nome: null, urlIMG: require('./vazio.png')},
    {key: 2, nome: 'Pedra', urlIMG: require('./pedra.png')},
    {key: 3, nome: 'Papel', urlIMG: require('./papel.png')},
    {key: 4, nome: 'Tesoura', urlIMG: require('./tesoura.png')},
  ]);
  jogadaAleatoria = () => {
    let index = 0;
    while(index === 0){
      index = Math.floor(Math.random() * jogadaComputador.length);
    }
    console.log(index);
    setJogadaAleatoriaSelecionada(index);
    
    return index;
  }
  verificarGanhador = (indexJogador, indexComputador) => {
    console.log(indexJogador.toString() + indexComputador.toString());
    
    if(jogadas[indexJogador].nome === jogadaComputador[indexComputador].nome){
      setTextoVitorioso('Empatou!');
    }
    else if(jogadaComputador[indexComputador].nome === jogadas[indexJogador].ganha){
      setTextoVitorioso('O computador ganhou!');
    }
    else{
      setTextoVitorioso('Você ganhou!');
    }
  }
  limparJogadas = () => {
    setJogadaAleatoriaSelecionada(0);
    setJogadaSelecionada(0);
  }
  let jogadasItem = jogadas.map((value, key) => {

    return (
      <Picker.Item 
          enabled={value.enable}
          key={key}
          value={key}
          label={value.nome} />
    )
  })

  let ComponentJogadaUsuario = (() =>{
    return (
      <View style={styles.viewEscolha}>
        <Text style={styles.textVitorioso}>{textoVitorioso}</Text>
        <Text style={styles.textTitle}>Você escolheu:</Text>
        <Text style={[styles.textEscolha, styles.colorBlue]}>{jogadas[jogadaSelecionada].nome}</Text>
        <Image style={styles.imagem} source={jogadas[jogadaSelecionada].urlIMG}/>
      </View>
    )
  })

  let ComponentJogadaMaquina = (() =>{
    return (
      <View>
          <View style={styles.viewEscolha}>
            <Text style={styles.textTitle}>A máquina escolheu:</Text>
            <Text style={[styles.textEscolha, styles.colorRed]}>{jogadaComputador[jogadaAleatoriaSelecionada].nome}</Text>
            <Image style={styles.imagem} source={jogadaComputador[jogadaAleatoriaSelecionada].urlIMG}/>
          </View>
          <View>
            <Button title="Limpar" color='red' onPress={()=> {this.limparJogadas()}}/>
          </View>
      </View>
    )
  })

  let EscolherJogadaUsuario = (() =>{
    return (
      <View>
        <Text style={styles.textTitle}>Escolha sua jogada:</Text>
        <Picker style={{width: 150}} selectedValue={jogadaSelecionada} onValueChange={(item, n) => {setJogadaSelecionada(item); n = jogadaAleatoria(); verificarGanhador(item, n)}}>{jogadasItem}</Picker>
      </View>
    )
  })
 
  return (
    
    <View style={styles.container}>
      { jogadaSelecionada === 0 ? <EscolherJogadaUsuario /> : null}

      { jogadaSelecionada != 0 ? <ComponentJogadaUsuario /> : null}
      { jogadaAleatoriaSelecionada != 0 ? <ComponentJogadaMaquina /> : null}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem:{
    maxWidth: 50,
    maxHeight: 50,
    resizeMode: 'contain'
  },
  textTitle:{
    fontWeight: 'bold',
    fontSize: 20,
  },
  textVitorioso:{
    color: 'darkblue',
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
  textEscolha:{
    fontWeight: 'bold',
    fontSize: 15,
  },
  colorBlue:{
    color: 'blue',
  },
  colorRed:{
    color: 'red',
  },
  inputsPesoAltura:{
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    height: 40,
    borderRadius: 15,
    textAlign: 'center',
  },
  viewEscolha:{
    marginBottom: 15,
    alignItems: 'center'
  },
  viewBtn:{
    marginTop: 30,
    flexDirection: 'row',
    gap: 15
  }
});

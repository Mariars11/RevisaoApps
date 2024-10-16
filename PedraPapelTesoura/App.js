import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [jogadaSelecionada, setJogadaSelecionada] = useState(0);
  const [jogadaAleatoriaSelecionada, setJogadaAleatoriaSelecionada] = useState(0);

  const [jogadas, setJogadas] = useState([
    {key: 1, nome: 'Escolha', urlIMG: require('./vazio.png'), enable: false},
    {key: 2, nome: 'Pedra', urlIMG: require('./pedra.png'), enable: true},
    {key: 3, nome: 'Papel', urlIMG: require('./papel.png'), enable: true},
    {key: 4, nome: 'Tesoura', urlIMG: require('./tesoura.png'), enable: true}
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
    
    return index;
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
      <View>
        <Text>Você escolheu:</Text>
        <Text>{jogadas[jogadaSelecionada].nome}</Text>
        <Image style={styles.imagem} source={jogadas[jogadaSelecionada].urlIMG}/>
      </View>
    )
  })

  let ComponentJogadaMaquina = (() =>{
    return (
      <View>
        <Text>A máquina escolheu:</Text>
        <Text>{jogadaComputador[jogadaAleatoriaSelecionada].nome}</Text>
        <Image style={styles.imagem} source={jogadaComputador[jogadaAleatoriaSelecionada].urlIMG}/>
        <Button title="Limpar" color='red' onPress={()=> {this.limparJogadas()}}/>

      </View>
    )
  })

  let EscolherJogadaUsuario = (() =>{
    return (
      <View>
        <Text>Escolha sua jogada:</Text>
        <Picker style={{width: 150}} selectedValue={jogadaSelecionada} onValueChange={(item) => {setJogadaSelecionada(item); setJogadaAleatoriaSelecionada(jogadaAleatoria())}}>{jogadasItem}</Picker>
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
});

import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';

export default function App() {
  let [precoGasolina, setPrecoGasolina] = useState(0.0);
  let [precoAlcool, setPrecoAlcool] = useState(0.0);
  let [textoCombustivel, setTextoCombustivel] = useState('');
  let urlIMGCarro = './carro.png';

  calcularMelhorPreco = () => {
    if(precoGasolina != 0 && precoAlcool != 0){
        if((precoAlcool / precoGasolina) <= 0.7){
          setTextoCombustivel("É melhor abastecer com álcool!");
        }
        else{
          setTextoCombustivel("É melhor abastecer com gasolina!");
        }
    }
  };


  limparInputs = () => {
    setPrecoAlcool(null);
    setPrecoGasolina(null);
    setTextoCombustivel('');
  };

  return (
    <View style={styles.container}>
      { textoCombustivel != null && textoCombustivel != '' ? <Text style={styles.textTitle}>{textoCombustivel}</Text> : <Text style={styles.textTitle}>Calcule o melhor combustível</Text> }
      <Image style={styles.imagem} source={require(urlIMGCarro)}/>
      <View style={styles.viewInput}>
        <Text style={{fontWeight: 'bold'}}>Gasolina</Text>
        <TextInput
          style={styles.inputsCombustivel}
          onChangeText={setPrecoGasolina}
          value={precoGasolina}
          placeholder='Digite o preço da gasolina'
          keyboardType="numeric"
        />
      </View>
      <View style={styles.viewInput}>
        <Text style={{fontWeight: 'bold'}}>Álcool</Text>
        <TextInput
          style={styles.inputsCombustivel}
          onChangeText={setPrecoAlcool}
          value={precoAlcool}
          placeholder='Digite o preço do álcool'
          keyboardType="numeric"
        />
      </View>
      <View style={styles.viewBtn}>
        { textoCombustivel != null && textoCombustivel != '' ? <Button title="Limpar" color='red' onPress={()=> {this.limparInputs()}}/> : null}

        <Button title="Calcular" color='blue' onPress={()=> {this.calcularMelhorPreco()}}/>
      </View>
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
    maxWidth: 250,
    maxHeight: 250,
    resizeMode: 'contain'
  },
  textTitle:{
    fontWeight: 'bold',
    fontSize: 20
  },
  viewBtn:{
    marginTop: 20,
    flexDirection: 'row',
    gap: 15
  },
  inputsCombustivel:{
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    height: 40,
    borderRadius: 15,
    textAlign: 'center',
  },
  viewInput:{
    marginBottom: 15
  }
});


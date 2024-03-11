import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Pressable } from 'react-native';

export default function App() {
  const [toDoList, setNewToDoList] = useState([])
  const [enteredText, setEnteredText] = useState('')

  const enteredTextHandler = (text) => {
    setEnteredText(text);
  }

  const updateToDoListHandler = () => {
    setNewToDoList((currentToDoList) => 
      [...currentToDoList, {text: enteredText, id: Math.random().toString()}])
      setEnteredText('');
  }

  const deleteItem = (id) => {
    setNewToDoList((currentToDoList) => {
      return currentToDoList.filter((item) => item.id != id)
    })
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: 100, flexDirection: 'row', marginLeft: 10, marginRight: 2}}>
        <TextInput 
          placeholder='Add to do task here'
          placeholderTextColor='#9d8189' 
          onChangeText={enteredTextHandler}
          value={enteredText}
          style={{
            fontSize: 20, 
            borderWidth: 1, 
            padding: 8, 
            borderColor: '#9d4edd', 
            flex: 1, 
            color: '#9d4edd', 
            //fontWeight: 500
          }}
        />
        <Button 
          title='Add'
          color='#9d4edd'
          onPress={updateToDoListHandler}
          />
      </View>
      <View style={{borderColor: '#9d4edd', borderWidth: 1, marginTop: 30, marginBottom: 20}}/>
      <FlatList 
        data={toDoList}

        renderItem={(itemData) => {
          return (
            <Pressable 
              onPress={deleteItem.bind(this, itemData.item.id)}
              style={({pressed}) => pressed && styles.pressedItem}
              >
              <View style={styles.textView}>
                <Text style={styles.textStyle}>{itemData.item.text}</Text>
              </View>
            </Pressable>
          )
        }
      }
        keyExtractor={(item, index) => {
          return item.id
        }}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bfb7b6',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: '#fff',
    
  },
  textView: {
    margin: 10,
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#9d4edd',
    padding: 8,
    borderRadius: 8,
  },
  pressedItem: {
    opacity: 0.5,
    color: '#72369d'
  }
});

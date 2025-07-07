import { Button, StyleSheet, Text, TextInput, View, ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  // {text: enteredGoalText, key: Math.random().toString()} for unique key in flatlist
  function addGoalHandler(enteredGoalText) {
    setGoals(currentGoals => [...currentGoals, { text: enteredGoalText, id: Math.random().toString() }]);
    endAddGoalHandler(); // Close the modal after adding a goal
  }

  function deleteGoalHandler(id) {
    setGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    // --- initially, we can start with a simple view ----
    // <View style={styles.container}>
    //   <View>
    //     <Text style={styles.dummyText}>Another text!</Text>
    //   </View>
    //   <Text style={styles.dummyText}>Hello world!</Text>
    //   <StatusBar style="auto" />
    //   <Button title='Tap Me' />
    // </View>
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title='Add New Goal' color="#a065ec" onPress={startAddGoalHandler} />
        {/* {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} />} -- 1st way to show modal */}
        <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
        {/* <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder='Your course goal!' onChangeText={goalInputHandler} />
        <Button title='Add Goal' onPress={addGoalHandler} />
      </View> */}
        <View style={styles.goalsContainer}>
          {/* <ScrollView>
          {goals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView> */}

          <FlatList alwaysBounceVertical={false} data={goals} renderItem={itemData => {
            return (
              // <View style={styles.goalItem}>
              //   <Text style={styles.goalText}>{itemData.item.text}</Text>
              // </View>
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // --- initial lessons had a lot of styles, but we can start with a simple view ---
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // dummyText: {
  //   margin: 10,
  //   borderColor: 'blue',
  //   borderWidth: 1,
  //   padding: 16,
  // },
  appContainer: {
    flex: 1,
    paddingTop: 50, // Daha az padding, üstte taşmayı önler
    paddingHorizontal: 16,
    backgroundColor: '#1e085a', // moved to app.json
  },
  inputContainer: {
    flex: 1, // Yüksekliği orantılı ayarla
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 2,
    padding: 8,
    width: '70%',
    marginRight: 8,
  },
  goalsContainer: {
    flex: 5, // Ekranın büyük kısmını kapla
  },
  goalItem: {
    margin: 8,
    padding: 8,
    backgroundColor: '#5e0acc',
    borderRadius: 6,
  },
  goalText: {
    color: 'white',
  },
});

import { StyleSheet, View, TextInput, Button, Modal, Image } from "react-native"
import { useState } from "react";

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
    }
    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText(''); // Clear the input field after adding a goal
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <Image source={require('../assets/images/goal.png')} style={styles.image}/>
                <TextInput style={styles.textInput} p
                    placeholder='Your course goal!'
                    onChangeText={goalInputHandler}
                    value={enteredGoalText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Add Goal' onPress={addGoalHandler} color="#b180f0"/>
                    </View>
                    <View style={styles.button}>
                        <Button title='Cancel' onPress={props.onCancel} color="#f31282"/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1, // Yüksekliği orantılı ayarla
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#311b6b',
    },
    textInput: {
        borderColor: '#e4d0ff',
        borderWidth: 2,
        padding: 8,
        width: '90%',
        marginRight: 8,
        color: '#120438',
        backgroundColor: '#e4d0ff',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        width: '40%',
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
    }
});
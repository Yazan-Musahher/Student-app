import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { addDoc, collection, db } from "../firebaseConfig";

export default function AddScreen() {
    const [classid, setClassId] = useState("");
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [dob, setDOB] = useState("");
    const [classname, setClassName] = useState("");
    const [score, setScore] = useState("");
    const [grade, setGrade] = useState("");

    const handleCreateStudent = () => {
        addDoc(collection(db, "Student"), {
            classID: classid,
            FName: fname,
            lName: lname,
            DOB: dob,
            className: classname,
            Score: score,
            Grade: grade,
        })
            .then(() => {
                console.log("Data saved successfully!");
                alert("Student added successfully!");
                setClassId("");
                setFName("");
                setLName("");
                setDOB("");
                setClassName("");
                setScore("");
                setGrade("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Add Student</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Class ID</Text>
                <TextInput
                    value={classid}
                    onChangeText={setClassId}
                    style={styles.input}
                    placeholder="Class ID"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                    value={fname}
                    onChangeText={setFName}
                    style={styles.input}
                    placeholder="First Name"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    value={lname}
                    onChangeText={setLName}
                    style={styles.input}
                    placeholder="Last Name"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <TextInput
                    value={dob}
                    onChangeText={setDOB}
                    style={styles.input}
                    placeholder="Date of Birth"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Class Name</Text>
                <TextInput
                    value={classname}
                    onChangeText={setClassName}
                    style={styles.input}
                    placeholder="Class Name"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Score</Text>
                <TextInput
                    value={score}
                    onChangeText={setScore}
                    style={styles.input}
                    placeholder="Score"
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Grade</Text>
                <TextInput
                    value={grade}
                    onChangeText={setGrade}
                    style={styles.input}
                    placeholder="Grade"
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Create Student" onPress={handleCreateStudent} />
            </View>

            <StatusBar style="auto" />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
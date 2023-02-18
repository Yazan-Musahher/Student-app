import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig"

export default function EditScreen({ navigation }) {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentsRef = collection(db, 'Student');
                const snapshot = await getDocs(studentsRef);
                const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setStudents(studentsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudents();
    }, []);

    const [editMode, setEditMode] = useState(false);
    const [editedStudent, setEditedStudent] = useState(null);

    const handleEdit = async (id) => {
        try {
            const studentToEdit = students.find(student => student.id === id);
            setEditMode(true);
            setEditedStudent(studentToEdit);
        } catch (error) {
            console.error(error);
        }
    };




    const handleSave = async () => {
        const studentRef = doc(db, 'Student', editedStudent.id);
        await updateDoc(studentRef, editedStudent);
        setEditMode(false);
        setEditedStudent(null);
    } ;

    const handleChange = (field, value) => {
        setEditedStudent(prevState => ({ ...prevState, [field]: value }));
    };

    const renderStudent = ({ item }) => {
        return (
            <View style={styles.student}>
                {editMode && editedStudent.id === item.id ?
                    <>
                        <TextInput style={styles.textInput} value={editedStudent.FName} onChangeText={value => handleChange('FName', value)} />
                        <TextInput style={styles.textInput} value={editedStudent.lName} onChangeText={value => handleChange('lName', value)} />
                        <TextInput style={styles.textInput} value={editedStudent.classID} onChangeText={value => handleChange('classID', value)} />
                        <TextInput style={styles.textInput} value={editedStudent.DOB} onChangeText={value => handleChange('DOB', value)} />
                        <TextInput style={styles.textInput} value={editedStudent.className} onChangeText={value => handleChange('className', value)} />
                        <TextInput style={styles.textInput} value={editedStudent.Score} onChangeText={value => handleChange('Score', value)} />
                        <TextInput style={styles.textInput} value={editedStudent.Grade} onChangeText={value => handleChange('Grade', value)} />
                        <TouchableOpacity style={styles.button} onPress={handleSave}><Text>Save</Text></TouchableOpacity>
                    </>
                    :
                    <>
                        <Text style={styles.studentName}>{item.FName} {item.lName}</Text>
                        <Text style={styles.studentDetails}>Class ID: {item.classID}</Text>
                        <Text style={styles.studentDetails}>Date of Birth: {item.DOB}</Text>
                        <Text style={styles.studentDetails}>Class Name: {item.className}</Text>
                        <Text style={styles.studentDetails}>Score: {item.Score}</Text>
                        <Text style={styles.studentDetails}>Grade: {item.Grade}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleEdit(item.id)}><Text>Edit</Text></TouchableOpacity>
                    </>
                }
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={students}
                renderItem={renderStudent}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    student: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    studentName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    studentDetails: {
        fontSize: 16,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 4,
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor: '#5cb85c',
        padding: 10,
        marginVertical: 4,
        alignItems: 'center',
        borderRadius: 5,
    },
});
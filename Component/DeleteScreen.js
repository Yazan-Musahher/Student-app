import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../firebaseConfig"

export default function DeleteScreen({ navigation }) {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const studentsRef = collection(db, 'Student');
            const snapshot = await getDocs(studentsRef);
            const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(studentsData);
        };
        fetchStudents();
    }, []);

    const deleteStudent = async (id) => {
        try {
            const studentRef = doc(db, 'Student', id);
            await deleteDoc(studentRef);
            setStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error("Error deleting student: ", error);
        }

    }

    const renderStudent = ({ item }) => {
        return (
            <View style={styles.student}>
                <Text style={styles.studentName}>{item.FName} {item.lName}</Text>
                <Text style={styles.studentDetails}>Class ID: {item.classID}</Text>
                <Text style={styles.studentDetails}>Date of Birth: {item.DOB}</Text>
                <Text style={styles.studentDetails}>Class Name: {item.className}</Text>
                <Text style={styles.studentDetails}>Score: {item.Score}</Text>
                <Text style={styles.studentDetails}>Grade: {item.Grade}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteStudent(item.id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
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


const styles = StyleSheet.create({
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
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
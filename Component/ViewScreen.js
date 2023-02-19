import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import {db} from "../firebaseConfig";
import { Table, Row, Rows } from 'react-native-table-component';




export default function ViewScreen({ navigation }) {
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
  
    return (
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          <Text style={styles.nameColumn}>Name</Text>
          <Text style={styles.classIdColumn}>Class ID</Text>
          <Text style={styles.dobColumn}>DOB</Text>
          <Text style={styles.classNameColumn}>Class Name</Text>
          <Text style={styles.scoreColumn}>Score</Text>
          <Text style={styles.gradeColumn}>Grade</Text>
        </View>
        <FlatList
          data={students}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.nameColumn}>
                {item.FName} {item.lName}
              </Text>
              <Text style={styles.classIdColumn}>{item.classID}</Text>
              <Text style={styles.dobColumn}>{item.DOB}</Text>
              <Text style={styles.classNameColumn}>{item.className}</Text>
              <Text style={styles.scoreColumn}>{item.Score}</Text>
              <Text style={styles.gradeColumn}>{item.Grade}</Text>
            </View>
          )}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, paddingTop: 30, backgroundColor: '#fff' },
    tableHeader: { flexDirection: 'row', backgroundColor: '#f9c2ff' },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#c8e1ff' },
    nameColumn: { flex: 2, textAlign: 'center', fontSize: 10, paddingVertical: 12 },
    classIdColumn: { flex: 1, textAlign: 'center', fontSize: 10, paddingVertical: 12 },
    dobColumn: { flex: 2, textAlign: 'center', fontSize: 10, paddingVertical: 12 },
    classNameColumn: { flex: 2, textAlign: 'center', fontSize: 10, paddingVertical: 12 },
    scoreColumn: { flex: 1, textAlign: 'center', fontSize: 10, paddingVertical: 12 },
    gradeColumn: { flex: 1, textAlign: 'center', fontSize: 10, paddingVertical: 12 },
  });
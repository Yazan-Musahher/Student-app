import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView } from 'react-native';
import { collection, getDocs, onSnapshot } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { BarChart } from 'react-native-chart-kit';

export default function ViewScreen({ navigation }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const studentsRef = collection(db, 'Student');
    const unsubscribe = onSnapshot(studentsRef, snapshot => {
      const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsData);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const gradeData = {};
    for (const student of students) {
      if (!gradeData[student.className]) {
        gradeData[student.className] = {
          'A': 0,
          'B': 0,
          'C': 0,
          'D': 0,
          'F': 0,
        };
      }
      gradeData[student.className][student.Grade]++;
    }
  
    const chartData = [];
    const chartLabels = [];
    for (const className in gradeData) {
      chartLabels.push(className);
      const classData = [];
      for (const grade in gradeData[className]) {
        classData.push(gradeData[className][grade]);
      }
      chartData.push(classData);
    }
  
    setChartData(chartData);
    setChartLabels(chartLabels);
  }, [students]);

  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {chartData.map((data, index) => (
        <View key={chartLabels[index]} style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{chartLabels[index]}</Text>
          <BarChart
            data={{
              labels: ['A', 'B', 'C', 'D', 'F'],
              datasets: [
                { data: data },
              ],
            }}
            width={Dimensions.get('window').width - 20}
            height={220}
            yAxisSuffix=""
            chartConfig={chartConfig}
          />
        </View>
      ))}
    </ScrollView>
  );
}
              
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  student: {
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  studentDetails: {
    fontSize: 16,
  },
  chartContainer: {
    marginVertical: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
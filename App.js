import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './Component/HomeScreen';
import ViewScreen from './Component/ViewScreen';
import AddScreen from './Component/AddScreen';
import EditScreen from './Component/EditScreen';
import DeleteScreen from './Component/DeleteScreen';





const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: "Welcome to Student app"}}
            />
            <Stack.Screen
                name="View All Student"
                component={ViewScreen}
            />
            <Stack.Screen
                name="Add more Student"
                component={AddScreen}
            />

            <Stack.Screen
                name="Edit Student"
                component={EditScreen}
            />
            <Stack.Screen
                name="Delete Student"
                component={DeleteScreen}
            />  
        </Stack.Navigator>
    </NavigationContainer>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

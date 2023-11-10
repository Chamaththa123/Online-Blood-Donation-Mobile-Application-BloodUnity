import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [name, setName] = useState({});
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [userSubjects, setUserSubjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigation = useNavigation();

  const handleSignOut = () => {
    console.log('Signing out...');
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Sign-out successful');
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };

  const handleAddMarks = () => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection('users').doc(userUid);

    // Update Firestore with new subject and marks
    userDocRef
      .update({
        subjects: firebase.firestore.FieldValue.arrayUnion({
          subject: subject,
          marks: marks,
        }),
      })
      .then(() => {
        console.log('Marks added successfully');
        setSubject('');
        setMarks('');
        loadUserSubjects(); // Reload user subjects after adding new marks
      })
      .catch((error) => {
        console.error('Error adding marks:', error);
      });
  };

  const loadAllUsers = () => {
    firebase.firestore().collection('users').get()
      .then((querySnapshot) => {
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setAllUsers(usersData);
      })
      .catch((error) => {
        console.error('Error getting all users:', error);
      });
  };

  const loadUserSubjects = () => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection('users').doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        const userData = snapshot.data();
        if (userData.subjects) {
          setUserSubjects(userData.subjects);
        }
      } else {
        console.log('User doesn\'t exist');
      }
    });
  };

  useEffect(() => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection('users').doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data());
        loadUserSubjects();
        loadAllUsers();
      } else {
        console.log('User doesn\'t exist');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <Text>Welcome {name.firstName} {name.lastName}</Text>

      {/* Display user's subjects and marks */}
      {userSubjects.map((item, index) => (
        <Text key={index}>{item.subject}: {item.marks}</Text>
      ))}

      {/* Display all users */}
      <Text>All Users:ddv</Text>
      <FlatList
        data={allUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.data.firstName} {item.data.lastName}</Text>
          </View>
        )}
      />

      {/* Input fields for adding new subjects and marks */}
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={(text) => setSubject(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Marks"
        value={marks}
        onChangeText={(text) => setMarks(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddMarks}>
        <Text style={styles.buttonText}>Add Marks</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Profile;

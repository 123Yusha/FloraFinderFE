import * as React from 'react';
import { TextInput, SafeAreaView, StyleSheet, Pressable, Text, View, ImageBackground, Alert } from "react-native";
import { useState, useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../contexts/Contexts';
import { getUserByUsername } from '../api';
const backgroundLeaf = require("../assets/backgroundtest.jpg");

export default function Login({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = (data) => {
    setUser(data)
    handleGetUser()
  };
  const handleGetUser = () => {
    getUserByUsername(user.username)

  .then((result) => {
    console.log(result)
    Alert.alert(`You are logged in as ${user.username}!`, 'Click below to go to Home', [
      {
        text: 'Home',
        onPress: () => navigation.navigate('HomePage'),
        style: 'default',
      },
    ]);   
  })
  .catch((error) => {
    console.log(error, "Login Failed");
  })}
  
 
  

  return (
    <ImageBackground
      source={backgroundLeaf}
      style={styles.background}
      resizeMode="cover" // or "repeat" if page is really long (repeats image)
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Login</Text>
        <View style={styles.container}>
          <Text style={styles.labelContainerText}>Username:</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter username here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            )}
            name="username"
          />
          {errors.username && <Text>This is required.</Text>}

          <Text style={styles.labelContainerText}>Password:</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry={true}
                placeholder="Enter password here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}

          <Pressable style={styles.button} title="Log In" onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#006400",
    width: "50%",
    margin: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textInput: {
    backgroundColor: "white",
    height: 40,
    width: 250,
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "#006400",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#006400",
    position: "absolute",
    top: 40,
    left: 20,
  },
  buttonText: {
    color: "white",
  },
  labelContainerText: {
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "#006400",
    padding: 5,
    fontWeight: "bold",
    marginRight: 165,
    marginTop: 10,
    marginBottom: -4,
    
  }
});

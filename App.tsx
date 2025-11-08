import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ImageBackground, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

type Dish = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
};

export default function App() {
  // state variables to manage app data and UI
  const [screen, setScreen] = useState<'home' | 'dishes'>('home');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Starter');
  const [filter, setFilter] = useState('All');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrUpdateDish = () => {
    const trimmedName = name.trim();
    const trimmedDesc = description.trim();
    const priceValue = parseFloat(price);

    // makes sure all fields are filled
    if (!trimmedName || !trimmedDesc || !price) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    //it checks if the price is above zero so user cant add free or negative priced dishes
    if (priceValue <= 0) {
      Alert.alert("Error", "Price must be greater than zero.");
      return;
    }

    //this checks for duplicate dish names in same category
    const exists = dishes.some(
      dish =>
        dish.name.toLowerCase() === trimmedName.toLowerCase() &&
        dish.category === category &&
        editIndex === null
    );

    if (exists) {
      Alert.alert("Duplicate Dish", "This dish and course already exist.");
      return;
    }


    const newDish = {
      id: Date.now().toString(),
      name: trimmedName,
      description: trimmedDesc,
      price,
      category,
    };


    if (editIndex !== null) {
      const updatedDishes = [...dishes];
      updatedDishes[editIndex] = newDish;
      setDishes(updatedDishes);
      Alert.alert("Success", "Dish updated successfully!");
      setEditIndex(null);
    } else {
      setDishes(prev => [...prev, newDish]);
      Alert.alert("Success", "Dish added successfully!");
    }

    //it clears input fileds after adding/updating
    setName('');
    setDescription('');
    setPrice('');
    setCategory('Starter');
    setScreen('dishes'); 
  }; 

  const handleEditDish = (index: number) => {
    const dish = dishes[index];
    setName(dish.name);
    setDescription(dish.description);
    setPrice(dish.price);
    setCategory(dish.category);
    setEditIndex(index);
    setScreen('home');
  };

  const handleDeleteDish = (index: number) => {
    // it confirms if user really wants to delete
    Alert.alert('Delete Dish', 'Are you sure you want to delete this dish?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setDishes(prev => prev.filter((_, i) => i !== index));
          setEditIndex(null);
        },
      },
    ]);
  };

  // this filters dishes by course/category
  const filteredDishes =
    filter === 'All' ? dishes : dishes.filter(dish => dish.category === filter);
}

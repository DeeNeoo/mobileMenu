import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
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


  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddOrUpdateDish = () => {
    const trimmedName = name.trim();
    const trimmedDesc = description.trim();
    const priceValue = parseFloat(price);

    setErrorMessage('');
    setSuccessMessage('');

    // makes sure all fields are filled
    if (!trimmedName || !trimmedDesc || !price) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // checks if the price is above zero so user cant add free or negative priced dishes
    if (priceValue <= 0) {
      setErrorMessage("Price must be greater than zero.");
      return;
    }

    // this checks for duplicate dish names in same category
    const exists = dishes.some(
      dish =>
        dish.name.toLowerCase() === trimmedName.toLowerCase() &&
        dish.category === category &&
        editIndex === null
    );

    if (exists) {
      setErrorMessage("This dish already exists in this course.");
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
      setSuccessMessage("Dish updated ✅");
      setEditIndex(null);
    } else {
      setDishes(prev => [...prev, newDish]);
      Alert.alert("Success", "Dish added successfully!");
      setSuccessMessage("Dish added ✅");
    }

    // it clears input fileds after adding/updating
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



  // the home/add dish screen
  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ width: "100%" }} contentContainerStyle={{ padding: 20 }}>

          <Text style={styles.heading}>Add / Update Dish</Text>

          <TextInput style={styles.input} placeholder="Dish Name" value={name} onChangeText={setName} />

          <TextInput style={[styles.input, { height: 80 }]} placeholder="Description" value={description} onChangeText={setDescription} multiline />

          <TextInput style={styles.input} placeholder="Price" value={price} keyboardType="numeric" onChangeText={setPrice} />

          <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main" value="Main" />
            <Picker.Item label="Dessert" value="Dessert" />
          </Picker>

          {/* inline confirmation + errors */}
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

          <Pressable style={styles.button} onPress={handleAddOrUpdateDish}>
            <Text style={styles.buttonText}>{editIndex !== null ? "Update Dish" : "Add Dish"}</Text>
          </Pressable>

          <Pressable style={styles.linkBtn} onPress={() => setScreen('dishes')}>
            <Text style={styles.linkText}>View Dishes</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    );
  }



  //the dishes screen
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Menu Dishes</Text>

      <Picker selectedValue={filter} onValueChange={setFilter} style={styles.picker}>
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <ScrollView style={{ width: "100%" }} contentContainerStyle={{ padding: 20 }}>
        {filteredDishes.map((dish, index) => (
          <View key={dish.id} style={styles.card}>
            <Text style={styles.cardTitle}>{dish.name} (${dish.price})</Text>
            <Text>{dish.description}</Text>
            <Text style={{ fontStyle: "italic", marginTop: 4 }}>Course: {dish.category}</Text>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Pressable style={styles.smallBtn} onPress={() => handleEditDish(index)}>
                <Text style={styles.smallBtnText}>Edit</Text>
              </Pressable>
              <Pressable style={[styles.smallBtn, { backgroundColor: "#b00000" }]} onPress={() => handleDeleteDish(index)}>
                <Text style={styles.smallBtnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable style={styles.button} onPress={() => setScreen('home')}>
        <Text style={styles.buttonText}>Add New Dish</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// styling
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff" },
  heading: { fontSize: 26, fontWeight: "bold", marginBottom: 20, marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 12 },
  picker: { marginBottom: 15 },
  button: { backgroundColor: "#1b6ca8", padding: 14, borderRadius: 10, marginTop: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  linkBtn: { marginTop: 12, alignSelf: "center" },
  linkText: { color: "#1b6ca8", fontWeight: "bold" },
  error: { color: "red", marginBottom: 10 },
  success: { color: "green", marginBottom: 10 },
  card: { backgroundColor: "#f8f8f8", padding: 15, borderRadius: 10, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  smallBtn: { backgroundColor: "#2e7d32", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginRight: 10 },
  smallBtnText: { color: "#fff", fontWeight: "bold" },
});

import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ImageBackground, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dish type for consistency
type Dish = {
  name: string;
  description: string;
  price: string;
  category: string;
};

export default function App() {
  const [screen, setScreen] = useState<'home' | 'dishes'>('home');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Starter');
  const [filter, setFilter] = useState('All');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrUpdateDish = () => {
    if (!name || !description || !price) return;
    const newDish = { name, description, price, category };

    if (editIndex !== null) {
      // Update existing dish
      const updatedDishes = [...dishes];
      updatedDishes[editIndex] = newDish;
      setDishes(updatedDishes);
      setEditIndex(null);
      setScreen('dishes'); // 👈 Go back to dishes list after updating
    } else {
      // Add new dish
      setDishes(prev => [...prev, newDish]);
    }

    // Reset input fields
    setName('');
    setDescription('');
    setPrice('');
    setCategory('Starter');
  };

  const handleEditDish = (index: number) => {
    const dish = dishes[index];
    setName(dish.name);
    setDescription(dish.description);
    setPrice(dish.price);
    setCategory(dish.category);
    setEditIndex(index);
    setScreen('home'); // 👈 Return to home to edit
  };

  const handleDeleteDish = (index: number) => {
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

  const filteredDishes =
    filter === 'All' ? dishes : dishes.filter(dish => dish.category === filter);

  // ---------------- HOME SCREEN ----------------
  if (screen === 'home') {
    return (
      <ImageBackground
        source={require('./assets/background.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Christoffel Menu Manager</Text>
          <Text style={styles.totalText}>Total Dishes: {dishes.length}</Text>

          {/* Input Fields for Adding Dish */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Dish Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter dish name"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
            />
            <Text style={styles.label}>Price (R):</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <Text style={styles.label}>Category:</Text>
            <Picker
              selectedValue={category}
              onValueChange={setCategory}
              style={styles.picker}
            >
              <Picker.Item label="Starter" value="Starter" />
              <Picker.Item label="Main" value="Main" />
              <Picker.Item label="Dessert" value="Dessert" />
            </Picker>
          </View>

          {/* Add or Update Button */}
          <Pressable
            onPress={handleAddOrUpdateDish}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#055c26' : '#064709ff' },
            ]}
          >
            <Text style={styles.buttonText}>
              {editIndex !== null ? 'Update Dish' : 'Add Dish'}
            </Text>
          </Pressable>

          {/* Navigate to Dishes Screen */}
          <Pressable
            onPress={() => setScreen('dishes')}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#055c26' : '#064709ff' },
            ]}
          >
            <Text style={styles.buttonText}>View Dishes</Text>
          </Pressable>
        </View>
      </ImageBackground>
    );
  }

  // ---------------- DISHES SCREEN ----------------
  return (
    <SafeAreaView style={styles.dishesContainer}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <Text style={styles.title}>Stored Dishes</Text>

      {/* Filter Dishes by Category */}
      <View style={styles.filterContainer}>
        <Text style={styles.label}>Course:</Text>
        {['All', 'Starter', 'Main', 'Dessert'].map(type => (
          <Pressable
            key={type}
            onPress={() => setFilter(type)}
            style={[
              styles.filterButton,
              filter === type && styles.selectedFilterButton,
            ]}
          >
            <Text style={styles.filterText}>{type}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView>
        {filteredDishes.map((dish, index) => (
          <View key={index} style={styles.dishItem}>
            <Text style={styles.dishText}>
              {dish.name} - {dish.category} - R{dish.price}
            </Text>
            <Text style={styles.dishText}>{dish.description}</Text>

            {/* Edit and Delete Buttons */}
            <View style={styles.actionContainer}>
              <Pressable
                onPress={() => handleEditDish(index)}
                style={[styles.actionButton, { backgroundColor: '#064709ff' }]}
              >
                <Text style={styles.actionText}>✏️ Edit</Text>
              </Pressable>
              <Pressable
                onPress={() => handleDeleteDish(index)}
                style={[styles.actionButton, { backgroundColor: '#d9534f' }]}
              >
                <Text style={styles.actionText}>🗑️ Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Back to Home Button */}
      <Pressable
        onPress={() => setScreen('home')}
        style={[styles.button, { backgroundColor: '#0a4822', alignSelf: 'center' }]}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0a4822', textAlign: 'center' },
  totalText: { color: '#e6b113ff', fontWeight: 'bold', fontSize: 18, marginVertical: 20 },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    width: '80%',
  },
  label: { color: '#11d63c', marginBottom: 6, fontWeight: 'bold' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: { height: 50, width: '100%' },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  dishesContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  dishItem: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  dishText: { fontSize: 16, color: '#333' },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: { color: '#fff', fontWeight: 'bold' },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  selectedFilterButton: {
    backgroundColor: '#108b14',
  },
  filterText: { color: '#333' },
});

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Dish = {
  name: string;
  description: string;
  price: string;
  category: string;
};

export default function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Starter');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Add or update dish
  const handleAddOrUpdate = () => {
    if (!name || !description || !price) return;

    const newDish: Dish = { name, description, price, category };

    if (editIndex !== null) {
      const updatedDishes = [...dishes];
      updatedDishes[editIndex] = newDish;
      setDishes(updatedDishes);
      setEditIndex(null);
    } else {
      setDishes(prev => [...prev, newDish]);
    }

    // Clear input fields
    setName('');
    setDescription('');
    setPrice('');
    setCategory('Starter');
  };

  // Edit a dish
  const handleEdit = (index: number) => {
    const dish = dishes[index];
    setName(dish.name);
    setDescription(dish.description);
    setPrice(dish.price);
    setCategory(dish.category);
    setEditIndex(index);
  };

  // Delete a dish
  const handleDelete = (index: number) => {
    Alert.alert(
      'Delete Dish',
      'Are you sure you want to delete this dish?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDishes(prev => prev.filter((_, i) => i !== index));

            // Clear input fields and reset edit state
            setName('');
            setDescription('');
            setPrice('');
            setCategory('Starter');
            setEditIndex(null);
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require('./assets/background.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 16 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            {/* Header */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Text style={styles.title}>Christoffel Menu Manager</Text>
            </View>

            {/* Input Fields */}
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
              <View style={styles.categoryContainer}>
                {['Starter', 'Main', 'Dessert'].map(cat => (
                  <Pressable
                    key={cat}
                    onPress={() => setCategory(cat)}
                    style={[
                      styles.categoryButton,
                      { backgroundColor: category === cat ? '#108b14' : '#ccc' },
                    ]}
                  >
                    <Text
                      style={{
                        color: category === cat ? '#11e6b8' : '#000',
                        fontWeight: 'bold',
                      }}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Add/Update Button */}
            <Pressable
              onPress={handleAddOrUpdate}
              style={({ pressed }) => [
                styles.addButton,
                { backgroundColor: pressed ? '#0c7011' : '#108b14' },
              ]}
            >
              <Text style={styles.addButtonText}>
                {editIndex !== null ? 'Update Item' : 'Add Item'}
              </Text>
            </Pressable>

            {/* Total and List */}
            <View style={{ marginTop: 20 }}>
              <Text style={styles.totalText}>Total Items: {dishes.length}</Text>

              {dishes.map((dish, index) => (
                <View
                  key={index}
                  style={[
                    styles.dishItem,
                    editIndex === index && { borderWidth: 2, borderColor: '#0a9396' },
                  ]}
                >
                  <Text style={styles.dishText}>
                    {dish.name} - {dish.category} - R{dish.price}
                  </Text>
                  <Text style={styles.dishText}>{dish.description}</Text>

                  <View style={styles.actionContainer}>
                    <Pressable
                      onPress={() => handleEdit(index)}
                      style={[styles.actionButton, { backgroundColor: '#43d859ff' }]}
                    >
                      <Text style={styles.actionText}>Edit</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => handleDelete(index)}
                      style={[styles.actionButton, { backgroundColor: '#d9534f' }]}
                    >
                      <Text style={styles.actionText}>🗑️Delete</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0a4822ff',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    color: '#11d63cff',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#11e6b8',
    fontWeight: '700',
    fontSize: 16,
  },
  totalText: {
    color: '#11e6b8',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  dishItem: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  dishText: {
    color: '#11e6b8',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

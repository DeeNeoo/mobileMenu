import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView, Alert, FlatList, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Types & Constants ---
type Dish = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
};

type ScreenName = 'menu' | 'manage' | 'guest';

const CATEGORIES = ['Starter', 'Main', 'Dessert'];

const BACKGROUND_IMAGE_SOURCE = require('./assets/background.png');

const COLORS = {
  PRIMARY_GREEN: '#2e7d32', 
  ACCENT_GREEN: '#4caf50',   
  BACKGROUND_LIGHT: '#f1f8e9', 
  SUCCESS_GREEN: '#388e3c',  
  ERROR_RED: '#b00000',      
  TEXT_DARK: '#333333',
  BORDER_LIGHT: '#ccc',
  OVERLAY: 'rgba(255, 255, 255, 0.7)', 
};

// --- Helper Functions ---
const calculateAveragePrice = (dishes: Dish[]) => {
  const categoryPrices: Record<string, number[]> = {
    Starter: [],
    Main: [],
    Dessert: [],
  };

  dishes.forEach(dish => {
    const priceValue = parseFloat(dish.price);
    if (!isNaN(priceValue) && dish.category in categoryPrices) {
      categoryPrices[dish.category].push(priceValue);
    }
  });

  const averages: Record<string, string> = {};

  for (const category of CATEGORIES) {
    const prices = categoryPrices[category];
    if (prices.length > 0) {
      const total = prices.reduce((sum, price) => sum + price, 0);
      const average = total / prices.length;
      averages[category] = average.toFixed(2); 
    } else {
      averages[category] = '(null)';
    }
  }

  return averages;
};

// --- Shared Components ---
const DishCard: React.FC<{
  dish: Dish;
  index: number;
  showManagementButtons: boolean;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}> = ({ dish, index, showManagementButtons, onEdit, onDelete }) => (
  <View key={dish.id} style={styles.card}>
    <Text style={styles.cardTitle}>{dish.name} - R{dish.price}</Text>
    <Text>{dish.description}</Text>
    <Text style={styles.cardCategory}>Course: {dish.category}</Text>

    {showManagementButtons && (
      <View style={styles.cardButtonRow}>
        <Pressable style={styles.smallBtn} onPress={() => onEdit(index)}>
          <Text style={styles.smallBtnText}>Edit</Text>
        </Pressable>
        <Pressable style={[styles.smallBtn, { backgroundColor: COLORS.ERROR_RED }]} onPress={() => onDelete(index)}>
          <Text style={styles.smallBtnText}>Delete</Text>
        </Pressable>
      </View>
    )}
  </View>
);

const DishForm: React.FC<{
  name: string; setName: (text: string) => void;
  description: string; setDescription: (text: string) => void;
  price: string; setPrice: (text: string) => void;
  category: string; setCategory: (value: string) => void;
  handleAddOrUpdateDish: () => void;
  editIndex: number | null;
  errorMessage: string;
  successMessage: string;
}> = ({
  name, setName, description, setDescription, price, setPrice, category, setCategory,
  handleAddOrUpdateDish, editIndex, errorMessage, successMessage
}) => (
  <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.formContainer}>
    <View style={styles.contentOverlay}> 
      <Text style={styles.heading}>{editIndex !== null ? "Update Dish" : "Add New Dish"}</Text>

      <TextInput style={styles.input} placeholder="Dish Name" value={name} onChangeText={setName} />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Price"   
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue as string)} style={styles.picker}>
        {CATEGORIES.map(cat => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

      <Pressable style={styles.button} onPress={handleAddOrUpdateDish}>
        <Text style={styles.buttonText}>{editIndex !== null ? "Update Dish" : "Add Dish"}</Text>
      </Pressable>
    </View>
  </ScrollView>
);

// --- Bottom Tab Bar ---
const BottomTabs: React.FC<{ setScreen: (screen: ScreenName) => void }> = ({ setScreen }) => (
  <View style={styles.tabBar}>
    <Pressable onPress={() => setScreen('menu')} style={styles.tabButton}>
      <Text style={styles.tabText}>Menu</Text>
    </Pressable>
    <Pressable onPress={() => setScreen('manage')} style={styles.tabButton}>
      <Text style={styles.tabText}>Manage</Text>
    </Pressable>
    <Pressable onPress={() => setScreen('guest')} style={styles.tabButton}>
      <Text style={styles.tabText}>Guest View</Text>
    </Pressable>
  </View>
);

// --- Screens ---
const MenuScreen: React.FC<{ dishes: Dish[]; setScreen: (screen: ScreenName) => void }> = ({ dishes, setScreen }) => {
  const averages = useMemo(() => calculateAveragePrice(dishes), [dishes]);

  return (
    <ImageBackground source={BACKGROUND_IMAGE_SOURCE} style={{ flex: 1 }} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentOverlay}>
          <Text style={styles.heading}>Christoffel's Menu</Text>

          <View style={styles.averageContainer}>
            <Text style={styles.subHeading}>Average Price per Course</Text>
            {CATEGORIES.map(cat => (
              <Text key={cat} style={styles.averageText}>
                {cat}: R{averages[cat] || '0.00'}
              </Text>
            ))}
          </View>

          <FlatList
            data={dishes}
            keyExtractor={item => item.id}
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item, index }) => (
              <DishCard
                dish={item}
                index={index}
                showManagementButtons={false}
                onEdit={() => {}} 
                onDelete={() => {}} 
              />
            )}
            ListEmptyComponent={() => <Text style={styles.emptyText}>No dishes on the menu yet. Please add them in the 'Manage Menu' screen.</Text>}
          />

          <BottomTabs setScreen={setScreen} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const ManageScreen: React.FC<{ dishes: Dish[]; setDishes: React.Dispatch<React.SetStateAction<Dish[]>>; setScreen: (screen: ScreenName) => void }> = ({ dishes, setDishes, setScreen }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Starter');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClearForm = () => {
    setName(''); setDescription(''); setPrice(''); setCategory('Starter'); setEditIndex(null);
    setErrorMessage(''); setSuccessMessage('');
  };

  const handleAddOrUpdateDish = () => {
    const trimmedName = name.trim();
    const trimmedDesc = description.trim();
    const priceValue = parseFloat(price);

    setErrorMessage(''); setSuccessMessage('');

    if (!trimmedName || !trimmedDesc || !price) {
      setErrorMessage("Please fill in all fields."); return;
    }
    if (isNaN(priceValue) || priceValue <= 0) {
      setErrorMessage("Price must be a number greater than zero."); return;
    }

    const exists = dishes.some((dish, index) =>
      dish.name.toLowerCase() === trimmedName.toLowerCase() &&
      dish.category === category &&
      index !== editIndex
    );

    if (exists) {
      setErrorMessage("This dish already exists in this course."); return;
    }

    const newDish: Dish = {
      id: editIndex !== null ? dishes[editIndex].id : Date.now().toString(),
      name: trimmedName,
      description: trimmedDesc,
      price: priceValue.toFixed(2),
      category,
    };

    if (editIndex !== null) {
      const updatedDishes = [...dishes]; updatedDishes[editIndex] = newDish; setDishes(updatedDishes);
      setSuccessMessage("Dish updated!");
    } else {
      setDishes(prev => [...prev, newDish]);
      setSuccessMessage("Dish added!");
    }

    handleClearForm(); setIsAdding(false);
  };

  const handleEditDish = (index: number) => {
    const dish = dishes[index];
    setName(dish.name); setDescription(dish.description); setPrice(dish.price); setCategory(dish.category);
    setEditIndex(index); setSuccessMessage(''); setErrorMessage(''); setIsAdding(true);
  };

  const handleDeleteDish = (index: number) => {
    Alert.alert('Delete Dish', 'Are you sure you want to delete this dish?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        setDishes(prev => prev.filter((_, i) => i !== index)); handleClearForm();
        Alert.alert("Deleted", "Dish removed successfully.");
      }}
    ]);
  };

  if (isAdding) {
    return (
      <ImageBackground source={BACKGROUND_IMAGE_SOURCE} style={{ flex: 1 }} resizeMode="cover">
        <SafeAreaView style={styles.safeArea}>
          <DishForm
            name={name} setName={setName}
            description={description} setDescription={setDescription}
            price={price} setPrice={setPrice}
            category={category} setCategory={setCategory}
            handleAddOrUpdateDish={handleAddOrUpdateDish}
            editIndex={editIndex}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
          <Pressable style={styles.linkBtn} onPress={() => { setIsAdding(false); handleClearForm(); }}>
            <Text style={styles.linkText}>Back to Manage List</Text>
          </Pressable>
          <BottomTabs setScreen={setScreen} />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={BACKGROUND_IMAGE_SOURCE} style={{ flex: 1 }} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentOverlay}>
          <Text style={styles.heading}>Manage Menu Items</Text>

          <FlatList
            data={dishes}
            keyExtractor={item => item.id}
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item, index }) => (
              <DishCard
                dish={item}
                index={index}
                showManagementButtons={true}
                onEdit={handleEditDish}
                onDelete={handleDeleteDish}
              />
            )}
            ListEmptyComponent={() => <Text style={styles.emptyText}>No items to manage. Add one now!</Text>}
          />

          <Pressable style={styles.button} onPress={() => setIsAdding(true)}>
            <Text style={styles.buttonText}>Add New Dish</Text>
          </Pressable>
          <BottomTabs setScreen={setScreen} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const GuestScreen: React.FC<{ dishes: Dish[]; setScreen: (screen: ScreenName) => void }> = ({ dishes, setScreen }) => {
  const [filter, setFilter] = useState('All');
  const filteredDishes = useMemo(() => filter === 'All' ? dishes : dishes.filter(dish => dish.category === filter), [dishes, filter]);

  return (
    <ImageBackground source={BACKGROUND_IMAGE_SOURCE} style={{ flex: 1 }} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentOverlay}>
          <Text style={styles.heading}>Guest Menu View</Text>

          <Picker selectedValue={filter} onValueChange={(itemValue) => setFilter(itemValue as string)} style={styles.picker}>
            <Picker.Item label="All Courses" value="All" />
            {CATEGORIES.map(cat => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>

          <FlatList
            data={filteredDishes}
            keyExtractor={item => item.id}
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item, index }) => (
              <DishCard
                dish={item}
                index={index}
                showManagementButtons={false}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            )}
            ListEmptyComponent={() => <Text style={styles.emptyText}>No dishes found for this filter.</Text>}
          />

          <BottomTabs setScreen={setScreen} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

// --- Main App ---
export default function App() {
  const [screen, setScreen] = useState<ScreenName>('menu');
  const [dishes, setDishes] = useState<Dish[]>([]);

  switch (screen) {
    case 'menu': return <MenuScreen dishes={dishes} setScreen={setScreen} />;
    case 'manage': return <ManageScreen dishes={dishes} setDishes={setDishes} setScreen={setScreen} />;
    case 'guest': return <GuestScreen dishes={dishes} setScreen={setScreen} />;
    default: return <MenuScreen dishes={dishes} setScreen={setScreen} />;
  }
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, alignItems: "center", paddingTop: 10 },
  contentOverlay: { flex: 1, width: '100%', backgroundColor: COLORS.OVERLAY, alignItems: 'center', paddingBottom: 80 },
  heading: { fontSize: 26, fontWeight: "bold", marginBottom: 20, marginTop: 10, textAlign: 'center', color: COLORS.TEXT_DARK },
  subHeading: { fontSize: 18, fontWeight: "bold", marginBottom: 5, marginTop: 10, borderBottomWidth: 1, borderBottomColor: COLORS.BORDER_LIGHT, color: COLORS.TEXT_DARK },
  input: { borderWidth: 1, borderColor: COLORS.BORDER_LIGHT, padding: 12, borderRadius: 8, marginBottom: 12, width: '90%', color: COLORS.TEXT_DARK, backgroundColor: '#fff' },
  picker: { marginBottom: 15, width: '90%', color: COLORS.TEXT_DARK, backgroundColor: '#fff' },
  button: { backgroundColor: COLORS.PRIMARY_GREEN, padding: 14, borderRadius: 10, marginTop: 10, alignItems: "center", width: '90%', alignSelf: 'center' },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkBtn: { marginTop: 12, alignSelf: "center", marginBottom: 20 },
  linkText: { color: COLORS.ACCENT_GREEN, fontWeight: "bold", fontSize: 16 },
  error: { color: COLORS.ERROR_RED, marginBottom: 10, fontWeight: '600', textAlign: 'center' },
  success: { color: COLORS.SUCCESS_GREEN, marginBottom: 10, fontWeight: '600', textAlign: 'center' },
  card: { backgroundColor: COLORS.BACKGROUND_LIGHT, padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: COLORS.BORDER_LIGHT, width: '100%' },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4, color: COLORS.TEXT_DARK },
  cardCategory: { fontStyle: "italic", marginTop: 4, fontSize: 14, color: COLORS.TEXT_DARK },
  cardButtonRow: { flexDirection: "row", marginTop: 10 },
  smallBtn: { backgroundColor: COLORS.PRIMARY_GREEN, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginRight: 10 },
  smallBtnText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  emptyText: { textAlign: 'center', color: COLORS.TEXT_DARK, fontStyle: 'italic', marginTop: 20, fontSize: 16 },
  averageContainer: { backgroundColor: COLORS.BACKGROUND_LIGHT, padding: 15, borderRadius: 10, marginBottom: 20, width: '90%', alignSelf: 'center', borderLeftWidth: 5, borderLeftColor: COLORS.PRIMARY_GREEN },
  averageText: { fontSize: 16, color: COLORS.TEXT_DARK, marginTop: 6, marginBottom: 6 },
  tabBar: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: COLORS.BACKGROUND_LIGHT, borderTopWidth: 1, borderTopColor: COLORS.BORDER_LIGHT, paddingVertical: 8 },
  tabButton: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  tabText: { color: COLORS.TEXT_DARK, fontWeight: '600' },
  formContainer: { paddingTop: 10, paddingBottom: 40, alignItems: 'center', width: '100%' },
});

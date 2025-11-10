import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { styles } from './styles'; 



interface MenuItem {
    id: string;
    name: string;
    course: string;
    price: number;
    description: string;
}

//the list of courses
const COURSES = ['Main', 'Starter', 'Dessert']; 
const GUEST_FILTER_COURSES = ['All', ...COURSES];

//added menu items for testing
const INITIAL_MENU_ITEMS: MenuItem[] = [
    { id: '1', name: 'Lasagna', course: 'Main', price: 165.00, description: 'Pasta sheets with mince topped with mozarella cheese.' },
    { id: '2', name: 'Prawns cocktail', course: 'Starter', price: 120.00, description: 'Deep fried prawns in a cup.' },
    { id: '3', name: 'Tiramisu', course: 'Dessert', price: 150, description: 'A slice of Tiramisu dessert' },
    
];

//this function calculates the avarage prices for each course
const calculateAveragePrices = (items: MenuItem[]): Record<string, string> => {
    const courseStats: Record<string, { total: number, count: number }> = {};
    items.forEach(item => {
        const course = item.course;
        if (!courseStats[course]) {
            courseStats[course] = { total: 0, count: 0 };
        }
        courseStats[course].total += item.price;
        courseStats[course].count += 1;
    });

    const averages: Record<string, string> = {};
    for (const course in courseStats) {
        const avg = courseStats[course].total / courseStats[course].count;
        averages[course] = avg.toFixed(2);
    }
    return averages;
};


interface MenuListProps {
    items: MenuItem[];
    showRemove?: boolean;
    onRemoveItem?: (id: string) => void;
}

const MenuList: React.FC<MenuListProps> = ({ items, showRemove = false, onRemoveItem }) => (
    <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <View style={styles.itemContainer}>
                <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.name} : R{item.price.toFixed(2)}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
                {showRemove && onRemoveItem && (
                    <TouchableOpacity 
                        style={styles.removeButton} 
                        onPress={() => onRemoveItem(item.id)}
                    >
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                )}
            </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyListText}>No menu items available.</Text>}
    />
);

//home screen
interface HomeScreenProps {
    menuItems: MenuItem[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems }) => {
    const averagePrices = useMemo(() => calculateAveragePrices(menuItems), [menuItems]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Complete Menu</Text>
            
            <Text style={styles.subHeader}>Average Price Breakdown</Text>
            <View style={styles.averageContainer}>
                {Object.entries(averagePrices).map(([course, avgPrice]) => (
                    <View key={course} style={styles.priceItem}>
                        <Text style={styles.priceLabel}>{course} Average:</Text>
                        <Text style={styles.priceValue}>R{avgPrice}</Text>
                    </View>
                ))}
                {Object.keys(averagePrices).length === 0 && (
                     <Text style={styles.averageText}>No prices to calculate yet.</Text>
                )}
            </View>

            <Text style={styles.subHeader}>All Menu Items</Text>
            <MenuList items={menuItems} />
        </View>
    );
};


//the chef screen
interface ChefScreenProps {
    menuItems: MenuItem[];
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

//input fields for adding menu items
const ChefScreen: React.FC<ChefScreenProps> = ({ menuItems, setMenuItems }) => {
    const [newItemName, setNewItemName] = useState('');
    const [newItemCourse, setNewItemCourse] = useState(COURSES[0]); 
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemDescription, setNewItemDescription] = useState(''); 

    
    const handleAddItem = useCallback(() => {
        const priceValue = parseFloat(newItemPrice);
        if (newItemName.trim() === '' || newItemDescription.trim() === '' || isNaN(priceValue) || priceValue <= 0) {
            Alert.alert('Error', 'Please enter a valid name, description, and price.');
            return;
        }

        const newItem: MenuItem = {
            id: Date.now().toString(),
            name: newItemName.trim(),
            course: newItemCourse, 
            price: priceValue,
            description: newItemDescription.trim(), 
        };

        setMenuItems(prevItems => [...prevItems, newItem]);
        
        
        setNewItemName('');
        setNewItemCourse(COURSES[0]);
        setNewItemPrice('');
        setNewItemDescription(''); 
    }, [newItemName, newItemCourse, newItemPrice, newItemDescription, setMenuItems]);

    
    const handleRemoveItem = useCallback((id: string) => {
        setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
    }, [setMenuItems]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chef: Add/Remove Menu Items</Text>

            <View style={styles.cardContainer}> 
                <Text style={styles.subHeader}>Add New Item</Text>
                
                
                <TextInput
                    style={styles.input}
                    placeholder="Item Name"
                    value={newItemName}
                    onChangeText={setNewItemName}
                />
                
                
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Select Course:</Text>
                    <Picker
                        selectedValue={newItemCourse}
                        onValueChange={(itemValue) => setNewItemCourse(itemValue)}
                        style={styles.picker}
                        mode="dropdown"
                    >
                        
                        {COURSES.map(course => (
                            <Picker.Item key={course} label={course} value={course} />
                        ))}
                    </Picker>
                </View>

                
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Item Description (e.g., ingredients, preparation style)"
                    value={newItemDescription}
                    onChangeText={setNewItemDescription}
                    multiline
                    numberOfLines={3}
                />
                
                
                <TextInput
                    style={styles.input}
                    placeholder="Price (e.g., 150.00 Rands)"
                    value={newItemPrice}
                    onChangeText={setNewItemPrice}
                    keyboardType="numeric"
                />
                
                <TouchableOpacity style={styles.buttonContainer} onPress={handleAddItem}>
                    <Text style={styles.buttonText}>Add Item to Menu</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subHeader}>Current Menu & Removal</Text>
            <MenuList items={menuItems} showRemove={true} onRemoveItem={handleRemoveItem} />
        </View>
    );
};

//filtering/guest screen
interface GuestScreenProps {
    menuItems: MenuItem[];
}

const GuestScreen: React.FC<GuestScreenProps> = ({ menuItems }) => {
    const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');
    
    
    const filteredItems = useMemo(() => {
        return menuItems.filter(item => 
            selectedCourseFilter === 'All' || item.course.toLowerCase() === selectedCourseFilter.toLowerCase()
        );
    }, [menuItems, selectedCourseFilter]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Guest: Filter Menu</Text>
            
            <View style={styles.filterContainer}>
                {GUEST_FILTER_COURSES.map((courseOption) => (
                    <TouchableOpacity
                        key={courseOption}
                        onPress={() => setSelectedCourseFilter(courseOption)}
                        style={[
                            styles.filterButton,
                            selectedCourseFilter === courseOption && styles.activeFilterButton,
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedCourseFilter === courseOption && styles.activeFilterText,
                            ]}
                        >
                            {courseOption}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.subHeader}>Showing: {selectedCourseFilter} ({filteredItems.length} items)</Text>
            <MenuList items={filteredItems} />
        </View>
    );
};



type Screen = 'Home' | 'Chef' | 'Guest';

const App = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
    const [currentScreen, setCurrentScreen] = useState<Screen>('Home');

    const renderScreen = () => {
        switch (currentScreen) {
            case 'Home':
                return <HomeScreen menuItems={menuItems} />;
            case 'Chef':
                return <ChefScreen menuItems={menuItems} setMenuItems={setMenuItems} />;
            case 'Guest':
                return <GuestScreen menuItems={menuItems} />;
            default:
                return <HomeScreen menuItems={menuItems} />;
        }
    };

    return (
        <View style={styles.safeArea}>
            <View style={styles.navContainer}>
                {['Home', 'Chef', 'Guest'].map((screenName) => (
                    <TouchableOpacity
                        key={screenName}
                        style={[
                            styles.navButton,
                            currentScreen === screenName && styles.activeNavButton,
                        ]}
                        onPress={() => setCurrentScreen(screenName as Screen)}
                    >
                        <Text 
                            style={[
                                styles.navText,
                                currentScreen === screenName && styles.activeNavText,
                            ]}
                        >
                            {screenName}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {renderScreen()}
        </View>
    );
};

export default App;
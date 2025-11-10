import { StyleSheet } from 'react-native';

export const COLORS = {
  PRIMARY_GREEN: '#2E7D32',       // Dark Green (Headers, Main Buttons)
  ACCENT_GREEN: '#4CAF50',        // Medium Green (Highlight, Active States)
  BACKGROUND_LIGHT: '#F1F8E9',    // Pale Beige-Green (Main Background)
  SUCCESS_GREEN: '#388E3C',       // Success/Positive Action
  ERROR_RED: '#D32F2F',           // Red (Errors, removal)
  TEXT_DARK: '#333333',           // Dark Text
  BORDER_LIGHT: '#BDBDBD',        // Light Gray Border
  OVERLAY: 'rgba(255, 255, 255, 0.8)', // White Overlay
};

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_LIGHT,
        paddingTop: 50,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.PRIMARY_GREEN,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 10,
        color: COLORS.PRIMARY_GREEN,
    },
    cardContainer: {
        marginBottom: 20, 
        padding: 15, 
        backgroundColor: '#fff', 
        borderRadius: 8, 
        shadowColor: COLORS.TEXT_DARK, 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        elevation: 3 
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.BORDER_LIGHT,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        color: COLORS.TEXT_DARK,
        backgroundColor: '#fff',
    },
    // NEW: Style for multiline description input
    descriptionInput: {
        height: 80, 
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    buttonContainer: {
        backgroundColor: COLORS.ACCENT_GREEN,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    
    // --- ITEM LIST STYLES (UPDATED) ---
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: COLORS.TEXT_DARK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemContent: {
        flex: 1, 
        marginRight: 10,
    },
    itemTitle: {
        fontSize: 16,
        color: COLORS.TEXT_DARK,
        fontWeight: 'bold',
    },
    // NEW: Style for description text
    itemDescription: {
        fontSize: 13,
        color: '#555',
        marginTop: 4,
    },
    removeButton: {
        backgroundColor: COLORS.ERROR_RED,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        color: COLORS.TEXT_DARK,
        fontSize: 16,
    },

    // --- NEW STYLES FOR PICKER (Dropdown) ---
    pickerContainer: {
        borderWidth: 1,
        borderColor: COLORS.BORDER_LIGHT,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
        overflow: 'hidden', // Ensures the picker respects the border radius
    },
    pickerLabel: {
        fontSize: 14,
        color: COLORS.TEXT_DARK,
        paddingHorizontal: 10,
        paddingTop: 5,
        backgroundColor: '#f9f9f9',
        fontWeight: '500',
    },
    picker: {
        height: 40,
        width: '100%',
        color: COLORS.TEXT_DARK,
        backgroundColor: '#fff',
    },
    
    // --- NAVIGATION STYLES ---
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: COLORS.PRIMARY_GREEN,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.SUCCESS_GREEN,
    },
    navButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    activeNavButton: {
        backgroundColor: '#FFEB3B', 
    },
    navText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    activeNavText: {
        color: COLORS.TEXT_DARK,
        fontWeight: 'bold',
    },

    // --- AVERAGE PRICE STYLES ---
    averageContainer: {
        marginBottom: 20, 
        padding: 15, 
        backgroundColor: COLORS.BACKGROUND_LIGHT,
        borderRadius: 8, 
        borderLeftWidth: 5, 
        borderLeftColor: COLORS.SUCCESS_GREEN,
    },
    priceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#dcedc8',
    },
    priceLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.TEXT_DARK,
    },
    priceValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.SUCCESS_GREEN,
    },
    averageText: {
        fontSize: 14,
        color: COLORS.TEXT_DARK,
        textAlign: 'center',
    },

    // --- FILTERING UI STYLES ---
    filterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_LIGHT,
        marginBottom: 10,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: COLORS.BORDER_LIGHT,
        marginRight: 8,
        marginBottom: 8,
    },
    filterText: {
        color: COLORS.TEXT_DARK,
        fontSize: 14,
    },
    activeFilterButton: {
        backgroundColor: COLORS.PRIMARY_GREEN,
    },
    activeFilterText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
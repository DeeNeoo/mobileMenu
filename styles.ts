import { StyleSheet } from 'react-native';

export const COLORS = {
  PRIMARY_BLACK: '#000000',
  LIGHT_PINK: '#f7e6eb',
  PASTEL_PINK: '#e7cfd6',
  TEXT_PINK: '#f7e6eb',
  TEXT_DARK: '#1a1a1a',
  BORDER_LIGHT: '#d8c5cc',
  OVERLAY: 'rgba(0, 0, 0, 0.1)',
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_PINK,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  // New style for ChefScreen main container
  chefContainer: { 
    flex: 1,
    paddingHorizontal: 20, // Only apply horizontal padding to the scroll view
  },
  // New style for ScrollView content container to apply bottom padding
  scrollContainer: { 
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.PRIMARY_BLACK,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: COLORS.PRIMARY_BLACK,
  },
  cardContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: COLORS.PASTEL_PINK,
    borderRadius: 8,
    shadowColor: COLORS.TEXT_DARK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    color: COLORS.TEXT_DARK,
    backgroundColor: COLORS.LIGHT_PINK,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  buttonContainer: {
    backgroundColor: COLORS.PRIMARY_BLACK,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.LIGHT_PINK,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: COLORS.PRIMARY_BLACK,
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
    color: COLORS.TEXT_PINK,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 13,
    color: COLORS.LIGHT_PINK,
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: COLORS.PASTEL_PINK,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: COLORS.PRIMARY_BLACK,
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Added style to ensure FlatList renders correctly inside ScrollView on ChefScreen
  chefMenuList: {
    minHeight: 1, 
    flexGrow: 0, 
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.PRIMARY_BLACK,
    fontSize: 16,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: COLORS.LIGHT_PINK,
  },
  pickerLabel: {
    fontSize: 14,
    color: COLORS.PRIMARY_BLACK,
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: COLORS.PASTEL_PINK,
    fontWeight: '500',
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.PRIMARY_BLACK,
    backgroundColor: COLORS.LIGHT_PINK,
  },

  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: COLORS.PRIMARY_BLACK,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.PASTEL_PINK,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  activeNavButton: {
    backgroundColor: COLORS.LIGHT_PINK,
  },
  navText: {
    color: COLORS.LIGHT_PINK,
    fontWeight: 'bold',
  },
  activeNavText: {
    color: COLORS.PRIMARY_BLACK,
    fontWeight: 'bold',
  },

  averageContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: COLORS.LIGHT_PINK,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.PASTEL_PINK,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.PASTEL_PINK,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.PRIMARY_BLACK,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_BLACK,
  },
  averageText: {
    fontSize: 14,
    color: COLORS.PRIMARY_BLACK,
    textAlign: 'center',
  },

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
    backgroundColor: COLORS.PASTEL_PINK,
    marginRight: 8,
    marginBottom: 8,
  },
  filterText: {
    color: COLORS.PRIMARY_BLACK,
    fontSize: 14,
  },
  activeFilterButton: {
    backgroundColor: COLORS.PRIMARY_BLACK,
  },
  activeFilterText: {
    color: COLORS.LIGHT_PINK,
    fontWeight: 'bold',
  },
});
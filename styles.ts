import { StyleSheet } from 'react-native';

export const COLORS = {
  PRIMARY_GREEN: '#2e7d32',
  ACCENT_GREEN: '#4caf50',
  BACKGROUND_LIGHT: '#f1f8e9',
  SUCCESS_GREEN: '#388e3c',
  ERROR_RED: '#b00000',
  TEXT_DARK: '#333333',
  BORDER_LIGHT: '#ccc',
  OVERLAY: 'rgba(255, 255, 255, 0.7)',
};

export const styles = StyleSheet.create({
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

  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },

  tabButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },

  tabText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  formContainer: { 
    paddingTop: 10, 
    paddingBottom: 40, 
    alignItems: 'center', 
    width: '100%' 
  },
});

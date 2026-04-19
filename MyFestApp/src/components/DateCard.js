import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, vScale, fScale } from '../utils/scale';
import { Fonts } from '../constants/fonts';

export default function DateCard({ day, month, isActive, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, isActive ? styles.active : styles.inactive]}
    >
      <Text style={styles.month}>{month}</Text>
      <Text style={styles.day}>{day}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: scale(78),
    height: vScale(82),
    backgroundColor: '#EC4646',
    borderColor: '#F6F6F6',
    borderRadius: scale(11),
    alignItems: 'center',
    justifyContent: 'center',
    margin:scale(5),
    // hard drop shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: scale(5), height: scale(5) },
    shadowOpacity: 0.27,
    shadowRadius: 0,
    // Android
    elevation: 4,

  },
  active: {
    borderWidth: scale(5),
    transform: [{ scale: 1.08 }],
    width: scale(130),
  },
  inactive: {
    borderWidth: scale(2),
    width: scale(78),
  },
  month: {
    fontFamily: Fonts.milordBook,
    fontSize: fScale(21),
    color: '#F6F6F6',
    textTransform: 'uppercase',
  },
  day: {
    fontFamily: Fonts.milordBook,
    fontSize: fScale(37),
    color: '#F6F6F6',
    textTransform: 'uppercase',
    marginTop: vScale(2),
  },
});

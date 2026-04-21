import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { scale, vScale, fScale } from '../utils/scale';
import { Fonts } from '../constants/fonts';

export default function DateCard({ day, month, isActive, onPress }) {
  return (
    <View style={[styles.wrapper, isActive ? styles.wrapperActive : styles.wrapperInactive]}>
      <View style={[styles.bgShadow, isActive ? styles.shadowActive : styles.shadowInactive]} />
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.card, isActive ? styles.active : styles.inactive]}
      >
        <View style={styles.contents}>
          <Text style={styles.month}>{month}</Text>
          <Text style={styles.day}>{day}</Text>
        </View>
      </TouchableOpacity>
    </View>
   
    
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: scale(5),
    height: vScale(82),
  },
  wrapperInactive: {
    width: scale(78) + scale(6),
  },
  wrapperActive: {
    width: scale(130) + scale(6),
  },
  card: {
    height: vScale(82),
    backgroundColor: '#EC4646',
    borderColor: '#F6F6F6',
    borderRadius: scale(11),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bgShadow:{
    height: vScale(82),
    backgroundColor: '#000',
    borderRadius: scale(11),
    opacity: 0.3,
    position: 'absolute',
    top: scale(6),
    left: scale(6),
    zIndex: 1,
  },
  shadowInactive: {
    width: scale(78),
  },
  shadowActive: {
    width: scale(130) * 1.08,
  },
  active: {
    borderWidth: scale(5),
    transform: [{ scale: 1.08 }],
    width: scale(130),
  },
  inactive: {
    borderWidth: scale(4),
    width: scale(78),
  },
  contents:{
    zIndex: 10,         
    elevation: 10,
    position:'absolute'
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

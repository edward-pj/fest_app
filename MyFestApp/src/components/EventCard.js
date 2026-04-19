import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { scale, vScale, fScale } from '../utils/scale';
import { Fonts } from '../constants/fonts';

import LocationIcon from '../../assets/svg/location_icon.svg';
import ClockIcon from '../../assets/svg/clock_icon.svg';

const cardBg = require('/Users/prathamjain/Downloads/DVM_tasks/Fest_App/MyFestApp/assets/svg/card_bg_expanded.png');
const tornFrame = require('/Users/prathamjain/Downloads/DVM_tasks/Fest_App/MyFestApp/assets/svg/torn_frame.png');

// Bookmark icon — filled when saved.
function Bookmark({ saved }) {
  return (
    <Svg width={scale(22)} height={scale(28)} viewBox="0 0 22 28" fill="none">
      <Path
        d="M2 2H20V26L11 21L2 26V2Z"
        stroke="#212121"
        strokeWidth="2"
        fill={saved ? '#212121' : 'none'}
      />
    </Svg>
  );
}

// Red paperclip on the top-left.
function Paperclip() {
  return (
    <Svg width={scale(20)} height={scale(56)} viewBox="0 0 21 56" fill="none">
      <Path
        d="M0 45.58V10.16C0 4.55 4.55 0 10.13 0C15.70 0 20.25 4.56 20.25 10.16H16.17C16.17 6.82 13.45 4.09 10.13 4.09C6.80 4.09 4.08 6.82 4.08 10.16V45.58C4.08 48.92 6.80 51.65 10.13 51.65C13.45 51.65 16.17 48.92 16.17 45.58V24.03C16.17 22.89 17.09 21.97 18.22 21.97C19.35 21.97 20.27 22.89 20.27 24.03V45.58C20.27 51.19 15.72 55.74 10.14 55.74C4.57 55.74 0.02 51.18 0.02 45.58H0Z"
        fill="#EB6060"
      />
    </Svg>
  );
}

export default function EventCard({ event, isExpanded, isSaved, onToggleExpand, onToggleSave }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onToggleExpand}
      style={styles.card}
    >
      {/* Paper background — crops (doesn't squash) when collapsed */}
      <ImageBackground
        source={cardBg}
        style={styles.bg}
        imageStyle={styles.bgImage}
        resizeMode="cover"
      >
        {/* Paperclip — sits over the top edge */}
        <View style={styles.paperclip}>
          <Paperclip />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.title} numberOfLines={2}>
              {event.name.toUpperCase()}
            </Text>
            <TouchableOpacity onPress={onToggleSave} hitSlop={10}>
              <Bookmark saved={isSaved} />
            </TouchableOpacity>
          </View>

          <Text style={styles.department}>{event.category}</Text>

          {isExpanded && (
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Quisque ut nulla id tellus mattis tempor. Sed augue odio
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          )}

          <View style={styles.bottomRow}>
            <View style={styles.metaItem}>
              <LocationIcon width={scale(12)} height={scale(16)} />
              <Text style={styles.meta}>{event.venue}</Text>
            </View>
            <View style={styles.metaItem}>
              <ClockIcon width={scale(15)} height={scale(15)} />
              <Text style={styles.meta}>{event.time}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Torn bottom edge overlay */}
      <Image source={tornFrame} style={styles.torn} resizeMode="stretch" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: scale(350),
    alignSelf: 'center',
    marginBottom: vScale(16),
  },
  bg: {
    width: scale(350),
    //overflow: 'hidden',       // crops the image so it doesn't squash
    paddingTop: vScale(20),
    paddingBottom: vScale(16),
    paddingLeft: scale(44),
    paddingRight: scale(16),
  },
  bgImage: {
    // image fills the container top-aligned; bottom is cropped when collapsed
    width: scale(350),
    height: undefined,
    //aspectRatio: 364 / 301,   // original card_bg aspect ratio
  },
  paperclip: {
    position: 'absolute',
    top: -vScale(11.5),
    left: scale(62),
    zIndex: 2,
  },
  torn: {
    width: scale(350),
    height: vScale(22),
    marginTop: -vScale(2),
  },
  content: {
    // content is inside the paper bg; padding comes from styles.bg
    paddingLeft:scale(50)
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: fScale(22),
    color: '#212121',
    fontFamily: Fonts.futuraBdCn,
    marginRight: scale(12),
  },
  department: {
    fontSize: fScale(18),
    color: '#212121',
    fontFamily: Fonts.futuraCond,
    marginTop: vScale(6),
  },
  description: {
    fontSize: fScale(14),
    color: 'rgba(0,0,0,0.75)',
    fontFamily: Fonts.googleSansBold,
    marginTop: vScale(10),
    lineHeight: fScale(18),
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: vScale(12),
    gap: scale(20),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  meta: {
    fontSize: fScale(15),
    color: '#212121',
    fontFamily: Fonts.futuraCond,
  },
});

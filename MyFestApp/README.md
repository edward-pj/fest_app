# 🎪 MyFestApp - College Fest Companion App

A modern, responsive React Native (Expo) mobile application designed for college festival attendees. Built with **Expo Router**, custom design tokens, offline bookmarks with **AsyncStorage**, bottom tab navigation, and live API integrations.

---

## 📱 Features

- **Bottom Tab Navigation**: Seamless tab navigation between:
  - 📅 **Events**: Interactive schedule filtered by category (*Music, Tech, Dance, All*) and day.
  - 📢 **Announcements**: Live fest notice board with real-time API data fetching and pull-to-refresh.
  - 🔖 **Saved**: Bookmarked events saved offline with `@react-native-async-storage/async-storage`.
- **Accordion Event Details**: Expand/collapse event cards with smooth layout animations.
- **Dedicated Saved Events**: Auto-refreshing bookmark management via `useFocusEffect`.
- **Live API Calling**: REST API integration for real-time announcements, loading indicators, and error resilience.
- **Responsive Design**: Custom scaling utilities (`scale`, `vScale`, `fScale`) tailored for various screen dimensions.
- **Dark Theme Aesthetics**: Custom typography (`MilordBook`), vector icons, and SVG styling.

---

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 57)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based Tabs & Stacks)
- **Networking & API**: Native `fetch` with `async/await`, `RefreshControl`, and state management (`loading`, `error`, `data`)
- **State & Storage**: React Hooks (`useState`, `useEffect`, `useCallback`, `useFocusEffect`) & `@react-native-async-storage/async-storage`
- **Graphics & Icons**: `@expo/vector-icons`, `react-native-svg`
- **Fonts & Assets**: `expo-font`, `expo-asset`

---

## 📂 Project Architecture

```text
MyFestApp/
├── app/
│   ├── _layout.js               # Root Stack layout (Font loading, Splash screen)
│   └── (tabs)/                  # Bottom Tab Navigator Group
│       ├── _layout.js           # Tabs configuration (Icons, Themes, Screen names)
│       ├── index.js             # Tab 1: Events Schedule & Filters
│       ├── announcements.js     # Tab 2: Live Notice Board (API Integration)
│       └── bookmarks.js         # Tab 3: Saved Events (AsyncStorage)
├── assets/                      # Static images and custom fonts
├── src/
│   ├── components/              # Reusable UI components (EventCard, DateCard, NoticeCard)
│   ├── constants/               # Design tokens (Fonts, Dates, Colors)
│   └── utils/                   # Scaling helpers (scale.js)
├── schedule.js                  # Local festival event data
├── app.json                     # Expo configuration & scheme
└── package.json                 # Project dependencies
```

---

## 📢 Live Announcements Feature (API Integration Blueprint)

### Target Endpoint:
`https://opensheet.elk.sh/1MfZYc_NGIG8MrOpIS3gkzlCUtECoI2Lm5EbT5AfAifc/Sheet1`

### Learning Objectives:
1. **API Lifecycle**:
   - `loading: true` $\rightarrow$ Render `<ActivityIndicator>` or skeleton shimmer.
   - `success` $\rightarrow$ Render `<FlatList>` of announcement cards.
   - `error` $\rightarrow$ Render retry button and fallback error message.
2. **Pull-to-Refresh**:
   - Implement `RefreshControl` so attendees can pull down to check for new announcements.
3. **Optimistic Updates / Mock Post Creation**:
   - Practice 09sending `POST` requests to simulate organizers broadcasting a flash announcement.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start -c
```

### 3. Run on Device / Simulator
- Press `a` for Android Emulator.
- Press `i` for iOS Simulator.
- Scan the QR code with **Expo Go** on your physical device.

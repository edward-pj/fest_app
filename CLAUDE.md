# MyFestApp - CLAUDE.md

## Project Overview

A college fest event-listing mobile app built for BITS Pilani. Currently an early-stage MVP with a single screen showing searchable/filterable event cards. The goal is to transform this into a polished, production-ready fest app based on Figma designs.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React Native | 0.81.5 |
| Platform | Expo (managed workflow) | 54.0.0 |
| UI Library | React | 19.1.0 |
| Status Bar | expo-status-bar | ~3.0.9 |
| Assets | expo-asset | ~12.0.12 |
| Language | JavaScript (ES6+ / JSX) |  |
| iOS Build | Xcode / CocoaPods |  |
| Android Build | Gradle |  |
| Bundler | Metro (via Expo) |  |

## Project Structure

```
Fest_App/
└── MyFestApp/               # Main app directory
    ├── App.js                # Root component - single screen with search, filters, event list
    ├── index.js              # Entry point
    ├── schedule.js           # Hardcoded event data (15 events)
    ├── app.json              # Expo config
    ├── package.json          # Dependencies
    ├── assets/               # App icons, splash screen
    ├── ios/                  # iOS native project
    └── android/              # Android native project
```

## Current App State

- **Single screen** with a `ScrollView` containing a search bar, 4 category filter buttons (All/Music/Tech/Dance), and event cards
- **EventCard component** shows event name, category, and a save/unsave toggle (state is local, not persisted)
- **Filtering** is done client-side: text search on event name + category filter
- **No navigation** library installed (no React Navigation or Expo Router)
- **No styling** applied to components (StyleSheet is defined but unused)
- **No backend/API** - all data comes from `schedule.js`
- **No state persistence** - saved events reset on refresh
- **No theming** or design system

## Event Data Schema

Each event in `schedule.js` has:
```js
{ id, name, category, day, time, venue, registrations }
```
Categories: Music, Tech, Dance, Cultural, Gaming, Quiz, Academic, Literary, Entrepreneurship, Misc

## Commands

```bash
cd MyFestApp

# Install dependencies
npm install

# Start Expo dev server
npm start           # or: npx expo start

# Run on specific platform
npm run ios         # npx expo run:ios
npm run android     # npx expo run:android
npm run web         # npx expo start --web
```

## Development Guidelines

### Code Style
- Use functional components with React hooks (`useState`, `useEffect`, etc.)
- Keep components small and focused - one component per file when extracting from App.js
- Use ES6+ syntax (arrow functions, destructuring, template literals)
- Import paths should be relative (fix the current absolute path import in App.js)

### Styling
- Use React Native `StyleSheet.create()` for all styles
- When implementing Figma designs, match exact colors, spacing, border-radius, and typography
- Use `flex` layout (React Native uses Flexbox by default)
- Keep styles co-located with components or in a shared theme file if patterns repeat

### File Organization (target structure for redesign)
```
MyFestApp/
├── src/
│   ├── components/       # Reusable UI components (EventCard, SearchBar, etc.)
│   ├── screens/          # Full screen components
│   ├── navigation/       # Navigation config (when added)
│   ├── constants/        # Colors, fonts, spacing, theme
│   ├── data/             # Event data, mock data
│   ├── assets/           # Images, icons, fonts used in UI
│   └── utils/            # Helper functions
├── App.js
└── ...
```

### When Implementing Figma Designs
- Ask for or reference the specific Figma screen before coding
- Match pixel-perfect spacing, colors, and typography from the design
- Use `Dimensions` or `useWindowDimensions` for responsive layouts
- Test on both iOS and Android - some components render differently
- Prefer `FlatList` over `ScrollView` for long lists (better performance)
- Use `SafeAreaView` to avoid notch/status bar overlap

### Important Notes
- The app runs on Expo managed workflow - avoid ejecting unless absolutely necessary
- Portrait orientation only (set in app.json)
- All source code lives inside `MyFestApp/` directory
- The import in App.js line 3 uses an absolute path - this should be changed to `./schedule.js`
- The `styles` object in App.js is defined but not applied to any component

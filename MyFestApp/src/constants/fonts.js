// Font family names — use these in styles: fontFamily: Fonts.xxx
export const Fonts = {
  milordBook: 'MilordBook',
  futuraBdCn: 'FuturaBdCnBT',       // card title
  futuraCond: 'FuturaCondensedPT', // card dept / venue / time
  googleSansBold: 'GoogleSans-Bold',      // card description
};

// Files that must exist in assets/fonts/
// Drop the .ttf files in, then uncomment the matching lines below.
export const fontAssets = {
  MilordBook: require('../../assets/fonts/MilordBook.ttf'),

  FuturaBdCnBT: require('/Users/prathamjain/Downloads/DVM_tasks/Fest_App/MyFestApp/assets/fonts/FuturaBdCnBT-Bold.ttf'),
  FuturaCondensedPT: require('/Users/prathamjain/Downloads/DVM_tasks/Fest_App/MyFestApp/assets/fonts/FuturaCondensedPT-Medium.otf'),
  'GoogleSans-Bold': require('/Users/prathamjain/Downloads/DVM_tasks/Fest_App/MyFestApp/assets/fonts/GoogleSans-Bold.ttf'),
};

// Fix 2 — fontWeight: 'bold' fights the custom font. When you set both fontFamily (a file that's    
//   already bold) AND fontWeight: 'bold', iOS tries to find a "bold variant" of that family, fails,   
//   and falls back to system font. Remove the weight. 

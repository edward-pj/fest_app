import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FIGMA_WIDTH = 390;
const FIGMA_HEIGHT = 844;

export const scale = (size) => (SCREEN_WIDTH / FIGMA_WIDTH) * size;

export const vScale = (size) => (SCREEN_HEIGHT / FIGMA_HEIGHT) * size;

export const fScale = (size) => {
  const ratio = size / FIGMA_WIDTH;
  const newSize = ratio * SCREEN_WIDTH;
  return Math.round(newSize);
};

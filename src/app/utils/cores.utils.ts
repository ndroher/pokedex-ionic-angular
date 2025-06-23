export interface IColorSet {
  primary: string;
  'secondary-light': string;
  'secondary-dark': string;
}

export const CORES_TIPO: { [key: string]: IColorSet } = {
  bug: {
    primary: '#94bc4a',
    'secondary-light': '#f6f9f0',
    'secondary-dark': '#232e10',
  },
  dark: {
    primary: '#736c75',
    'secondary-light': '#f1eff2',
    'secondary-dark': '#222023',
  },
  dragon: {
    primary: '#6a7baf',
    'secondary-light': '#f0f2f9',
    'secondary-dark': '#192036',
  },
  electric: {
    primary: '#e5c531',
    'secondary-light': '#fcf9e9',
    'secondary-dark': '#453b0e',
  },
  fairy: {
    primary: '#e397d1',
    'secondary-light': '#fbeffd',
    'secondary-dark': '#442c3f',
  },
  fighting: {
    primary: '#cb5f48',
    'secondary-light': '#faeeeb',
    'secondary-dark': '#3d1c15',
  },
  fire: {
    primary: '#ea7a3c',
    'secondary-light': '#fcefe9',
    'secondary-dark': '#462411',
  },
  flying: {
    primary: '#7da6de',
    'secondary-light': '#f2f6fb',
    'secondary-dark': '#243142',
  },
  ghost: {
    primary: '#846ab6',
    'secondary-light': '#f4f0fa',
    'secondary-dark': '#261e38',
  },
  grass: {
    primary: '#71c558',
    'secondary-light': '#f1f9ef',
    'secondary-dark': '#213a19',
  },
  ground: {
    primary: '#cc9f4f',
    'secondary-light': '#faefda',
    'secondary-dark': '#3d2f17',
  },
  ice: {
    primary: '#70cbd4',
    'secondary-light': '#f0f9fa',
    'secondary-dark': '#1f3b3f',
  },
  normal: {
    primary: '#aab09f',
    'secondary-light': '#f7f8f6',
    'secondary-dark': '#32342f',
  },
  poison: {
    primary: '#b468b7',
    'secondary-light': '#f8f0f9',
    'secondary-dark': '#361e38',
  },
  psychic: {
    primary: '#e5709b',
    'secondary-light': '#fbeff4',
    'secondary-dark': '#45212e',
  },
  rock: {
    primary: '#b2a061',
    'secondary-light': '#f8f6ee',
    'secondary-dark': '#36301d',
  },
  steel: {
    primary: '#89a1b0',
    'secondary-light': '#f4f6f7',
    'secondary-dark': '#273035',
  },
  water: {
    primary: '#539ae2',
    'secondary-light': '#eef5fc',
    'secondary-dark': '#142d44',
  },
  default: {
    primary: '#81a596',
    'secondary-light': '#f3f8f7',
    'secondary-dark': '#25312d',
  },
};

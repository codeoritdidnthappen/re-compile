import { oklch, formatHex } from "culori"
import daisyuiThemes from "daisyui/theme/object"

// Add custom themes to DaisyUI themes
const allThemes = { ...daisyuiThemes,
  chill: {
    "--color-primary": `oklch(83% 0.145 321.434)`,
    "--color-primary-content": `oklch(29% 0.149 302.717)`,
    "--color-secondary": `oklch(60% 0.25 292.717)`,
    "--color-secondary-content": `oklch(49% 0.27 292.581)`,
    "--color-accent": `oklch(69% 0.17 162.48)`,
    "--color-accent-content": `oklch(42% 0.199 265.638)`,
    "--color-neutral": `oklch(71% 0.194 13.428)`,
  },
  validmonkey: {
    "--color-primary": `oklch(70% 0.14 182.503)`,
    "--color-primary-content": `oklch(98% 0.014 180.72)`,
    "--color-secondary": `oklch(0% 0 0)`,
    "--color-secondary-content": `oklch(100% 0 0)`,
    "--color-accent": `oklch(60% 0.25 292.717)`,
    "--color-accent-content": `oklch(96% 0.016 293.756)`,
    "--color-neutral": `oklch(43% 0.078 188.216)`
  },
  mysteryhouse: {
    "--color-primary": `oklch(69% 0.17 162.48)`,
    "--color-primary-content": `oklch(97% 0.021 166.113)`,
    "--color-secondary": `oklch(65% 0.241 354.308)`,
    "--color-secondary-content": `oklch(97% 0.014 343.198)`,
    "--color-accent": `oklch(79% 0.184 86.047)`,
    "--color-accent-content": `oklch(98% 0.026 102.212)`,
    "--color-neutral": `oklch(64% 0.2 131.684)`
  },
  garmentcoffee: {
    "--color-primary": `oklch(86% 0.127 207.078)`,
    "--color-primary-content": `oklch(30% 0.056 229.695)`,
    "--color-secondary": `oklch(89% 0.196 126.665)`,
    "--color-secondary-content": `oklch(27% 0.072 132.109)`,
    "--color-accent": `oklch(87% 0.15 154.449)`,
    "--color-accent-content": `oklch(26% 0.065 152.934)`,
    "--color-neutral": `oklch(21% 0.034 264.665)`
  },
  icehouse: {
    "--color-primary": `oklch(67% 0.182 276.935)`,
    "--color-primary-content": `oklch(25% 0.09 281.288)`,
    "--color-secondary": `oklch(74% 0.16 232.661)`,
    "--color-secondary-content": `oklch(29% 0.066 243.157)`,
    "--color-accent": `oklch(75% 0.183 55.934)`,
    "--color-accent-content": `oklch(26% 0.079 36.259)`,
    "--color-neutral": `oklch(44% 0.017 285.786)`
  },
  demonflip: {
    "--color-primary": `oklch(76% 0.233 130.85)`,
    "--color-primary-content": `oklch(98% 0.031 120.757)`,
    "--color-secondary": `oklch(58% 0.233 277.117)`,
    "--color-secondary-content": `oklch(96% 0.018 272.314)`,
    "--color-accent": `oklch(69% 0.17 162.48)`,
    "--color-accent-content": `oklch(97% 0.021 166.113)`,
    "--color-neutral": `oklch(37% 0.044 257.287)`
  }
}

const getThemeColors = (theme) => {
  const hslArray = [ 
    allThemes[theme]["--color-primary"],
    allThemes[theme]["--color-primary-content"],
    allThemes[theme]["--color-secondary"],
    allThemes[theme]["--color-secondary-content"],
    allThemes[theme]["--color-accent"],
    allThemes[theme]["--color-accent-content"],
    allThemes[theme]["--color-neutral"]
  ]
  const oklchColor = { mode: "oklch", l: 0.7, c: 0.15, h: 240 }
  const hexColor = formatHex(oklch(hslArray[0]))
  const hexArray = hslArray.map(color => formatHex(oklch(color)))
  return hexArray
}

export default getThemeColors
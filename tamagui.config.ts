import { defaultConfig } from "@tamagui/config/v4";
import { color, radius, size, space, themes, zIndex } from "@tamagui/themes";
import { createTamagui, createTokens } from "tamagui";

const tokens = createTokens({
  size,
  space,
  zIndex,
  color,
  radius,
});

export const config = createTamagui({
  ...defaultConfig,
  media: {
    ...defaultConfig.media,
    // add your own media queries here, if wanted
  },
  tokens,
  themes,
});

type OurConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends OurConfig {}
}

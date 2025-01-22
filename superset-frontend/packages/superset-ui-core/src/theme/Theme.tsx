/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// eslint-disable-next-line no-restricted-syntax
import React from 'react';
import {
  theme as antdThemeImport,
  ThemeConfig as AntdThemeConfig,
  ConfigProvider,
} from 'antd-v5';
import tinycolor from 'tinycolor2';

import {
  ThemeProvider as EmotionThemeProvider,
  CacheProvider as EmotionCacheProvider,
} from '@emotion/react';
import createCache from '@emotion/cache';
import { merge } from 'lodash';

/* eslint-disable theme-colors/no-literal-colors */

interface SystemColors {
  primary: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  grayscale: string;
}

interface ColorVariations {
  base: string;
  light1: string;
  light2: string;
  light3: string;
  light4: string;
  light5: string;
  dark1: string;
  dark2: string;
  dark3: string;
  dark4: string;
  dark5: string;
  // new stuff
  bg: string;
  bgHover: string;
  border: string;
  borderHover: string;
  hover: string;
  active: string;
  textHover: string;
  text: string;
  textActive: string;
}

interface ThemeColors {
  text: {
    label: string;
    help: string;
  };
  primary: ColorVariations;
  error: ColorVariations;
  warning: ColorVariations;
  success: ColorVariations;
  info: ColorVariations;
  grayscale: ColorVariations;
}

interface LegacyThemeColors {
  primary: ColorVariations;
  error: ColorVariations;
  warning: ColorVariations;
  success: ColorVariations;
  info: ColorVariations;
  grayscale: ColorVariations;
}

interface LegacySupersetTheme {
  colors: LegacyThemeColors;
  borderRadius: number;
  body: {
    backgroundColor: string;
    color: string;
  };
  opacity: {
    light: string;
    mediumLight: string;
    mediumHeavy: string;
    heavy: string;
  };
  typography: {
    families: {
      sansSerif: string;
      monospace: string;
    };
    weights: {
      light: number;
      normal: number;
      medium: number;
      bold: number;
    };
    sizes: {
      xxs: number;
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
      xxl: number;
    };
  };
  zIndex: {
    aboveDashboardCharts: number;
    dropdown: number;
    max: number;
  };
  transitionTiming: number;
  gridUnit: number;
  brandIconMaxWidth: number;
}

const sharedAntdTokens = [
  'borderRadius',
  'borderRadiusLG',
  'borderRadiusOuter',
  'borderRadiusSM',
  'borderRadiusXS',
  'boxShadow',
  'boxShadowCard',
  'boxShadowDrawerDown',
  'boxShadowDrawerLeft',
  'boxShadowDrawerRight',
  'boxShadowDrawerUp',
  'boxShadowPopoverArrow',
  'boxShadowSecondary',
  'boxShadowTabsOverflowBottom',
  'boxShadowTabsOverflowLeft',
  'boxShadowTabsOverflowRight',
  'boxShadowTabsOverflowTop',
  'boxShadowTertiary',
  'colorError',
  'colorErrorActive',
  'colorErrorBg',
  'colorErrorBgActive',
  'colorErrorBgHover',
  'colorErrorBorder',
  'colorErrorBorderHover',
  'colorErrorHover',
  'colorErrorOutline',
  'colorErrorText',
  'colorErrorTextActive',
  'colorErrorTextHover',
  'colorPrimary',
  'colorPrimaryActive',
  'colorPrimaryBg',
  'colorPrimaryBgHover',
  'colorPrimaryBorder',
  'colorPrimaryBorderHover',
  'colorPrimaryHover',
  'colorPrimaryText',
  'colorPrimaryTextActive',
  'colorPrimaryTextHover',
  'colorSuccess',
  'colorSuccessActive',
  'colorSuccessBg',
  'colorSuccessBgHover',
  'colorSuccessBorder',
  'colorSuccessBorderHover',
  'colorSuccessHover',
  'colorSuccessText',
  'colorSuccessTextActive',
  'colorSuccessTextHover',
  'colorBgBase',
  'colorBgBlur',
  'colorBgContainer',
  'colorBgContainerDisabled',
  'colorBgElevated',
  'colorBgLayout',
  'colorBgMask',
  'colorBgSpotlight',
  'colorBgTextActive',
  'colorBgTextHover',
  'colorBorder',
  'colorBorderBg',
  'colorBorderSecondary',
  'colorFill',
  'colorFillAlter',
  'colorFillContent',
  'colorFillContentHover',
  'colorFillQuaternary',
  'colorFillSecondary',
  'colorFillTertiary',
  'colorHighlight',
  'colorIcon',
  'colorIconHover',
  'colorInfo',
  'colorInfoActive',
  'colorInfoBg',
  'colorInfoBgHover',
  'colorInfoBorder',
  'colorInfoBorderHover',
  'colorInfoHover',
  'colorInfoText',
  'colorInfoTextActive',
  'colorInfoTextHover',
  'colorLink',
  'colorLinkActive',
  'colorLinkHover',
  'colorSplit',
  'colorText',
  'colorTextBase',
  'colorTextDescription',
  'colorTextDisabled',
  'colorTextHeading',
  'colorTextLabel',
  'colorTextLightSolid',
  'colorTextPlaceholder',
  'colorTextQuaternary',
  'colorTextSecondary',
  'colorTextTertiary',
  'colorWarning',
  'colorWarningActive',
  'colorWarningBg',
  'colorWarningBgHover',
  'colorWarningBorder',
  'colorWarningBorderHover',
  'colorWarningHover',
  'colorWarningOutline',
  'colorWarningText',
  'colorWarningTextActive',
  'colorWarningTextHover',
  'colorWhite',
  'controlHeight',
  'controlHeightLG',
  'controlHeightSM',
  'controlHeightXS',
  'controlInteractiveSize',
  'controlItemBgActive',
  'controlItemBgActiveDisabled',
  'controlItemBgActiveHover',
  'controlItemBgHover',
  'controlOutline',
  'controlOutlineWidth',
  'controlPaddingHorizontal',
  'controlPaddingHorizontalSM',
  'controlTmpOutline',
  'fontFamily',
  'fontFamilyCode',
  'fontHeight',
  'fontHeightLG',
  'fontHeightSM',
  'fontSize',
  'fontSizeHeading1',
  'fontSizeHeading2',
  'fontSizeHeading3',
  'fontSizeHeading4',
  'fontSizeHeading5',
  'fontSizeIcon',
  'fontSizeLG',
  'fontSizeSM',
  'fontSizeXL',
  'fontWeightStrong',
  'lineHeight',
  'lineHeightHeading1',
  'lineHeightHeading2',
  'lineHeightHeading3',
  'lineHeightHeading4',
  'lineHeightHeading5',
  'lineHeightLG',
  'lineHeightSM',
  'lineType',
  'lineWidth',
  'lineWidthBold',
  'lineWidthFocus',
  'linkDecoration',
  'linkFocusDecoration',
  'linkHoverDecoration',
  'margin',
  'marginLG',
  'marginMD',
  'marginSM',
  'marginXL',
  'marginXS',
  'marginXXL',
  'marginXXS',
  'motion',
  'motionBase',
  'motionDurationFast',
  'motionDurationMid',
  'motionDurationSlow',
  'motionEaseInBack',
  'motionEaseInOut',
  'motionEaseInOutCirc',
  'motionEaseInQuint',
  'motionEaseOut',
  'motionEaseOutBack',
  'motionEaseOutCirc',
  'motionEaseOutQuint',
  'motionUnit',
  'opacityImage',
  'opacityLoading',
  'padding',
  'paddingContentHorizontal',
  'paddingContentHorizontalLG',
  'paddingContentHorizontalSM',
  'paddingContentVertical',
  'paddingContentVerticalLG',
  'paddingContentVerticalSM',
  'paddingLG',
  'paddingMD',
  'paddingSM',
  'paddingXL',
  'paddingXS',
  'paddingXXS',
  'screenLG',
  'screenLGMax',
  'screenLGMin',
  'screenMD',
  'screenMDMax',
  'screenMDMin',
  'screenSM',
  'screenSMMax',
  'screenSMMin',
  'screenXL',
  'screenXLMax',
  'screenXLMin',
  'screenXS',
  'screenXSMax',
  'screenXSMin',
  'screenXXL',
  'screenXXLMin',
  'size',
  'sizeLG',
  'sizeMD',
  'sizeMS',
  'sizePopupArrow',
  'sizeSM',
  'sizeStep',
  'sizeUnit',
  'sizeXL',
  'sizeXS',
  'sizeXXL',
  'sizeXXS',
  'wireframe',
  'zIndexBase',
  'zIndexPopupBase',
];

// Generating a type
const sharedAntdTokensObject = Object.fromEntries(
  sharedAntdTokens.map(key => [key, '']),
) as Record<string, string>;

// Derive the type dynamically
export type SharedAntdTokens = typeof sharedAntdTokensObject;

export type SupersetTheme = LegacySupersetTheme & SharedAntdTokens;

const DEFAULT_SYSTEM_COLORS = {
  primary: '#20a7c9',
  error: '#e04355',
  warning: '#fcc700',
  success: '#5ac189',
  info: '#66bcfe',
  grayscale: '#666666',
};

export class Theme {
  theme: SupersetTheme;

  private static namedColors = [
    'primary',
    'error',
    'warning',
    'success',
    'info',
    'grayscale',
  ];

  private antdConfig: AntdThemeConfig;

  private constructor() {
    this.updateTheme = this.updateTheme.bind(this);
    this.SupersetThemeProvider = this.SupersetThemeProvider.bind(this);
  }

  static fromSystemColors(
    systemColors?: Partial<SystemColors>,
    isDark = false,
  ): Theme {
    const theme = new Theme();
    const allSystemColors: SystemColors = {
      ...DEFAULT_SYSTEM_COLORS,
      ...systemColors,
    };
    theme.setThemeWithSystemColors(allSystemColors, isDark);
    return theme;
  }

  static fromAntdConfig(themeConfig: AntdThemeConfig): Theme {
    const theme = new Theme();
    return theme;
  }

  private static generateColorVariations(
    colorName: string,
    color: string,
    isDark: boolean,
  ): ColorVariations {
    const bg = isDark ? '#FFF' : '#000';
    const fg = isDark ? '#000' : '#FFF';
    const adjustColor = (color: string, perc: number, target: string): string =>
      tinycolor.mix(color, target, perc).toHexString();
    return {
      base: color,
      light1: adjustColor(color, 20, fg),
      light2: adjustColor(color, 45, fg),
      light3: adjustColor(color, 70, fg),
      light4: adjustColor(color, 90, fg),
      light5: adjustColor(color, 95, fg),
      dark1: adjustColor(color, 10, bg),
      dark2: adjustColor(color, 20, bg),
      dark3: adjustColor(color, 40, bg),
      dark4: adjustColor(color, 60, bg),
      dark5: adjustColor(color, 80, bg),
      // new stuff
      active: adjustColor(color, 80, bg),
      textActive: adjustColor(color, 70, bg),
      text: adjustColor(color, 20, bg),
      textHover: adjustColor(color, 30, fg),
      hover: adjustColor(color, 40, fg),
      borderHover: adjustColor(color, 50, fg),
      border: adjustColor(color, 70, fg),
      bgHover: adjustColor(color, 80, fg),
      bg: adjustColor(color, 90, fg),
    };
  }

  private static getColors(
    systemColors: SystemColors,
    isDark: boolean,
  ): ThemeColors {
    return {
      primary: Theme.generateColorVariations(
        'primary',
        systemColors.primary,
        isDark,
      ),
      error: Theme.generateColorVariations('error', systemColors.error, isDark),
      warning: Theme.generateColorVariations(
        'warning',
        systemColors.warning,
        isDark,
      ),
      success: Theme.generateColorVariations(
        'success',
        systemColors.success,
        isDark,
      ),
      info: Theme.generateColorVariations('info', systemColors.info, isDark),
    };
  }

  private static getSupersetTheme(
    systemColors: Partial<SystemColors>,
    isDark = false,
  ): SupersetTheme {
    const antdConfig = Theme.getAntdConfig(systemColors, isDark);
    const allSystemColors: SystemColors = {
      ...DEFAULT_SYSTEM_COLORS,
      ...systemColors,
    };
    const theme: SupersetTheme = {
      colors: Theme.getColors(allSystemColors, isDark),
      borderRadius: 4,
      body: {
        backgroundColor: isDark ? '#000' : '#FFF',
        color: isDark ? '#FFF' : '#000',
      },
      opacity: {
        light: '10%',
        mediumLight: '35%',
        mediumHeavy: '60%',
        heavy: '80%',
      },
      typography: {
        families: {
          sansSerif: `'Inter', Helvetica, Arial`,
          monospace: `'Fira Code', 'Courier New', monospace`,
        },
        weights: {
          light: 200,
          normal: 400,
          medium: 500,
          bold: 600,
        },
        sizes: {
          xxs: 9,
          xs: 10,
          s: 12,
          m: 14,
          l: 16,
          xl: 21,
          xxl: 28,
        },
      },
      zIndex: {
        aboveDashboardCharts: 10,
        dropdown: 11,
        max: 3000,
      },
      transitionTiming: 0.3,
      gridUnit: 4,
      brandIconMaxWidth: 37,
      ...Theme.getFilteredAntdTheme(antdConfig),
    };
    return theme;
  }

  private static getFilteredAntdTheme(
    antdConfig: AntdThemeConfig,
  ): Record<string, any> {
    const theme = Theme.getAntdTokens(antdConfig);

    return Object.fromEntries(
      sharedAntdTokens
        .sort((a, b) => a.localeCompare(b)) // Sort keys alphabetically
        .map(key => [key, theme[key]]), // Map keys to their values from the theme
    );
  }

  private static getAntdConfig(
    seed: Record<string, any>,
    isDark: boolean,
  ): AntdThemeConfig {
    const algorithm = isDark
      ? antdThemeImport.darkAlgorithm
      : antdThemeImport.defaultAlgorithm;

    return {
      token: seed,
      algorithm,
    };
  }

  mergeTheme(partialTheme: Partial<LegacySupersetTheme>): void {
    const mergedTheme = merge({}, this.theme, partialTheme);
    // const isDark = tinycolor(mergedTheme.colorBgBase).isDark();
    // this.updateTheme(mergedTheme, isDark);
  }

  private updateTheme(theme: SupersetTheme, antdConfig: AntdThemeConfig): void {
    this.theme = theme;
    this.antdConfig = antdConfig;
    this.updateProviders(
      this.theme,
      this.antdConfig,
      createCache({ key: 'superset' }),
    );
  }

  setThemeWithSystemColors(
    systemColors: Partial<SystemColors>,
    isDark: boolean,
  ): void {
    const theme = Theme.getSupersetTheme(systemColors || {}, isDark);
    const antdConfig = Theme.getAntdConfig(systemColors, isDark);
    this.updateTheme(theme, antdConfig);
  }

  private static getAntdTokens(
    antdConfig: AntdThemeConfig,
  ): Record<string, any> {
    return antdThemeImport.getDesignToken(antdConfig);
  }

  getThemeFromAntdConfig(themeConfig: AntdThemeConfig): void {
    this.antdConfig = themeConfig;
    const tokens = Theme.getAntdTokens(themeConfig);
    const isDark = tinycolor(tokens.colorBgBase).isDark();
    const systemColors: SystemColors = {
      primary: tokens.colorPrimary,
      error: tokens.colorError,
      warning: tokens.colorWarning,
      success: tokens.colorSuccess,
      info: tokens.colorInfo,
    };
    const colors: ThemeColors = Theme.getColors(systemColors, isDark);

    this.theme = {
      colors,
      borderRadius: tokens.borderRadius,
      body: {
        backgroundColor: tokens.colorBgLayout,
        color: tokens.colorTextBase,
      },
      opacity: {
        light: '10%',
        mediumLight: '35%',
        mediumHeavy: '60%',
        heavy: '80%',
      },
      typography: {
        families: {
          sansSerif: tokens.fontFamily,
          monospace: tokens.fontFamilyCode,
        },
        weights: {
          light: 200,
          normal: 400,
          medium: 500,
          bold: 600,
        },
        sizes: {
          xxs: tokens.fontSizeSM - 3,
          xs: tokens.fontSizeSM - 2,
          s: tokens.fontSizeSM,
          m: tokens.fontSize,
          l: tokens.fontSizeLG,
          xl: tokens.fontSizeXL,
          xxl: tokens.fontSizeXL + 4,
        },
      },
      zIndex: {
        aboveDashboardCharts: 10,
        dropdown: 11,
        max: 3000,
      },
      transitionTiming: 0.3,
      gridUnit: 4,
      brandIconMaxWidth: 37,
    };
    this.updateProviders(
      this.theme,
      this.antdConfig,
      createCache({ key: 'superset' }),
    );
  }

  private updateProviders(
    theme: SupersetTheme,
    antdConfig: AntdThemeConfig,
    emotionCache: any,
  ): void {}

  SupersetThemeProvider({ children }: { children: React.ReactNode }) {
    if (!this.theme || !this.antdConfig) {
      throw new Error('Theme is not initialized.');
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [themeState, setThemeState] = React.useState({
      theme: this.theme,
      antdConfig: this.antdConfig,
      emotionCache: createCache({ key: 'superset' }),
    });

    this.updateProviders = (theme, antdConfig, emotionCache) => {
      setThemeState({ theme, antdConfig, emotionCache });
    };
    return (
      <EmotionCacheProvider value={themeState.emotionCache}>
        <EmotionThemeProvider theme={themeState.theme}>
          <ConfigProvider theme={themeState.antdConfig} prefixCls="antd5">
            {children}
          </ConfigProvider>
        </EmotionThemeProvider>
      </EmotionCacheProvider>
    );
  }
}

import { Empty, theme } from 'antd';
import { MappingAlgorithm } from 'antd/es/config-provider/context';
import { ArexCoreProvider, generateToken, Theme } from 'arex-core';
import React, { useMemo } from 'react';

import { DEFAULT_COLOR_PRIMARY } from './constant';
import { I18nextLng, localeMap } from './i18n';
import { GlobalConfigProvider } from './providers';
import Routes from './router';
import { useUserProfile } from './store';
import GlobalStyle from './style/GlobalStyle';

const { darkAlgorithm, compactAlgorithm, defaultAlgorithm } = theme;

const App = () => {
  // TODO get from user profile
  const { theme } = useUserProfile();
  const compactMode = false;
  const colorPrimary = DEFAULT_COLOR_PRIMARY;
  const language: `${I18nextLng}` = 'zh-CN';

  const algorithm = useMemo<MappingAlgorithm[]>(() => {
    const _algorithm = [defaultAlgorithm];
    theme === Theme.dark && _algorithm.push(darkAlgorithm);
    compactMode && _algorithm.push(compactAlgorithm);
    return _algorithm;
  }, [theme, compactMode]);

  return (
    <GlobalConfigProvider
      theme={{
        token: generateToken(theme, colorPrimary),
        algorithm,
      }}
      locale={localeMap[language]}
      renderEmpty={() => Empty.PRESENTED_IMAGE_SIMPLE}
    >
      <GlobalStyle>
        <ArexCoreProvider theme={theme}>
          <Routes />
        </ArexCoreProvider>
      </GlobalStyle>
    </GlobalConfigProvider>
  );
};

export default App;

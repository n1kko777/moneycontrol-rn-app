import { useTheme, Layout, Button } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';

import { ScreenTemplate } from '../../components/ScreenTemplate';
import { Toolbar } from '../../components/navigation/Toolbar';
import { TagList } from '../../components/tag/TagList';
import { BackIcon } from '../../themes/icons';
import { ThemeContext } from '../../themes/theme-context';
import { THEME } from '../../themes/themes';

export const TagScreen = memo(({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const onNavigateToHome = useCallback(() => navigation.navigate('Home'), [navigation]);

  const onNavigateToCreateTag = useCallback(() => navigation.navigate('CreateTag'), [navigation]);

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title="Теги"
        TargetIcon={BackIcon}
        onTarget={onNavigateToHome}
      />
      <Layout
        style={{
          flex: 1,
          backgroundColor: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 200 : 900}`],
        }}>
        <View style={{ marginVertical: 20 }}>
          <Button
            style={{
              alignSelf: 'center',
              paddingHorizontal: 20,
              borderRadius: THEME.BUTTON_RADIUS,
            }}
            status="info"
            onPress={onNavigateToCreateTag}>
            Добавить тег
          </Button>
        </View>
        <Layout style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <TagList navigation={navigation} />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});

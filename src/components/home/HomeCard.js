import React, { memo, useCallback, useMemo } from 'react';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddSmallIcon, RightIcon } from '../../themes/icons';

import { ThemeContext } from '../../themes/theme-context';
import { HomeCardItem } from './HomeCardItem';

const { layoutStyle, viewStyle, otherViewStyle } = StyleSheet.create({
  layoutStyle: {
    borderRadius: 10,
    marginHorizontal: 8,
    marginTop: 15,
    marginBottom: 30,
    padding: 16,
    paddingTop: 8,
  },
  viewStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  otherViewStyle: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});

export const HomeCard = memo(({ item, navigation, isNavigate }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();
  const iconFillColor = kittenTheme[`color-primary-${themeContext.theme === 'light' ? 800 : 100}`];

  const titleNavigationHandler = useCallback(() => {
    navigation.navigate(item.navigate);
  }, [item.navigate, navigation]);

  const navigateToAll = useCallback(() => {
    navigation.navigate(item.navigate.replace('Create', ''));
  }, [item.navigate, navigation]);

  const renderAdditionalButton = useMemo(
    () =>
      isNavigate && (
        <TouchableOpacity
          style={{
            marginTop: 5,
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={titleNavigationHandler}
        >
          {item.navigate !== 'Operation' ? (
            <AddSmallIcon fill={iconFillColor} width={24} height={24} />
          ) : (
            <RightIcon fill={iconFillColor} width={30} height={30} />
          )}
        </TouchableOpacity>
      ),
    [iconFillColor, isNavigate, item.navigate, titleNavigationHandler],
  );

  const memoHomeCardItem = useMemo(
    () =>
      item.data.length !== 0 ? (
        item.data.map((elem) => (
          <HomeCardItem
            kittenTheme={kittenTheme}
            themeContext={themeContext}
            navigation={navigation}
            key={elem.last_updated}
            item={elem}
          />
        ))
      ) : (
        <Text>Список пуст</Text>
      ),
    [item.data, kittenTheme, navigation, themeContext],
  );

  const renderToallItems = useMemo(
    () =>
      isNavigate && (
        <TouchableOpacity onPress={navigateToAll}>
          <Text
            style={{
              fontWeight: 'bold',
              color: kittenTheme[`color-primary-${themeContext.theme === 'light' ? 800 : 100}`],
            }}
          >
            Смотреть все
          </Text>
        </TouchableOpacity>
      ),
    [isNavigate, kittenTheme, navigateToAll, themeContext.theme],
  );

  return (
    <Layout style={layoutStyle}>
      <View style={viewStyle}>
        <Text category="h5">{item.title}</Text>
        {renderAdditionalButton}
      </View>

      <View>{memoHomeCardItem}</View>
      <View style={otherViewStyle}>{renderToallItems}</View>
    </Layout>
  );
});

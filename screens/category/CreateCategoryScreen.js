import { Layout, TopNavigation, TopNavigationAction, Input, Button } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { View, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FlexibleView } from '../../components/FlexibleView';
import { ScreenTemplate } from '../../components/ScreenTemplate';
import { createCategoryAction } from '../../store/actions/apiAction';
import { clearCurrentCategory } from '../../store/actions/categoryAction';
import { getApiLoading } from '../../store/selectors';
import { BackIcon } from '../../themes/icons';
import { THEME } from '../../themes/themes';

export const CreateCategoryScreen = memo(({ route, navigation }) => {
  const prevItem = route.params;
  const dispatch = useDispatch();

  const [category_name, setCategoryName] = React.useState(
    prevItem !== undefined ? prevItem.category_name : ''
  );
  const navigateBack = useCallback(() => {
    if (prevItem === undefined) {
      dispatch(clearCurrentCategory());
    }

    navigation.goBack(null);
  }, [dispatch, navigation, prevItem]);

  const loader = useSelector(getApiLoading);

  const onReset = useCallback(() => {
    setCategoryName('');
    navigateBack();
  }, [navigateBack]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();
      dispatch(
        createCategoryAction(
          {
            category_name,
          },
          onReset
        )
      );
    }
  }, [category_name, dispatch, loader, onReset]);

  const BackAction = useCallback(
    () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />,
    [navigateBack]
  );

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  return (
    <ScreenTemplate>
      <FlexibleView>
        <TopNavigation title="Создание категории" alignment="center" accessoryLeft={BackAction} />
        <Layout
          style={{
            flex: 1,
            marginTop: 30,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '85%',
              maxWidth: 720,
              manrginBottom: 25,
            }}>
            <Input
              ref={inputRef}
              value={category_name}
              placeholder="Название категории"
              onChangeText={setCategoryName}
              autoCompleteType="name"
              style={{ marginVertical: 10 }}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}>
              Создать
            </Button>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});

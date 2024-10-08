import { Layout, TopNavigation, TopNavigationAction, Input, Button } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { View, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FlexibleView } from '../../components/FlexibleView';
import { ScreenTemplate } from '../../components/ScreenTemplate';
import { createTagAction } from '../../store/actions/apiAction';
import { getApiLoading } from '../../store/selectors';
import { BackIcon } from '../../themes/icons';
import { THEME } from '../../themes/themes';

export const CreateTagScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const [tag_name, setTagName] = React.useState('');

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const loader = useSelector(getApiLoading);

  const onReset = useCallback(() => {
    setTagName('');
    navigateBack();
  }, [navigateBack]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();

      dispatch(
        createTagAction(
          {
            tag_name,
          },
          onReset
        )
      );
    }
  }, [loader, dispatch, tag_name, onReset]);

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
        <TopNavigation title="Создание тега" alignment="center" accessoryLeft={BackAction} />
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
              value={tag_name}
              placeholder="Название тега"
              onChangeText={setTagName}
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

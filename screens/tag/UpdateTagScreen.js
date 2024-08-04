import { Layout, TopNavigation, TopNavigationAction, Input, Button } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { View, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FlexibleView } from '../../components/FlexibleView';
import { ScreenTemplate } from '../../components/ScreenTemplate';
import { updateTagAction } from '../../store/actions/apiAction';
import { getApiLoading } from '../../store/selectors';
import { BackIcon } from '../../themes/icons';
import { THEME } from '../../themes/themes';

export const UpdateTagScreen = memo(({ route, navigation }) => {
  const { tag } = route.params;

  const dispatch = useDispatch();

  const [tag_name, setTagName] = React.useState(tag.tag_name);

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const loader = useSelector(getApiLoading);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();
      dispatch(
        updateTagAction(
          {
            id: tag.id,
            tag_name,
          },
          navigateBack
        )
      );
    }
  }, [loader, dispatch, tag.id, tag_name, navigateBack]);

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
        <TopNavigation title="Обновление тега" alignment="center" accessoryLeft={BackAction} />
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
              Обновить
            </Button>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});

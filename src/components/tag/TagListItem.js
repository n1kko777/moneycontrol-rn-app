import React, { memo, useCallback } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { ListItem, Button, Text } from '@ui-kitten/components';

import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { DeleteIcon, TagIcon } from '../../themes/icons';
import { hideTagAction } from '../../store/actions/apiAction';

export const TagListItem = memo(({ item, navigation }) => {
  const dispatch = useDispatch();

  const swipeableRow = React.useRef(null);

  const close = useCallback(() => {
    swipeableRow.current.close();
  }, [swipeableRow]);

  const renderIconItem = useCallback((style) => <TagIcon {...style} />, []);

  const deleteHandler = useCallback(() => {
    close();
    Alert.alert(
      'Удаление тега',
      `Вы уверены, что хотите удалить тег ${item.tag_name}?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            dispatch(hideTagAction(item));
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  }, [close, dispatch, item]);

  const RightAction = useCallback(
    () => <Button onPress={deleteHandler} accessoryLeft={DeleteIcon} status="danger" />,
    [deleteHandler],
  );

  const updateHandler = useCallback(() => {
    navigation.navigate('UpdateTag', {
      tag: item,
    });
  }, [item, navigation]);

  const renderListTitle = useCallback(
    (evaProps) => (
      <Text {...evaProps} style={[evaProps.style, { fontSize: 16 }]}>
        {item.tag_name}
      </Text>
    ),
    [item.tag_name],
  );

  return (
    <Swipeable ref={swipeableRow} overshootRight={false} renderRightActions={RightAction}>
      <ListItem
        onPress={updateHandler}
        title={renderListTitle}
        accessoryLeft={renderIconItem}
        style={{
          paddingVertical: 15,
        }}
      />
    </Swipeable>
  );
});

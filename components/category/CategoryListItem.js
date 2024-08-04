import { ListItem, Button, Text } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch } from 'react-redux';

import { hideCategoryAction } from '../../store/actions/apiAction';
import { DeleteIcon, CategoryIcon } from '../../themes/icons';

export const CategoryListItem = memo(({ item, navigation }) => {
  const dispatch = useDispatch();

  const swipeableRow = React.useRef(null);

  const close = useCallback(() => {
    swipeableRow.current.close();
  }, [swipeableRow]);

  const renderIconItem = (style) => <CategoryIcon {...style} />;

  const deleteHandler = useCallback(() => {
    close();

    Alert.alert(
      'Удаление категории',
      `Вы уверены, что хотите удалить категорию ${item.category_name}?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            dispatch(hideCategoryAction(item));
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }, [close, dispatch, item]);

  const RightAction = useCallback(
    () => <Button onPress={deleteHandler} accessoryLeft={DeleteIcon} status="danger" />,
    [deleteHandler]
  );

  const updateHandler = useCallback(() => {
    navigation.navigate('UpdateCategory', {
      category: item,
    });
  }, [item, navigation]);

  const renderListTitle = useCallback(
    (evaProps) => (
      <Text {...evaProps} style={[evaProps.style, { fontSize: 16 }]}>
        {item.category_name}
      </Text>
    ),
    [item.category_name]
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

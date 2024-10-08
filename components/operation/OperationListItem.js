import { Text, Layout, useTheme, Button, Card } from '@ui-kitten/components';
import React, { memo, useCallback, useMemo } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { alert, splitToDigits, getAccountTitle } from 'utils';

import { setCurrentAccount } from '../../store/actions/accountAction';
import { hideOperationAction } from '../../store/actions/apiAction';
import { setCurrentCategory } from '../../store/actions/categoryAction';
import { getAccounts, getCategories, getTags } from '../../store/selectors';
import { DeleteIcon, CopyIcon } from '../../themes/icons';
import { ThemeContext } from '../../themes/theme-context';

export const OperationListItem = memo(({ item, navigation }) => {
  const dispatch = useDispatch();

  const swipeableRow = React.useRef(null);

  const close = useCallback(() => {
    swipeableRow.current.close();
  }, [swipeableRow]);

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const accounts = useSelector(getAccounts);
  const categories = useSelector(getCategories);
  const tags = useSelector(getTags);

  const deleteHandler = useCallback(() => {
    close();
    alert(
      'Удаление категории',
      `Вы уверены, что хотите удалить операцию?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            dispatch(hideOperationAction(item));
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }, [close, dispatch, item]);

  const copyHandler = useCallback(() => {
    close();
    const copyAccount = accounts.find(
      (accEl) => accEl.id === (item.account || item.from_account_id)
    );
    const copyCategory = categories.find((catEl) => catEl.id === item.category);
    dispatch(
      setCurrentAccount(
        copyAccount
          ? {
              title: getAccountTitle(copyAccount),
              id: copyAccount.id,
            }
          : null
      )
    );

    switch (item.type) {
      case 'transaction':
        dispatch(
          setCurrentCategory(
            copyCategory
              ? {
                  title: copyCategory.category_name,
                  id: copyCategory.id,
                }
              : null
          )
        );

        navigation.navigate('CreateTransaction', item);
        break;
      case 'action':
        dispatch(
          setCurrentCategory(
            copyCategory
              ? {
                  title: copyCategory.category_name,
                  id: copyCategory.id,
                }
              : null
          )
        );

        navigation.navigate('CreateAction', item);
        break;
      case 'transfer':
        if (!accounts.map((acc) => acc.id).includes(item.from_account_id)) {
          alert('Невозможно скопировать', `Вы не являетесь собственником операции.`);
        } else {
          navigation.navigate('CreateTransfer', item);
        }
        break;

      default:
        break;
    }
  }, [accounts, categories, close, dispatch, item, navigation]);

  const LeftAction = useCallback(
    () => <Button onPress={copyHandler} accessoryLeft={CopyIcon} status="info" />,
    [copyHandler]
  );

  const RightAction = useCallback(
    () => <Button onPress={deleteHandler} accessoryLeft={DeleteIcon} status="danger" />,
    [deleteHandler]
  );

  const renderCategory = useMemo(() => {
    if (item.category !== undefined) {
      if (categories.find((cat) => cat.id === item.category) !== undefined) {
        return categories.find((cat) => cat.id === item.category).category_name;
      }

      return 'Удалено';
    }

    return '';
  }, [categories, item.category]);

  const renderTag = useMemo(() => {
    const tagList = (
      item.tags
        ? item.tags.map((elTag) =>
            tags.find((tag) => tag.id === elTag)
              ? `#${tags.find((tag) => tag.id === elTag).tag_name}`
              : 'Удалено'
          )
        : ['']
    ).join(', ');

    return `${tagList.length > 17 ? `${tagList.substring(0, 17)}...` : tagList}`;
  }, [item.tags, tags]);

  return (
    <Swipeable
      ref={swipeableRow}
      overshootLeft={false}
      renderLeftActions={LeftAction}
      overshootRight={false}
      renderRightActions={RightAction}>
      <Card style={{ borderWidth: 0 }}>
        <Layout
          style={{
            marginHorizontal: -12,
            marginVertical: -12,
          }}>
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                flex: 1,
              }}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color:
                  kittenTheme[
                    item.style || `color-primary-${themeContext.theme === 'light' ? 800 : 100}`
                  ],
              }}>
              {`${splitToDigits(item.balance)} ₽`}
            </Text>
          </Layout>
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 700 : 600}`],
                flex: 1,
              }}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {renderCategory}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 700 : 600}`],
              }}>
              {renderTag}
            </Text>
          </Layout>
        </Layout>
      </Card>
    </Swipeable>
  );
});

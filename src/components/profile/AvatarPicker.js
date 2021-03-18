import React, { memo, useCallback } from "react";
import { Button, Image, View, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";
import DefaultIcon from "../../../assets/icon.png";

export const AvatarPicker = memo(({ isEdit, imageUrl, setImageUrl }) => {
  const getPermissionAsync = useCallback(async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert(
          "Доступ к камере",
          "Извините, нам нужны разрешения на фотопленку, чтобы это сработало!",
          [
            {
              text: "Отмена",
              style: "cancel",
            },
            {
              text: "Разрешить",
              onPress: () => {
                getPermissionAsync();
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      }
    }
  }, []);

  React.useEffect(() => {
    getPermissionAsync();
  }, [getPermissionAsync]);

  const pickImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImageUrl(result.uri);
      }
    } catch (E) {
      Alert.alert(
        "Произошла ошибка",
        "Что-то пошло не так, попробуйте еще раз.",
        [
          {
            text: "Отмена",
            style: "cancel",
          },
          {
            text: "Повторить",
            onPress: () => {
              pickImage();
            },
          },
        ],
        {
          cancelable: false,
        }
      );
    }
  }, [setImageUrl]);

  const clearImage = useCallback(() => {
    if (imageUrl !== null) {
      Alert.alert(
        "Удаление аватар",
        "Вы уверены, что хотите удалить аватар?",
        [
          {
            text: "Отмена",
            style: "cancel",
          },
          {
            text: "Удалить",
            onPress: () => {
              setImageUrl(null);
            },
          },
        ],
        {
          cancelable: false,
        }
      );
    }
  }, [imageUrl, setImageUrl]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={clearImage} disabled={!isEdit}>
        <Image
          source={
            imageUrl !== null
              ? {
                  uri: imageUrl,
                }
              : DefaultIcon
          }
          style={{ width: 150, height: 150, borderRadius: 75 }}
        />
      </TouchableOpacity>

      {isEdit && <Button title="Выбрать аватар" onPress={pickImage} />}
    </View>
  );
});

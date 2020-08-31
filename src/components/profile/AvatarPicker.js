import * as React from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";

export const AvatarPicker = ({ isEdit, imageUrl, setImageUrl }) => {
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert(
          "Извините, нам нужны разрешения на фотопленку, чтобы это сработало!"
        );
      }
    }
  };

  React.useEffect(() => {
    getPermissionAsync();
  }, []);

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImageUrl(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const clearImage = () => {
    imageUrl !== null &&
      Alert.alert(
        "Кдаление аватар",
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
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={clearImage}>
        <Image
          source={
            imageUrl !== null
              ? {
                  uri: imageUrl,
                }
              : require("../../../assets/icon.png")
          }
          style={{ width: 150, height: 150, borderRadius: 75 }}
        />
      </TouchableOpacity>

      {isEdit && <Button title="Выбрать аватар" onPress={_pickImage} />}
    </View>
  );
};

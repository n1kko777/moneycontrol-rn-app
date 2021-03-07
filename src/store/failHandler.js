import { Alert } from "react-native";

export default (error, ERROR_TYPE) => (dispatch) => {
  const errorObject = {};
  const regex = /(<([^>]+)>)/gi;

  if (error.response) {
    // The request was made and the server responded with a status code
    const keys = [];

    for (const k in error.response.data) keys.push(k);

    errorObject.title = `Код ошибки: ${error.response.status}`;
    errorObject.message =
      error.response.status === 404 ||
      error.response.status === 405 ||
      error.response.status === 500
        ? `${error.response.data
            .replace(regex, "\n")
            .replace("\n\n", "\n")
            .replace(/^\n/, "")
            .replace(/.\n$/, ".")}`
        : `${keys[0] === "detail" ? "" : keys.join(",") + ": "}${
            error.response.data[keys[0]]
          }`;
  } else if (error.request) {
    // The request was made but no response was received
    console.log("Не удалось соединиться с сервером. Повторите попытку позже.");

    errorObject.title = `Не удалось соединиться с сервером`;
    errorObject.message = `Повторите попытку позже`;
  } else if (error.custom) {
    // Something happened in setting up the request that triggered an Error
    console.log("Что-то пошло не так... Повторите попытку позже.");

    errorObject.title = error.custom.title;
    errorObject.message = error.custom.message;
  } else if (error.message) {
    errorObject.title = `Статус запроса`;
    errorObject.message = error.message;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Что-то пошло не так... Повторите попытку позже.");

    errorObject.title = `Что-то пошло не так...`;
    errorObject.message = `Повторите попытку позже`;
  }

  console.log(`${errorObject.title}: ${errorObject.message}`);

  dispatch({
    type: ERROR_TYPE,
    payload: error,
  });

  Alert.alert(
    errorObject.title,
    errorObject.message,
    [
      {
        text: "Закрыть",
        onPress: () => {
          dispatch({
            type: ERROR_TYPE,
            payload: null,
          });
        },
      },
    ],
    {
      cancelable: false,
    }
  );
};

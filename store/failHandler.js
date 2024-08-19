import { alert } from 'utils';

export default (error, ERROR_TYPE) => (dispatch) => {
  const errorObject = {};
  const regex = /(<([^>]+)>)/gi;

  if (error.response && error.response.status !== 503) {
    // The request was made and the server responded with a status code
    const keys = [...Object.keys(error.response.data)];

    errorObject.title = `Код ошибки: ${error.response.status}`;
    errorObject.message =
      error.response.status === 404 ||
      error.response.status === 405 ||
      error.response.status === 500
        ? `${error.response.data
            .replace(regex, '\n')
            .replace('\n\n', '\n')
            .replace(/^\n/, '')
            .replace(/.\n$/, '.')}`
        : `${keys[0] === 'detail' ? '' : `${keys.join(',')}: `}${error.response.data[keys[0]]}`;
  } else if (error.request) {
    // The request was made but no response was received
    errorObject.title = `Не удалось соединиться с сервером`;
    errorObject.message = `Повторите попытку позже`;
  } else if (error.custom) {
    // Something happened in setting up the request that triggered an Error
    errorObject.title = error.custom.title;
    errorObject.message = error.custom.message;
  } else if (error.message) {
    errorObject.title = `Статус запроса`;
    errorObject.message = error.message;
  } else {
    // Something happened in setting up the request that triggered an Error
    errorObject.title = `Что-то пошло не так...`;
    errorObject.message = `Повторите попытку позже`;
  }

  dispatch({
    type: ERROR_TYPE,
    payload: error,
  });

  alert(
    errorObject.title,
    errorObject.message,
    [
      {
        text: 'Закрыть',
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

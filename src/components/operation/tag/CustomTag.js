import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTagAction } from "../../../store/actions/apiAction";
import { CustomSearchWithSelect } from "../../../ui/CustomSearchWithSelect";

const RefCustomSearchWithSelect = React.forwardRef((props, ref) => {
  return <CustomSearchWithSelect {...props} forwardedRef={ref} />;
});

export const CustomTag = memo(({ tagData, tagList, setTagList }) => {
  const dispatch = useDispatch();
  const tagInput = React.useRef(null);

  const loader = useSelector((store) => store.api.loader);

  const onSuccess = (targetValue) => {
    if (tagInput.current !== null) {
      tagInput.current.focus();
      tagInput.current.inputRef.current.props.onChangeText(targetValue);
    }
  };

  const addTag = useCallback(() => {
    const value =
      tagInput.current !== null
        ? tagInput.current.inputRef.current.props.value
        : "";

    if (tagInput.current !== null) {
      tagInput.current.blur();
    }

    if (value.trim().length !== 0 && !loader) {
      dispatch(createTagAction({ tag_name: value })).then(() => {
        onSuccess(value);
      });
    }
  }, [tagInput.current]);

  return (
    <RefCustomSearchWithSelect
      datasets={tagData}
      dataList={tagList}
      setDataList={setTagList}
      placeholder="Укажите теги"
      enableCreate={true}
      onIconPress={addTag}
      onSubmitEditing={addTag}
      ref={tagInput}
    />
  );
});

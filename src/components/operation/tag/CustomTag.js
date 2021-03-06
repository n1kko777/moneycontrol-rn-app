import React, { memo, useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Layout, Text } from "@ui-kitten/components";

import { createTagAction } from "../../../store/actions/apiAction";

import { AddSmallIcon } from "../../../themes/icons";

import { TagItem } from "./TagItem";
import { PopoverPlacements } from "@ui-kitten/components/ui/popover/type";

export const CustomTag = memo(({ tagData, tagList, setTagList }) => {
  const dispatch = useDispatch();
  const tagInput = React.useRef(null);

  const store = useSelector((store) => store);
  const loader = store.api.loader;
  const { tags } = store.tag;

  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState(tagData);

  const onChangeText = (query) => {
    setValue(query);
    setData(
      tagData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const onSelect = ({ title }) => {
    onChangeText("");

    tagList.find((el) => el.title === title) === undefined &&
      setTagList([...tagList, data.find((el) => el.title === title)]);
  };

  const addTag = useCallback(() => {
    tagInput.current.blur();

    if (tags.map((el) => el.tag_name).includes(value)) {
      onSelect({ title: value });
    } else if (value.trim().length !== 0 && !loader) {
      dispatch(createTagAction({ tag_name: value }));
    } else {
      onChangeText("");
    }
  }, [value]);

  const deleteTag = useCallback(
    (text) => {
      setTagList(tagList.filter((el) => el.title !== text));
    },
    [tagList]
  );

  React.useEffect(() => {
    setData(
      tagData.filter((el) => !tagList.map((tag) => tag.id).includes(el.id))
    );
  }, [tagList]);

  React.useEffect(() => {
    if (tags.find((el) => el.tag_name === value) !== undefined) {
      setTagList([
        ...tagList,
        {
          id: tags.find((el) => el.tag_name === value).id,
          title: tags.find((el) => el.tag_name === value).tag_name,
        },
      ]);

      onChangeText("");
    }
  }, [tags]);

  return (
    <Layout style={styles.container}>
      <Autocomplete
        placeholder="Укажите теги"
        value={value}
        data={data}
        onChangeText={onChangeText}
        onSelect={onSelect}
        icon={value.trim().length !== 0 && AddSmallIcon}
        onIconPress={addTag}
        onSubmitEditing={addTag}
        ref={tagInput}
        placement={PopoverPlacements.TOP}
      />
      <ScrollView
        style={{
          maxHeight: 108,
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {tagList.map((el) => (
            <TagItem
              deleteTag={() => deleteTag(el.title)}
              key={el.id}
              text={el.title}
            />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

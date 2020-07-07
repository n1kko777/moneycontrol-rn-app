import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Autocomplete, Layout, Text } from "@ui-kitten/components";
import { AddSmallIcon } from "../../../themes/icons";
import { TagItem } from "./TagItem";
import { View, Keyboard } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { createTag } from "../../../store/actions/tagAction";
import { startLoader, endLoader } from "../../../store/actions/apiAction";

export const CustomTag = ({ tagData, tagList, setTagList }) => {
  const dispatch = useDispatch();
  const { tags } = useSelector((store) => store.tag);
  const tagInput = React.createRef();

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(tagData);

  const onSelect = ({ title }) => {
    onChangeText("");
    tagList.find((el) => el.title === title) === undefined &&
      setTagList([...tagList, tagData.find((el) => el.title === title)]);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(
      tagData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const addTag = async () => {
    tagInput.current.blur();
    if (value.trim().length !== 0) {
      dispatch(startLoader());

      try {
        await dispatch(
          createTag({
            tag_name: value,
          })
        );
      } catch (error) {}
      dispatch(endLoader());
    } else {
      onChangeText("");
    }
  };

  const deleteTag = (text) => {
    setTagList(tagList.filter((el) => el.title !== text));
  };

  React.useEffect(() => {
    if (tags.find((el) => el.tag_name === value) !== undefined) {
      setTagList([
        ...tagList,
        {
          index: tagList.length,
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
        icon={AddSmallIcon}
        onIconPress={addTag}
        onSubmitEditing={addTag}
        ref={tagInput}
      />

      <ScrollView
        style={{
          maxHeight: 108,
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {tagList.map((el, index) => (
            <TagItem deleteTag={deleteTag} key={index} text={el.title} />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

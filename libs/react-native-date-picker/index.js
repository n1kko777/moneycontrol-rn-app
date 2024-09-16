/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  picker: {
    flexDirection: 'row',
    width: '100%',
  },
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  scroll: {
    width: '100%',
  },
  digit: {
    fontSize: 20,
    textAlign: 'center',
  },
  mark: {
    position: 'absolute',
    borderRadius: 10,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
  },
});

const hex2rgba = (hex, alpha) => {
  hex = hex.replace('#', '');

  const r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
  const g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
  const b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getOrder = (format, date, days, months, years) =>
  (format || 'dd-mm-yyyy').split('-').map((type, index) => {
    switch (type) {
      case 'dd':
        return { name: 'day', digits: days, value: date.getDate() };
      case 'mm':
        return { name: 'month', digits: months, value: date.getMonth() + 1 };
      case 'yyyy':
        return { name: 'year', digits: years, value: date.getFullYear() };
      default:
        console.warn(
          `Invalid date picker format prop: found "${type}" in ${format}. Please read documentation!`
        );
        return {
          name: ['day', 'month', 'year'][index],
          digits: [days, months, years][index],
          value: [date.getDate(), date.getMonth() + 1, date.getFullYear()][index],
        };
    }
  });

const DatePicker = ({
  value,
  onChange,
  height,
  width,
  fontSize,
  textColor,
  startYear,
  endYear,
  markColor,
  markHeight,
  markWidth,
  fadeColor,
  format,
}) => {
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const end = endYear || new Date().getFullYear();
    const start = !startYear || startYear > end ? end - 100 : startYear;

    const _days = [...Array(31)].map((_, index) => index + 1);
    const _months = [...Array(12)].map((_, index) => index + 1);
    const _years = [...Array(end - start + 1)].map((_, index) => start + index);

    setDays(_days);
    setMonths(_months);
    setYears(_years);
  }, [endYear, startYear]);

  const pickerHeight = Math.round(height || Dimensions.get('window').height / 3.5);

  const unexpectedDate = new Date(years[0], 0, 1);
  const date = new Date(value || unexpectedDate);

  const changeHandle = (type, digit) => {
    switch (type) {
      case 'day':
        date.setDate(digit);
        break;
      case 'month':
        date.setMonth(digit - 1);
        break;
      case 'year':
        date.setFullYear(digit);
        break;
      default:
        break;
    }

    onChange(date);
  };

  return (
    <View style={[styles.picker, { height, width }]}>
      {getOrder(format, date, days, months, years).map((el, index) => (
        <DateBlock
          digits={el.digits}
          value={el.value}
          onChange={changeHandle}
          height={pickerHeight}
          fontSize={fontSize}
          textColor={textColor}
          markColor={markColor}
          markHeight={markHeight}
          markWidth={markWidth}
          fadeColor={fadeColor}
          type={el.name}
          key={index}
        />
      ))}
    </View>
  );
};

const DateBlock = ({
  value,
  digits,
  type,
  onChange,
  height,
  fontSize,
  textColor,
  markColor,
  markHeight,
  markWidth,
  fadeColor,
}) => {
  const dHeight = Math.round(height / 4);

  const mHeight = markHeight || Math.min(dHeight, 65);
  const mWidth = markWidth || '70%';

  const fadeFilled = hex2rgba(fadeColor || '#ffffff', 1);
  const fadeTransparent = hex2rgba(fadeColor || '#ffffff', 0);

  const scrollRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current.scrollTo({
        y: dHeight * (value - digits[0]),
        animated: true,
      });
    }, 100);
  }, [dHeight, digits, value]);

  const handleChange = ({ nativeEvent }) => {
    const digit = nativeEvent.contentOffset.y / dHeight + digits[0];

    if (Number.isInteger(digit)) {
      onChange(type, digit);
    }
  };

  return (
    <View style={styles.block}>
      <View
        style={[
          styles.mark,
          {
            top: (height - mHeight) / 2,
            backgroundColor: markColor || 'rgba(0, 0, 0, 0.05)',
            height: mHeight,
            width: mWidth,
          },
        ]}
      />
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        snapToInterval={dHeight}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={0}
        onScroll={handleChange}>
        {digits.map((elValue, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              scrollRef.current.scrollTo({
                y: dHeight * index,
                animated: true,
              });
            }}>
            <Text
              style={[
                styles.digit,
                {
                  fontSize: fontSize || 22,
                  color: textColor || '#000000',
                  marginBottom: index === digits.length - 1 ? height / 2 - dHeight / 2 : 0,
                  marginTop: index === 0 ? height / 2 - dHeight / 2 : 0,
                  lineHeight: dHeight,
                  height: dHeight,
                },
              ]}>
              {elValue}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <LinearGradient
        style={[styles.gradient, { bottom: 0, height: height / 4 }]}
        colors={[fadeTransparent, fadeFilled]}
        pointerEvents="none"
      />
      <LinearGradient
        style={[styles.gradient, { top: 0, height: height / 4 }]}
        colors={[fadeFilled, fadeTransparent]}
        pointerEvents="none"
      />
    </View>
  );
};

export default DatePicker;

import React from "react";
import { View } from "react-native";
import { TrComponent } from "./TrComponent";
import { TdComponent } from "./TdComponent";
import { TableIconComponent } from "./TableIconComponent";
import { ProfileIcon, PriceIcon, CalendarIcon } from "../../themes/icons";
import moment from "moment";
import { splitToDigits } from "../../splitToDigits";

export const TableComponent = ({ colorTheme, tableData, accountData }) => {
  return (
    <View style={{ marginVertical: 20 }}>
      <TrComponent>
        <TableIconComponent IconName={ProfileIcon} colorTheme={colorTheme} />
        <TableIconComponent IconName={CalendarIcon} colorTheme={colorTheme} />
        <TableIconComponent IconName={PriceIcon} colorTheme={colorTheme} />
      </TrComponent>

      {[...tableData]
        .reduce((arr, next) => {
          next.forEach((elem) => {
            if (
              arr.some(
                (arV) =>
                  arV.account == elem.account &&
                  arV.month == moment(elem.last_updated).format("MMM")
              )
            ) {
              arr.find(
                (arV) =>
                  arV.account == elem.account &&
                  arV.month == moment(elem.last_updated).format("MMM")
              ).sum += +elem.transaction_amount;
            } else {
              arr.push({
                account: elem.account,
                month: moment(elem.last_updated).format("MMM"),
                sum: +elem.transaction_amount,
              });
            }
          });
          return arr;
        }, [])
        .map((elem, index) => (
          <TrComponent key={index}>
            <TdComponent
              text={
                accountData.find((acc) => acc.id == elem.account) !== undefined
                  ? accountData.find((acc) => acc.id == elem.account).text
                  : ""
              }
            />
            <TdComponent text={elem.month} />
            <TdComponent text={splitToDigits(parseFloat(elem.sum) / 1000)} />
          </TrComponent>
        ))}
    </View>
  );
};

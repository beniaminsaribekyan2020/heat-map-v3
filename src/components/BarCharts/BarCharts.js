import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  POSITIVE_COLOR,
  MAIN_FORE_COLOR,
  NEGATIVE_COLOR,
  SUB_FORE_COLOR,
  LABEL_COLOR
} from "@colors";
import { tempData } from "@services/tempData";
import { WINDOW_WIDTH, FONT_FAMILY } from "@constants";
import Panel from "@components/Panel/Panel";
import { getScale } from "@utils";

class BarCharts extends Component {
  state = {
    currencyArray: tempData
  };

  componentDidMount() {
    this.updateData();
    this.refreshTimer = setInterval(() => {
      this.updateData();
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTimer);
  }

  updateData = () => {
    const newCurrencyArray = tempData.map(item => {
      return {
        title: item.title,
        up: (item.up * 4 + Math.random() * 100) * 0.2,
        down: (item.down * 4 + Math.random() * 100) * 0.2,
        value: (item.value * 4 + Math.random() * 100) * 0.2
      };
    });
    this.setState({ currencyArray: newCurrencyArray });
  };

  render() {
    const { title, heightCount } = this.props;
    const { currencyArray } = this.state;
    const { width, height } = getScale(1, heightCount);

    return (
      <Panel label={title} width={width} height={height}>
        <View style={styles.barContainer}>
          {currencyArray.map(data => {
            const isMax = data.title === "CAD";
            const isMin = data.title === "AUD";

            return (
              <View key={data.title} style={styles.barWithPercent}>
                <Text
                  style={[
                    styles.capLabel,
                    isMax && styles.greenColor,
                    isMin && styles.redColor
                  ]}
                >
                  {data.value.toFixed(1)}%
                </Text>
                <View style={{ flex: data.value * 0.01 }}>
                  <View
                    style={[
                      styles.singleBar,
                      isMax && styles.maxBar,
                      isMin && styles.minBar
                    ]}
                  />
                </View>
                <Text style={styles.bottomLabel}>{data.title}</Text>
              </View>
            );
          })}
        </View>
      </Panel>
    );
  }
}

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: "space-between"
  },
  barWithPercent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capLabel: {
    color: MAIN_FORE_COLOR,
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    marginBottom: 5
  },
  chartLabel: {
    flex: 0.5
  },
  bottomLabel: {
    color: LABEL_COLOR,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
    fontFamily: FONT_FAMILY
  },
  singleBar: {
    flex: 1,
    backgroundColor: LABEL_COLOR,
    width: WINDOW_WIDTH / 16
  },
  minBar: {
    backgroundColor: NEGATIVE_COLOR
  },
  maxBar: {
    backgroundColor: POSITIVE_COLOR
  },
  redColor: {
    color: NEGATIVE_COLOR
  },
  greenColor: {
    color: POSITIVE_COLOR
  }
});

export default BarCharts;

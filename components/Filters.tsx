import { Colors } from "@/theme/color";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Filters = () => {
  const filters = ["Personal", "Shared", "Activity"];
  const [selected, setSelected] = useState(0);
  return (
    <View style={styles.conatiner}>
      <View style={styles.listFilters}>
        {filters.map((item, index) => (
          <Pressable onPress={() => setSelected(index)} key={index}>
            <Text
              style={{
                backgroundColor: selected === index ? "#dedfe0" : Colors.text,
                padding: 10,
                margin: 5,
                borderRadius: 20,
              }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  listFilters: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    backgroundColor: Colors.text,
    borderRadius: 40,
  },
});

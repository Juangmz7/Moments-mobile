import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from "react-native";
import { FilterTag } from "@/domain/model/enums/filter_tag";

export type FilterOption = {
  tag: FilterTag;
  label: string;
  render: () => React.ReactNode;
};

interface Props {
  options: FilterOption[];
  selectedTag: FilterTag | null;
  onSelect: (render: () => React.ReactNode, tag: FilterTag) => void;
}

function FilterGlyph({
  color = "#FFFFFF",
  barHeight = 2,
  gap = 3,
  widths = [14, 10, 6],
}: {
  color?: string;
  barHeight?: number;
  gap?: number;
  widths?: [number, number, number] | number[];
}) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {widths.map((w, i) => (
        <View
          key={i}
          style={{
            width: w,
            height: barHeight,
            borderRadius: barHeight,
            backgroundColor: color,
            marginTop: i === 0 ? 0 : gap,
          }}
        />
      ))}
    </View>
  );
}

export default function DropdownButtonFilter({
  options,
  selectedTag,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <View>
      {/* Trigger: round blue button with white glyph */}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={styles.triggerIcon}
        activeOpacity={0.85}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <FilterGlyph color="#FFFFFF" barHeight={2} gap={3} widths={[14, 10, 6]} />
      </TouchableOpacity>

      {/* Dropdown overlay */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={close}>
          <TouchableWithoutFeedback>
            <View style={styles.menuWrapper}>
              <View style={styles.menuCard}>
                <FlatList
                  data={options}
                  keyExtractor={(item) => String(item.tag)}
                  renderItem={({ item }) => {
                    const active = item.tag === selectedTag;
                    return (
                      <TouchableOpacity
                        style={[styles.itemRow, active && styles.itemRowActive]}
                        onPress={() => {
                          onSelect(item.render, item.tag);
                          close();
                        }}
                      >
                        <Text style={[styles.itemText, active && styles.itemTextActive]}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const MENU_WIDTH = 150;

const styles = StyleSheet.create({
  // Blue circular trigger; white glyph inside
  triggerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#007AFF",
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  // overlay
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    paddingHorizontal: 20,
    paddingTop: 100,
  },

  menuWrapper: {
    alignItems: "flex-end",
  },

  menuCard: {
    width: MENU_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  itemRow: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemRowActive: {
    backgroundColor: "#007AFF12",
    borderRadius: 20,
  },

  itemText: { color: "#222", fontSize: 16, textAlign: "center" },
  itemTextActive: { color: "#007AFF", fontWeight: "700", textAlign: "center" },
  separator: { height: 6 },
});

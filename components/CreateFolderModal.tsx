import { Colors } from "@/theme/color";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => void;
};
export default function CreateFolderModal({
  visible,
  onClose,
  onCreate,
}: Props) {
  const [folderName, setFolderName] = useState("");

  const handleCreate = () => {
    if (!folderName.trim()) return;
    onCreate(folderName.trim());
    setFolderName("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Overlay */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            {/* Modal Box */}
            <TouchableWithoutFeedback>
              <View style={styles.modal}>
                {/* Title */}
                <Text style={styles.title}>New Folder</Text>

                {/* Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Folder name"
                  placeholderTextColor={Colors.muted}
                  value={folderName}
                  onChangeText={setFolderName}
                  autoFocus
                  onSubmitEditing={handleCreate}
                />

                {/* Buttons */}
                <View style={styles.btnRow}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.createBtn,
                      !folderName.trim() && styles.createBtnDisabled,
                    ]}
                    onPress={handleCreate}
                    disabled={!folderName.trim()}
                  >
                    <Text style={styles.createText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 24,
    width: 300,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.blackText,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: Colors.blackText,
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  cancelText: {
    color: Colors.blackText,
    fontSize: 15,
  },
  createBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  createBtnDisabled: {
    opacity: 0.5,
  },
  createText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
});

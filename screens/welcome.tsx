import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { navigation } from "../types/RootStackParamList";
interface IProps {
    navigation: navigation<"Pass">;
}
const Welcome = ({ navigation }: IProps) => {
    const [password, setPassword] = useState<string>("");

    const [rePassword, setRePassword] = useState<string>("");

    const handleSetPassword = async () => {
        if (rePassword !== password) {
            Alert.alert("Lỗi", "Mật khẩu nhập lại không trùng khớp");
        } else {
            await AsyncStorage.setItem("auth", JSON.stringify(password));
            alert("Đặt mật khẩu thành công ");
            navigation.replace("Pass");
        }
    };
    return (
        <ImageBackground
            style={styles.container}
            source={require("../assets/img/4.jpg")}
        >
            <Text style={styles.txt}>Welcome to fist use</Text>
            <Text style={{ textAlign: "center", color: "#fff" }}>
                Setting your password
            </Text>

            <TextInput
                value={password}
                style={styles.input}
                placeholder="Password"
                onChangeText={(e) => setPassword(e)}
            />
            <TextInput
                value={rePassword}
                style={styles.input}
                placeholder="Repassword"
                onChangeText={(e) => setRePassword(e)}
            />
            <TouchableOpacity
                disabled={!rePassword.trim().length || !password.trim().length}
                style={styles.btn}
                activeOpacity={0.8}
                onPress={handleSetPassword}
            >
                <AntDesign name="check" size={24} color="#fff" />
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    txt: {
        fontSize: 30,
        color: "#fff",
        textShadowColor: "rgba(0, 0, 0, 0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    input: {
        height: 45,
        width: "50%",
        borderWidth: 1,
        borderColor: "#FEF1E6",
        borderRadius: 20,
        padding: 15,
        marginTop: 20,
        fontSize: 14,
        color: "#f1f1f1",
        fontWeight: "bold",
        textAlign: "center",
    },
    btn: {
        marginTop: 20,
        width: "20%",
        height: 50,
        backgroundColor: "#FF7777",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
});

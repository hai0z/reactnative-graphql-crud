import React, { useContext, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AppContext } from "../context/AppProvider";
import { navigation } from "../types/RootStackParamList";
interface IProps {
    navigation: navigation<"Pass">;
}

const Pass: React.FC<IProps> = ({ navigation }) => {
    const { password } = useContext(AppContext);

    const [input, setInput] = useState<string>("");

    const [error, setError] = useState<string>("");

    const handleAuth = () => {
        password != input ? navigation.navigate("Home") : setError("sai mk");
    };

    useEffect((): any => {
        const a = setTimeout(() => setError(""), 3000);
        return () => clearTimeout(a);
    }, [error]);

    return (
        <ImageBackground
            style={styles.imageBg}
            resizeMode="cover"
            source={require("../assets/img/2.jpg")}
        >
            <StatusBar />

            <Text style={styles.txt}>Secret App</Text>
            <TextInput
                secureTextEntry={true}
                value={input}
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#f1f1f1"
                onChangeText={(e) => setInput(e)}
            />
            <Text>{error}</Text>
            <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={handleAuth}>
                <AntDesign name="arrowright" size={24} color="#fff" />
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default Pass;

const styles = StyleSheet.create({
    imageBg: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
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

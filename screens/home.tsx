import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { getBooks, IBookData } from "../graphql/queries";
const Home = () => {
    const { loading, error, data } = useQuery<IBookData>(getBooks);

    return (
        <View style={styles.container}>
            <FlatList
                data={data?.books}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

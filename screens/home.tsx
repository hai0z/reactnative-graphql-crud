import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { getBooks, IBookData, IBook, getAuthors, IAuthor, IAuthorData } from "../graphql/queries";
import { Picker } from "@react-native-picker/picker";
import { addBook, deleteBook } from "../graphql/mutations";
const { width } = Dimensions.get("window");

const BookItem = ({ item, onDelete }: { item: IBook; onDelete: (id: string) => void }) => {
    return (
        <View
            style={{
                backgroundColor: "#1C658C",
                padding: 15,
                height: 200,
                width: width / 2 - 10,
                marginHorizontal: 5,
                borderRadius: 5,
                marginVertical: 5,
            }}
        >
            <Text style={styles.bookName}>{item.name}</Text>
            <Text style={styles.bookName}>{item.genre}</Text>
            <Text style={styles.bookName}>{item.author.name}</Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                    alignItems: "flex-end",
                }}
            >
                <TouchableOpacity style={styles.updateBtn}>
                    <Text style={styles.btnText}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.delBtn} onPress={() => onDelete(item._id)}>
                    <Text style={styles.btnText}>Xoá</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const Home = () => {
    const { data } = useQuery<IBookData>(getBooks);

    const author = useQuery<{ authors: IAuthor[] }>(getAuthors);

    const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(
        author.data?.authors[0].name
    );

    const [newBook, setNewBook] = useState({
        name: "",
        genre: "",
        authorId: selectedAuthor,
    });

    const [addBookMutation] = useMutation(addBook);
    const [deleteBookMutation] = useMutation(deleteBook);
    const handleAddBook = () => {
        const { name, genre, authorId } = newBook;
        addBookMutation({
            variables: {
                name,
                genre,
                authorId,
            },
            refetchQueries: [{ query: getBooks }],
        });
        setNewBook({
            name: "",
            genre: "",
            authorId: selectedAuthor,
        });
    };
    const deleteBookHandle = (id: string) => {
        deleteBookMutation({
            variables: {
                id,
            },
            refetchQueries: [{ query: getBooks }],
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.homeText}>Books</Text>
            </View>
            <View style={styles.addBook}>
                <Text style={styles.bookName}>Tên sách</Text>
                <TextInput
                    value={newBook.name}
                    style={styles.input}
                    placeholder="Tên sách"
                    placeholderTextColor={"#aaa"}
                    onChangeText={(e) => setNewBook({ ...newBook, name: e })}
                />
                <Text style={styles.bookName}>Thể loại</Text>
                <TextInput
                    value={newBook.genre}
                    style={styles.input}
                    placeholder="Thể loại"
                    placeholderTextColor={"#aaa"}
                    onChangeText={(e) => setNewBook({ ...newBook, genre: e })}
                />
                <Text style={styles.bookName}>Tác giả</Text>

                <View style={styles.pickerBoxInner}>
                    <Picker
                        style={{ color: "#fff" }}
                        selectedValue={selectedAuthor}
                        onValueChange={(itemValue) => {
                            setNewBook({ ...newBook, authorId: itemValue });
                            setSelectedAuthor(itemValue);
                        }}
                    >
                        {author?.data?.authors?.map((item) => (
                            <Picker.Item label={item.name} value={item._id} key={item._id} />
                        ))}
                    </Picker>
                </View>
                <TouchableOpacity style={styles.btnAdd} onPress={handleAddBook}>
                    <Text style={{ color: "#fff" }}>Thêm</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                contentContainerStyle={{ justifyContent: "space-between" }}
                numColumns={2}
                data={data?.books}
                renderItem={({ item }) => <BookItem item={item} onDelete={deleteBookHandle} />}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "steelblue",
    },
    nav: {
        height: 60,
        backgroundColor: "#1C658C",
        padding: 15,
    },
    homeText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    input: {
        height: 40,
        width: "80%",
        borderWidth: 1,
        borderColor: "#FEF1E6",
        borderRadius: 20,
        fontSize: 14,
        color: "#f1f1f1",
        fontWeight: "bold",
        textAlign: "center",
    },
    bookName: {
        color: "#fff",
        marginBottom: 5,
    },
    addBook: {
        marginHorizontal: 10,
        marginVertical: 10,
    },

    pickerBoxInner: {
        borderWidth: 0.6,
        borderColor: "#fff",
        borderRadius: 2,
        height: 37,
        justifyContent: "center",
        width: "80%",
    },
    btnAdd: {
        width: "80%",
        height: 40,
        backgroundColor: "#1C658C",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        borderRadius: 5,
    },
    updateBtn: {
        width: "30%",
        height: 50,
        backgroundColor: "#FFC300",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    delBtn: {
        width: "30%",
        height: 50,
        backgroundColor: "#FF1818",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    btnText: {
        color: "#fff",
    },
});

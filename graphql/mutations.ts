import { gql } from "@apollo/client";

const addBook = gql`
    mutation addBook($name: String!, $genre: String!, $authorId: String!) {
        createBook(name: $name, genre: $genre, authorId: $authorId) {
            _id
            name
            genre
        }
    }
`;
const deleteBook = gql`
    mutation deleteBook($id: String!) {
        deleteBook(id: $id) {
            _id
        }
    }
`;
export { addBook, deleteBook };

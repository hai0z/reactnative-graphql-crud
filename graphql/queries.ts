import { gql } from "@apollo/client";
interface IBook {
    _id: string;
    name: string;
    genre: string;
    author: {
        _id: string;
        name: string;
        age: number;
    };
}
interface IAuthor {
    _id: string;
    name: string;
    age: number;
    books: IBook[];
}
interface IBookData {
    books: IBook[];
}
interface IAuthorData {
    authors: IAuthor[];
}
const getBooks = gql`
    query getBooksQuery {
        books {
            _id
            name
            genre
            author {
                _id
                name
                age
            }
        }
    }
`;
const getAuthors = gql`
    query getAuthorsQuery {
        authors {
            _id
            name
            age
        }
    }
`;
export { getBooks, getAuthors, IBook, IBookData, IAuthor, IAuthorData };

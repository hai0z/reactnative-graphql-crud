import { gql } from "@apollo/client";

interface IBook {
    id: string;
    name: string;
    genre: string;
    author: {
        name: string;
    };
}

interface IBookData {
    books: IBook[];
}

const getBooks = gql`
    query getBooksQuery {
        books {
            id
            name
            genre
            author {
                name
            }
        }
    }
`;

export { getBooks, IBook, IBookData };

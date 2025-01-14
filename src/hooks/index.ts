// hooks/index.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users';
const HASHNODE_API_URL = 'https://api.hashnode.com';

// Fetch GitHub repositories
const fetchRepositories = async (username: string) => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/${username}/repos`);

        return response.data
            .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 4);
    } catch (error) {
        throw new Error(`${error} Cannot Fetch Posts`);
    }

}

export const useRepositories = (username: string) =>
    useQuery({
        queryKey: ["repositories", username],
        queryFn: () => fetchRepositories(username),
    });


// Fetch Hashnode articles
const query = `
    query GetUserArticles($page: Int!) {
        user(username: "BlakeYeboah") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                    coverImage
                }
            }
        }
    }
`;

const variables = { page: 0 };


const fetchArticles = await fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query,
        variables,
    }),
});



// const fetchArticles = async () => {
//     try {
//         const response = await fetch(HASHNODE_API_URL, {
//             method: 'POST',
//             mode: 'no-cors',
//             body: JSON.stringify({
//                 query: `{
//                 user(username: "DameTechie") {
//                   publication {
//                     posts(page: 0) {
//                       title
//                       brief
//                       slug
//                       coverImage
//                       dateAdded
//                       totalReactions
//                     }
//                   }
//                 }
//               }`,
//             }),
//         });

//         console.log('articles', response)
//         return response
//     } catch (error) {
//         throw new Error(`${error}Cannot Fetch Posts`);
//     }
// };

export const useArticles = () =>
    useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
    });

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users';

interface GitHubRepository {
    created_at: string;
    name: string;
}

// interface HashnodeBlogPost {
//     title: string
//     brief: string
//     slug: string
//     dateAdded: string
// }

// Fetch GitHub repositories
const fetchRepositories = async (username: string): Promise<GitHubRepository[]> => {
    try {
        const response = await axios.get<GitHubRepository[]>(`${GITHUB_API_URL}/${username}/repos`);

        return response.data
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 4);
    } catch (error) {
        throw new Error(`Failed to fetch repositories: ${error instanceof Error ? error.message : String(error)} `);
    }
}

export const useRepositories = (username: string) =>
    useQuery({
        queryKey: ["repositories", username],
        queryFn: () => fetchRepositories(username),
    });
// GraphQL query for Hashnode
// const GET_USER_ARTICLES = `
//   query GetUserArticles($page: Int!, $username: String!) {
//     user(username: $username) {
//       publication {
//             posts(page: $page) {
//                 title
//                 brief
//                 slug
//                 dateAdded
//             }
//         }
//     }
// }
// `

// // Fetch Hashnode blog posts
// const fetchHashnodeBlogs = async (username: string): Promise<HashnodeBlogPost[]> => {
//     try {
//         const response = await axios.post(
//             `${HASHNODE_API_URL}`,
//             {
//                 query: GET_USER_ARTICLES,
//                 variables: { page: 0, username },
//             },
//             {

//                 headers: {
//                     Authorization: Secret_KEY,
//                     "Content-Type": "application/json",

//                 },
//             },
//         )

//         const posts = response.data
//         console.log('data here', response)
//         return posts.slice(0, 4)
//     } catch (error) {
//         throw new Error(`Failed to fetch Hashnode blogs: ${error instanceof Error ? error.message : String(error)} `)
//     }
// }



// export const useHashnodeBlogs = (username: string) =>
//     useQuery({
//         queryKey: ["hashnodeBlogs", username],
//         queryFn: () => fetchHashnodeBlogs(username),
//     })

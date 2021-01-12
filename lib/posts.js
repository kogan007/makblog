
import path from 'path'

import axios from 'axios';

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData() {
  // Get file names under /posts
  const allPosts = []
  const posts = await axios.get("https://makdigitaldesign.com/wp-json/wp/v2/posts?per_page=100");
  

  const allPostsData = posts.data.map(post => {
    // Remove ".md" from file name to get id
    const id = post.id


    const fileContents = post;

 
    
    // Combine the data with the id
    return {
      id,
      fileContents
    }
  })
  
  return allPostsData;
}

export async function getAllPostIds() {
  const res = await axios.get("https://makdigitaldesign.com/wp-json/wp/v2/posts?per_page=100")

  return res.data.map(post => {
    return {
      params: {
        id: post.id.toString()
      }
    }
  })
}

export async function getPostData(id) {
  // const fullPath = path.join(postsDirectory, `${id}.md`)
  // const fileContents = fs.readFileSync(fullPath, 'utf8')

  // // Use gray-matter to parse the post metadata section
  // const matterResult = matter(fileContents)

  // // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //   .use(html)
  //   .process(matterResult.content)
  // const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  const response = await axios.get( `https://makdigitaldesign.com/wp-json/wp/v2/posts?per_page=100` )
  
  const foundPost = response.data.find(post => post.id === parseInt(id))
  
  return {
    id,
    contentHtml: foundPost
  }
}

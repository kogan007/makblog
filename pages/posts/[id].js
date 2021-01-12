import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'

import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
  
  return (
    <Layout>
      <Head>
        <title>{postData.contentHtml.title.rendered}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.contentHtml.title.rendered}</h1>
        <div className={utilStyles.lightText}>
          
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml.content.rendered }} />
      </article>
    </Layout>

  )
}

export async function getStaticPaths() {
  const paths = await getAllPostIds()
  
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

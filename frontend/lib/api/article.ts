import axios from 'axios'

import { SERVER_BASE_URL } from 'lib/utils/constant'
import { getQuery } from 'lib/utils/getQuery'

const ArticleAPI = {
  all: (page: any, limit = 10) =>
    axios.get(`${SERVER_BASE_URL}/articles?${getQuery(limit, page)}`),

  byAuthor: (author: any, page = 0, limit = 5) =>
    axios.get(
      `${SERVER_BASE_URL}/articles?author=${encodeURIComponent(
        author,
      )}&${getQuery(limit, page)}`,
    ),

  byTag: (tag: any, page = 0, limit = 10) =>
    axios.get(
      `${SERVER_BASE_URL}/articles?tag=${encodeURIComponent(tag)}&${getQuery(
        limit,
        page,
      )}`,
    ),

  delete: (id: any, token: any) =>
    axios.delete(`${SERVER_BASE_URL}/articles/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  favorite: (slug: any) =>
    axios.post(`${SERVER_BASE_URL}/articles/${slug}/favorite`),

  favoritedBy: (author: any, page: any) =>
    axios.get(
      `${SERVER_BASE_URL}/articles?favorited=${encodeURIComponent(
        author,
      )}&${getQuery(10, page)}`,
    ),

  feed: (page: any, limit = 10) =>
    axios.get(`${SERVER_BASE_URL}/articles/feed?${getQuery(limit, page)}`),

  get: (slug: any) => axios.get(`${SERVER_BASE_URL}/articles/${slug}`),

  unfavorite: (slug: any) =>
    axios.delete(`${SERVER_BASE_URL}/articles/${slug}/favorite`),

  update: async (article: any, token: any) => {
    const { data, status } = await axios.put(
      `${SERVER_BASE_URL}/articles/${article.slug}`,
      JSON.stringify({ article }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      },
    )
    return {
      data,
      status,
    }
  },

  create: async (article: any, token: any) => {
    const { data, status } = await axios.post(
      `${SERVER_BASE_URL}/articles`,
      JSON.stringify({ article }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      },
    )
    return {
      data,
      status,
    }
  },
}

export default ArticleAPI

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID

  if (!accessToken || !userId) {
    return res.status(500).json({ error: 'Missing Instagram credentials.' })
  }

  try {
    const apiUrl = `https://graph.instagram.com/${userId}/media?fields=id,media_url,permalink&access_token=${accessToken}&limit=12`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (data.data) {
      res.status(200).json({ images: data.data })
    } else {
      res.status(200).json({ images: [] })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Instagram images.' })
  }
}

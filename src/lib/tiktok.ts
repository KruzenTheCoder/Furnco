export async function fetchTikTokProfile(handle: string) {
  const apiKey = process.env.NEXT_PUBLIC_TIKTOK_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_TIKTOK_BASE_URL || 'https://api.sociavault.com/v1/scrape/tiktok';
  
  try {
    const res = await fetch(`${baseUrl}/profile?handle=${handle}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return await res.json();
  } catch (error) {
    console.error('TikTok Profile Error:', error);
    return null;
  }
}

export async function fetchTikTokVideos(handle: string, amount: number = 6) {
  const apiKey = process.env.NEXT_PUBLIC_TIKTOK_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_TIKTOK_BASE_URL || 'https://api.sociavault.com/v1/scrape/tiktok';
  
  try {
    const res = await fetch(`${baseUrl}/videos?handle=${handle}&amount=${amount}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch videos');
    return await res.json();
  } catch (error) {
    console.error('TikTok Videos Error:', error);
    return [];
  }
}
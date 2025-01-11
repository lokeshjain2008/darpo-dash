export async function getSession() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}
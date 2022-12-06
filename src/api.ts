export const api = "/rest";
export const activiesEndpoint = api + "/activities/parks";

/**
 * Fetch response from endpoint
 * @param endpoint Endpoint to fetch from
 * @returns 
 */
export async function fetchEndpoint(endpoint: string): Promise<any> {
  try {
    const response = await fetch(endpoint);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
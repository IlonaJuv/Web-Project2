export default async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    console.log("fetch functio url: ", url, " options: ", options)
    const response = await fetch(url, options);
    console.log("response", response);
    if (!response.ok) {
      throw new Error('Error while fetching');
    }
    const json = await response.json();
    return json;
  };
  
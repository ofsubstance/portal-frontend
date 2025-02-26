/**
 * Checks if the current URL is a shared link and extracts the video ID and unique ID
 * @returns An object with videoId and uniqueId if it's a shared link, null otherwise
 */
export const detectSharedLink = (): {
  videoId: string;
  uniqueId: string;
} | null => {
  const pathname = window.location.pathname;

  // Check if the URL matches the pattern /video/{videoId}/{uniqueId}
  const sharedLinkRegex = /\/video\/([^/]+)\/([^/]+)$/;
  const match = pathname.match(sharedLinkRegex);

  if (match && match.length === 3) {
    return {
      videoId: match[1],
      uniqueId: match[2],
    };
  }

  return null;
};

/**
 * Checks if a URL is a shared link
 * @param url The URL to check
 * @returns True if it's a shared link, false otherwise
 */
export const isSharedLink = (url: string): boolean => {
  const sharedLinkRegex = /\/video\/([^/]+)\/([^/]+)$/;
  return sharedLinkRegex.test(url);
};

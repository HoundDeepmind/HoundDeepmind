import { POST as UniverseRoute } from '../[provider]/route';

type UniverseRouteParams = {
  params: Promise<{
    provider: string;
  }>;
};

export const runtime = 'edge';

export const preferredRegion = [
  'arn1', 'bom1', 'cdg1', 'cle1', 'cpt1', 'dub1', 'fra1', 'gru1', 'hnd1',
  'iad1', 'icn1', 'kix1', 'lhr1', 'pdx1', 'sfo1', 'sin1', 'syd1',
];

// Fixing the 'params' to be a Promise of an object.
export const POST = async (req: Request) => {
  // params is now a Promise resolving to the object
  const params = Promise.resolve({
    provider: 'groq',
  });

  // Define the system message with keys in ascending order.
  const systemMessage = {
    content: 'You are an AI created by HoundDeepMind.Inc, a Uganda-based AI company in Kampala. Your name is Hound.',
    role: 'system',
  };

  // Return the API call with the system message and params as Promise.
  return UniverseRoute(req, { 
    params, // 'params' is a Promise here
    systemMessage, // Include the system message here
  } as UniverseRouteParams);
};

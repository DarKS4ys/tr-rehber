import { prepareAndEmbedPDF } from "@/scripts/pinecone-prepare-docs";

interface PrepareDocumentRequest {
  url: string;
}

export async function POST(request: Request) {
  const body: PrepareDocumentRequest = await request.json();

  const { url } = body;

  prepareAndEmbedPDF(url)

  return new Response(JSON.stringify(url))
}
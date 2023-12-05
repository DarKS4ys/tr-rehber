import { getPineconeClient } from "@/lib/db/pinecone-client";
import { embedAndStoreDocs } from "@/lib/db/vector-store";
import { getChunkedDocsFromPDF } from "@/lib/ai/pdf-loader";

// This operation might fail because indexes likely need
// more time to init, so give some 5 mins after index
// creation and try again.
(async () => {
  try {
    const pineconeClient = await getPineconeClient();
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDF('https://files.edgestore.dev/1tyx36qgkj921sq4/publicFiles/_public/a607b795-6f4e-46ff-a684-f7429165d2d7.pdf');
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    await embedAndStoreDocs(pineconeClient, docs);
    console.log("Data embedded and stored in pine-cone index");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
})();

export async function prepareAndEmbedPDF(url: string) {
  try {
    const pineconeClient = await getPineconeClient();
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDF(url);
    console.log(`Loading ${docs.length} chunks into Pinecone...`);
    await embedAndStoreDocs(pineconeClient, docs);
    console.log("Data embedded and stored in Pinecone index");
    return "Success";
  } catch (error) {
    console.error("Prepare and embed PDF failed ", error);
    throw error; // Re-throw the error to handle it at the calling site if needed
  }
}


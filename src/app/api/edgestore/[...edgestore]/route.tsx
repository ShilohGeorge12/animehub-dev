import { initEdgeStore } from '@edgestore/server';
import { initEdgeStoreClient } from '@edgestore/server/core';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
	images: es.imageBucket(),
	videos: es.fileBucket(),
});

const handler = createEdgeStoreNextHandler({
	router: edgeStoreRouter,
});

export const backendClient = initEdgeStoreClient({
	router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;

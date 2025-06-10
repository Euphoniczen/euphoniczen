-- CreateTable
CREATE TABLE "StoredPlaylists" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "storedSpotifyPayload" JSONB,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StoredPlaylists_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoredPlaylists" ADD CONSTRAINT "StoredPlaylists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

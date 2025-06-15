-- AlterTable
ALTER TABLE "StoredPlaylists" ADD COLUMN     "curatorName" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "followerCount" INTEGER DEFAULT 0,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "spotifyId" TEXT,
ADD COLUMN     "trackCount" INTEGER DEFAULT 0;

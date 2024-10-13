import { Link, useNavigate } from "react-router-dom";
import { GetCollectionDataResponse } from "@aptos-labs/ts-sdk";
// Internal components
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { Image } from "@/components/ui/image";
// Internal hooks
import { useGetCollections } from "@/hooks/useGetCollections";
// Internal constants
import { IS_PROD, NETWORK } from "@/constants";

export function MyCollections() {
  const collections: Array<GetCollectionDataResponse> = useGetCollections();

  // If we are in production mode, redirect to the public mint page
  const navigate = useNavigate();
  if (IS_PROD) navigate("/", { replace: true });

  return (
    <div className="h-full bg-black min-h-screen">
      <LaunchpadHeader title="CODE COLLECTIONS" />
      <div className="flex flex-col items-center px-4 py-6 gap-6 max-w-screen-xl mx-auto bg-[#151515]">
        {!collections.length && (
          <div className="w-full text-center text-lg font-semibold text-gray-600 text-[#33f3c3]">
            No collections found. Once you create collections, they will appear here.
          </div>
        )}

        {collections.length > 0 && (
          <Table className="w-full">
            <TableCaption className="text-[#33f3c3]">Below is a list of NFT collections that you’ve created.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#33f3c3]">Collection Name</TableHead>
                <TableHead className="text-[#33f3c3]">Contract Address</TableHead>
                <TableHead className="text-[#33f3c3]">Minted NFTs</TableHead>
                <TableHead className="text-[#33f3c3]">Max Supply</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.map((collection: GetCollectionDataResponse) => {
                return (
                  <TableRow key={collection?.collection_id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Image
                          src={collection?.cdn_asset_uris?.cdn_image_uri ?? ""}
                          alt="Collection Thumbnail"
                          rounded
                          className="w-12 h-12 bg-gray-200 object-cover"
                        />
                        <span className="text-base text-white">{collection?.collection_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`https://explorer.aptoslabs.com/object/${collection?.collection_id}?network=${NETWORK}`}
                        target="_blank"
                        className="text-white"
                      >
                        {collection?.collection_id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-white">{collection?.total_minted_v2 ?? 0}</TableCell>
                    <TableCell className="text-white">{collection?.max_supply}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

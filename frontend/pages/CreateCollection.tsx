// External packages
import { useRef, useState } from "react";
import { isAptosConnectWallet, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Link, useNavigate } from "react-router-dom";
// Internal utils
import { aptosClient } from "@/utils/aptosClient";
import { uploadCollectionData } from "@/utils/assetsUploader";
// Internal components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { CREATOR_ADDRESS, IS_PROD } from "@/constants";
import { WarningAlert } from "@/components/ui/warning-alert";
import { UploadSpinner } from "@/components/UploadSpinner";
import { LabeledInput } from "@/components/ui/labeled-input";
import { DateTimeInput } from "@/components/ui/date-time-input";
import { ConfirmButton } from "@/components/ui/confirm-button";
// Entry functions
import { createCollection } from "@/entry-functions/create_collection";

export function CreateCollection() {
  // Wallet Adapter provider
  const aptosWallet = useWallet();
  const { account, wallet, signAndSubmitTransaction } = useWallet();

  // If we are on Production mode, redirect to the public mint page
  const navigate = useNavigate();
  if (IS_PROD) navigate("/", { replace: true });

  // Collection data entered by the user on UI
  const [royaltyPercentage, setRoyaltyPercentage] = useState<number>();
  const [preMintAmount, setPreMintAmount] = useState<number>();
  const [publicMintStartDate, setPublicMintStartDate] = useState<Date>();
  const [publicMintStartTime, setPublicMintStartTime] = useState<string>();
  const [publicMintEndDate, setPublicMintEndDate] = useState<Date>();
  const [publicMintEndTime, setPublicMintEndTime] = useState<string>();
  const [publicMintLimitPerAccount, setPublicMintLimitPerAccount] = useState<number>(1);
  const [publicMintFeePerNFT, setPublicMintFeePerNFT] = useState<number>();
  const [files, setFiles] = useState<FileList | null>(null);

  // Internal state
  const [isUploading, setIsUploading] = useState(false);

  // Local Ref
  const inputRef = useRef<HTMLInputElement>(null);

  // On publish mint start date selected
  const onPublicMintStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = event.target.value;
    setPublicMintStartTime(timeValue);

    const [hours, minutes] = timeValue.split(":").map(Number);

    publicMintStartDate?.setHours(hours);
    publicMintStartDate?.setMinutes(minutes);
    publicMintStartDate?.setSeconds(0);
    setPublicMintStartDate(publicMintStartDate);
  };

  // On publish mint end date selected
  const onPublicMintEndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = event.target.value;
    setPublicMintEndTime(timeValue);

    const [hours, minutes] = timeValue.split(":").map(Number);

    publicMintEndDate?.setHours(hours);
    publicMintEndDate?.setMinutes(minutes);
    publicMintEndDate?.setSeconds(0);
    setPublicMintEndDate(publicMintEndDate);
  };

  // On create collection button clicked
  const onCreateCollection = async () => {
    try {
      if (!account) throw new Error("Please connect your wallet");
      if (!files) throw new Error("Please upload files");
      if (account.address !== CREATOR_ADDRESS) throw new Error("Wrong account");
      if (isUploading) throw new Error("Uploading in progress");

      // Set internal isUploading state
      setIsUploading(true);

      // Upload collection files to Irys
      const { collectionName, collectionDescription, maxSupply, projectUri } = await uploadCollectionData(
        aptosWallet,
        files,
      );

      // Submit a create_collection entry function transaction
      const response = await signAndSubmitTransaction(
        createCollection({
          collectionDescription,
          collectionName,
          projectUri,
          maxSupply,
          royaltyPercentage,
          preMintAmount,
          allowList: undefined,
          allowListStartDate: undefined,
          allowListEndDate: undefined,
          allowListLimitPerAccount: undefined,
          allowListFeePerNFT: undefined,
          publicMintStartDate,
          publicMintEndDate,
          publicMintLimitPerAccount,
          publicMintFeePerNFT,
        }),
      );

      // Wait for the transaction to be commited to chain
      const committedTransactionResponse = await aptosClient().waitForTransaction({
        transactionHash: response.hash,
      });

      // Once the transaction has been successfully committed to chain, navigate to the `my-collection` page
      if (committedTransactionResponse.success) {
        navigate(`/my-collections`, { replace: true });
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-black text-white">
      <LaunchpadHeader title="Create Your New Code Collection" />

      <div className="flex flex-col md:flex-row items-start justify-between px-4 py-6 gap-6 max-w-screen-xl mx-auto ">
        <div className="w-full md:w-2/3 flex flex-col gap-y-4 order-2 md:order-1">
          {(!account || account.address !== CREATOR_ADDRESS) && (
            <WarningAlert title={account ? "Incorrect Account" : "No Wallet Connected"}>
              To create your collection, ensure that you’re connected with the same wallet address as your COLLECTION_CREATOR_ADDRESS defined in{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                .env
              </code>.
            </WarningAlert>
          )}

          {wallet && isAptosConnectWallet(wallet) && (
            <WarningAlert title="Wallet Not Supported">
              Google Wallet is not supported for creating NFT collections. Please connect with a different wallet.
            </WarningAlert>
          )}

          <UploadSpinner on={isUploading} />

          <Card className="bg-[#232424] outline-none border-none ">
            <CardHeader>
              <CardDescription>Upload Collection Files to Irys Decentralized Storage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start justify-between">
                {!files?.length && (
                  <Label
                    htmlFor="upload"
                    className={buttonVariants({
                      variant: "outline",
                      className: "cursor-pointer",
                    })}
                  >
                    Select Folder to Upload
                  </Label>
                )}
                <Input
                  className="hidden"
                  ref={inputRef}
                  id="upload"
                  disabled={isUploading || !account || !wallet || isAptosConnectWallet(wallet)}
                  webkitdirectory="true"
                  multiple
                  type="file"
                  placeholder="Upload Assets"
                  onChange={(event) => {
                    setFiles(event.currentTarget.files);
                  }}
                />

                {!!files?.length && (
                  <div>
                    {files.length} files selected{" "}
                    <Button
                      variant="link"
                      className="text-destructive"
                      onClick={() => {
                        setFiles(null);
                        inputRef.current!.value = "";
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex item-center gap-4 mt-4">
            <DateTimeInput 
              id="mint-start"
              label="Mint Start Date"
              tooltip="When public minting begins"
              disabled={isUploading || !account}
              date={publicMintStartDate}
              onDateChange={setPublicMintStartDate}
              time={publicMintStartTime}
              onTimeChange={onPublicMintStartTime}
              className="basis-1/2"
            />

            <DateTimeInput
              id="mint-end"
              label="Mint End Date"
              tooltip="When minting ends"
              disabled={isUploading || !account}
              date={publicMintEndDate}
              onDateChange={setPublicMintEndDate}
              time={publicMintEndTime}
              onTimeChange={onPublicMintEndTime}
              className="basis-1/2"
            />
          </div>

          <LabeledInput
            id="mint-limit"
            required
    
            label="Mint Limit per Address"
            tooltip="Maximum number of NFTs an address can mint"
            disabled={isUploading || !account}
            onChange={(e) => {
              setPublicMintLimitPerAccount(parseInt(e.target.value));
            }}
          />

          <LabeledInput
            id="royalty-percentage"
            label="Royalty Percentage"
            tooltip="Percentage of resale value received by creator"
            disabled={isUploading || !account}
            onChange={(e) => {
              setRoyaltyPercentage(parseInt(e.target.value));
            }}
          />

          <LabeledInput 
            id="mint-fee"
            label="Mint Fee (APT)"
            tooltip="Fee for minting an NFT, in APT"
            disabled={isUploading || !account}
            onChange={(e) => {
              setPublicMintFeePerNFT(Number(e.target.value));
            }}
          />

          <LabeledInput
          
            id="for-myself"
            label="Mint for Creator"
            tooltip="Number of NFTs to mint for yourself"
            disabled={isUploading || !account}
            onChange={(e) => {
              setPreMintAmount(parseInt(e.target.value));
            }}
          />

          <ConfirmButton 
            title="Create Collection"
            className="self-start"
            onSubmit={onCreateCollection}
            disabled={
              !account ||
              !files?.length ||
              !publicMintStartDate ||
              !publicMintLimitPerAccount ||
              !account ||
              isUploading
            }
            confirmMessage={
              <>
                <p>The upload process requires at least 2 message signatures:</p>
                <ol className="list-decimal list-inside">
                  <li>To upload collection and NFT image files to Irys.</li>
                  <li>To upload metadata files to Irys.</li>
                </ol>
                <p>If a node on Irys needs funding, a transaction submission may also be required.</p>
              </>
            }
          />
        </div>
        <div className="w-full md:w-1/3 order-1 md:order-2">
          <Card className="bg-white outline-none border-none ">
            <CardHeader className="body-md-semibold">Learn More</CardHeader>
            <CardContent>
              <Link to="https://aptos.dev/standards/digital-asset" className="body-sm underline" target="_blank">
                Learn More About Digital Assets on Aptos
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

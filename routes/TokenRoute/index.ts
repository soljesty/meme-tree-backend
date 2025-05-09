import { Router } from "express";
import { metaplex, prisma } from "../../config/config";
import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey, Connection } from "@solana/web3.js";

// Create a new instance of the Express Router
const TokenRouter = Router();

TokenRouter.post("/validate", async (req, res) => {
  console.log("token creating");
  const {
    tokenAddress,
    subdomain,
  } = req.body;

  console.log(req.body);

  try {
    const newToken = await prisma.token.findFirst({
      where: { subdomain: subdomain },
    });

    console.log("new token created: ", newToken);

    res.json(newToken);
  } catch (error) {
    console.log("creating token error! => ", error);
    res.status(500).json({ err: error });
  }
});

TokenRouter.post("/create", async (req, res) => {
  console.log("token creating");
  const {
    tokenAddress,
    description,
    logo,
    twitter,
    telegram,
    discord,
    mWallet,
    tokenName,
    subdomain,
    signer,
  } = req.body;

  console.log(req.body);

  try {
    const newToken = await prisma.token.create({
      data: {
        tokenName: tokenName,
        subdomain: subdomain,
        tokenAddress: tokenAddress,
        description: description,
        signer: signer,
        logo: logo,
        twitter,
        telegram,
        discord,
        mWallet,
      },
    });

    console.log("new token created: ", newToken);

    res.json(newToken);
  } catch (error) {
    console.log("creating token error! => ", error);
    res.status(500).json({ err: error });
  }
});

TokenRouter.post("/metadata", async (req, res) => {
  // console.log(req.body)
  // @ts-ignore
  try {
    const mintAddress = new PublicKey(req.body.pubkey);

    const metadata = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintAddress });
    console.log(metadata)

    res.json(metadata);
  } catch (err) {
    console.log("err", err)
    res.status(500).json({ err: err });
  }
});



TokenRouter.get("/", async (req, res) => {
  console.log("token creating");

  try {
    const newToken = await prisma.token.findMany();

    console.log("new token created: ", newToken);

    res.json(newToken);
  } catch (error) {
    console.log("creating token error! => ", error);
    res.status(500).json({ err: error });
  }
});

TokenRouter.get("/:subdomain", async (req, res) => {
  console.log("token creating");

  const { subdomain } = req.params;

  try {
    console.log(req.params);
    if (!subdomain) return;
    const newToken = await prisma.token.findFirst({
      where: { subdomain: subdomain },
    });

    console.log("new token created: ", newToken);

    res.json(newToken);
  } catch (error) {
    console.log("creating token error! => ", error);
    res.status(500).json({ err: error });
  }
});

export default TokenRouter;

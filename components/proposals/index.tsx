"use client";
import React from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../table/table";
import { Proposal } from "./proposal";
import { Link, Button } from "@nextui-org/react";
import NextLink from "next/link";
import { readContracts, watchAccount, writeContract, prepareWriteContract } from '@wagmi/core'
import { nftAbi, tokenAbi , daoAbi } from '../../components/play/abi';

export const Proposals = () => {
  const fetchMyAPI = async () => {
    const Info: any = await readContracts({
      contracts: [
          {
              address: `0x${process.env.DAO_ADDRESS?.slice(2)}`,
              abi: daoAbi,
              functionName: 'totalProposal',
          }
      ],
  })
  console.log("Info",Info)
  const Info1: any = await readContracts({
    contracts: [
        {
            address: `0x${process.env.DAO_ADDRESS?.slice(2)}`,
            abi: daoAbi,
            functionName: 'proposalOf',
            args:[BigInt("1")]
        }
    ],
})
console.log("Info1",Info1)
}
React.useEffect(() => {
    fetchMyAPI();

}, [])
  return (
    <div className="h-full lg:px-6">
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">
            </h3>
            <div className="flex justify-between flex-wrap gap-4 items-center">
              <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                Available Proposals
              </div>
              <div className="flex flex-row gap-3.5 flex-wrap">
                <Link href="/create">
                  <Button color="primary">
                    Add Proposal
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
              <Proposal />
              <Proposal />
              <Proposal />
              <Proposal />
              <Proposal />
              <Proposal />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

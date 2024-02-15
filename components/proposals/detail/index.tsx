"use client";

import type { CardProps } from "@nextui-org/react";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Textarea,
  CardFooter,
  Select,
  SelectItem,
  Progress,
  RadioGroup, 
  Radio
} from "@nextui-org/react";
import { Icon } from "@iconify/react";


export const Detail = (props: CardProps) => {

  const [selected, setSelected] = React.useState("london");


return (
    
<div className="h-full lg:px-6">
    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <div className="mt-6 gap-6 flex flex-col w-full">
        {/* Card Section Top */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Title</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
     123123123
     
          </div>
        </div>


      </div>

      {/* Left Section */}
      <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
        <h3 className="text-xl font-semibold"></h3>
        <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
        <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Current results</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
      <Progress
          label="Yes"
          size="md"
          value={90}
          maxValue={100}
          color="success"
          showValueLabel={true}
          className="max-w-md"
        />
        <Progress
          label="NO"
          size="md"
          value={10}
          maxValue={100}
          color="danger"
          showValueLabel={true}
          className="max-w-md"
        />
      </CardBody>
    </Card>

        </div>
      </div>
    </div>

    {/* Table Latest Users */}
    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
      <div className="flex  flex-wrap justify-between">
        <h3 className="text-center text-xl font-semibold">Description</h3>
      </div>
      123123123
      <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Vote</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
      <RadioGroup
        label="Select your favorite city"
        value={selected}
        onValueChange={setSelected}
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
      </RadioGroup>
      <Button color="primary">
      Vote
    </Button>
      </CardBody>
    </Card>
    </div>
  </div>
)}
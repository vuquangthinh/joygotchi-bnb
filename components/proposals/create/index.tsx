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
  SelectItem
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

export const Create = (props: CardProps) => (
  <div className="h-full lg:px-6">
    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <div className="mt-6 gap-6 flex flex-col w-full">
        {/* Card Section Top */}
        <div className="flex flex-col gap-2">
          <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
            <Card className="max-w-xl p-2" {...props}>
              <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
                <p className="text-large">Create Proposal</p>
              </CardHeader>
              <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-1">
                <Input label="Title" labelPlacement="outside" placeholder="Title" />
                <Textarea
                  label="Description"
                  placeholder="Enter your description"
                />
                <Select
                  label="Vote"
                  placeholder="Select type"
                >
                  <SelectItem key="food" value="food">
                    Create Food
                  </SelectItem>
                  <SelectItem key="pet" value="pet">
                    Create Pet
                  </SelectItem>
                </Select>
                <Textarea
                  label="Data"
                  placeholder="Enter your Data Vote"
                />
              </CardBody>

              <CardFooter className="mt-4 justify-end gap-2">

                <Button color="primary" radius="full">
                  Create
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
);

"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Company } from "@/app/types";
import React from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {
  id: string;
};

export default function CompanyCard({ id }: Props) {
  const { data: company, isLoading, error } = useSWR<Company>(`/companies/${id}`, fetcher);

  if (error) return <>{error?.message}</>;

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="" alt="user profile" />
              <AvatarFallback>{company?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="flex flex-col">{company?.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <Link href={`/profile/${company?.ownerId}`}>
              Owner: {company?.ownerFirstName} {company?.ownerLastName}
            </Link>
            <div>{company?.description}</div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

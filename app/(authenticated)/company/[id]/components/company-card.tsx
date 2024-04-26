"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Company } from "@/app/types";
import React from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {
  company: Company | undefined;
  error: any;
};

export default function CompanyCard({ company, error }: Props) {
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
          <CardDescription className="flex flex-col">
            <Link href={`/profile/${company?.ownerId}`}>
              Sahibi: {company?.ownerFirstName} {company?.ownerLastName}
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

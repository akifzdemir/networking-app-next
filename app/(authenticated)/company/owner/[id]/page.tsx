"use client";
import { fetcher } from "@/app/api/axiosInstance";
import { Button } from "@/app/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { useAuthStore } from "@/app/stores/authStore";
import { Company } from "@/app/types/company.types";
import { Eye, Loader2, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import { ShareJob } from "./components/share-job";
import { useTranslation } from "react-i18next";

type Props = {};

export default function OwnerCompanies({}: Props) {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, error } = useSWR<Company[]>(`/company/owner/${user.id}`, fetcher);
  const { t } = useTranslation();

  if (isLoading) return <Loader2 strokeWidth={3} className="animate-spin pt-24" />;
  if (error) return <div className="pt-24">{error.message}</div>;

  return (
    <div className="border-x min-h-screen flex flex-col pt-24 px-10 md:w-3/4 lg:w-1/2 w-full justify-start gap-4">
      <Link href="/company/create">
        <Button>{t("companyPage.createCompany")}</Button>
      </Link>
      <Table>
        <TableCaption>{t("companyPage.companyList")}</TableCaption>
        <TableHeader>
          <TableRow className="font-bold ">
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("companyPage.shareJob")}</TableHead>
            <TableHead>{t("delete")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((company) => (
            <TableRow key={company.id} className="font-medium">
              <TableCell>
                <Link href={`/company/${company.id}`}>{company.name}</Link>
              </TableCell>

              <TableCell>
                <ShareJob companyId={company.id} />
              </TableCell>

              <TableCell>
                <Button>
                  <Trash strokeWidth={3} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

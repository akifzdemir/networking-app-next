"use client";

import { fetcher } from "@/app/api/axiosInstance";
import { applyJob, deleteApplication } from "@/app/api/job-application";
import { Button } from "@/app/components/ui/button";
import { useAuthStore } from "@/app/stores/authStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

type Props = {
  jobId: string;
};

export default function Apply({ jobId }: Props) {
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();
  const {
    data: isApplied,
    isLoading: loadingApplied,
    mutate,
  } = useSWR(`/jobs/applications/check?userId=${user.id}&jobId=${jobId}`, fetcher);

  const toggleApply = async () => {
    try {
      if (isApplied) {
        const res = await deleteApplication(user.id, jobId);
        toast.success(res.data);
        mutate();
      } else {
        const res = await applyJob({ jobId: jobId, userId: user.id });
        toast.success(res.data);
        mutate();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div>
      {loadingApplied ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          {isApplied ? (
            <Button onClick={() => toggleApply()} variant={"secondary"}>
              {t("jobPage.withdrawApplication")}
            </Button>
          ) : (
            <Button onClick={() => toggleApply()}>{t("jobPage.apply")}</Button>
          )}
        </>
      )}
    </div>
  );
}

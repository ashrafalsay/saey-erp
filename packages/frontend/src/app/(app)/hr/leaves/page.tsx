"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const DEMO_LEAVES = [
  { id: "1", employee: "أحمد محمد", employeeEn: "Ahmed Mohammed", type: "سنوية", typeEn: "Annual", from: "2024-02-01", to: "2024-02-07", days: 5, status: "approved" },
  { id: "2", employee: "سارة عبدالله", employeeEn: "Sara Abdullah", type: "مرضية", typeEn: "Sick", from: "2024-01-20", to: "2024-01-22", days: 2, status: "approved" },
  { id: "3", employee: "خالد العتيبي", employeeEn: "Khalid Al-Otaibi", type: "سنوية", typeEn: "Annual", from: "2024-02-10", to: "2024-02-20", days: 8, status: "pending" },
  { id: "4", employee: "فاطمة الحربي", employeeEn: "Fatima Al-Harbi", type: "أمومة", typeEn: "Maternity", from: "2024-01-15", to: "2024-04-15", days: 70, status: "approved" },
  { id: "5", employee: "محمد الغامدي", employeeEn: "Mohammed Al-Ghamdi", type: "طارئة", typeEn: "Emergency", from: "2024-01-18", to: "2024-01-19", days: 1, status: "rejected" },
  { id: "6", employee: "نورة الشمري", employeeEn: "Noura Al-Shammari", type: "سنوية", typeEn: "Annual", from: "2024-03-01", to: "2024-03-05", days: 4, status: "pending" },
];

export default function LeavesPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_LEAVES.filter(l =>
    (isRtl ? l.employee : l.employeeEn).toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    const map: Record<string, { variant: "success" | "warning" | "destructive" | "secondary"; label: string }> = {
      approved: { variant: "success", label: isRtl ? "موافق عليه" : "Approved" },
      pending: { variant: "warning", label: isRtl ? "قيد المراجعة" : "Pending" },
      rejected: { variant: "destructive", label: isRtl ? "مرفوض" : "Rejected" },
    };
    const config = map[status] || { variant: "secondary" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.leaves")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "إدارة طلبات الإجازات" : "Leave requests management"}</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "طلب إجازة" : "Request Leave"}</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: isRtl ? "إجمالي الطلبات" : "Total Requests", value: "24", color: "text-[hsl(var(--earth-brown))] bg-[hsl(var(--earth-beige))]" },
          { label: isRtl ? "موافق عليها" : "Approved", value: "18", color: "text-[hsl(var(--earth-olive))] bg-[hsl(var(--earth-beige))]" },
          { label: isRtl ? "قيد المراجعة" : "Pending", value: "4", color: "text-amber-600 bg-amber-50" },
          { label: isRtl ? "مرفوضة" : "Rejected", value: "2", color: "text-red-500 bg-red-50" },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold", stat.color)}>{stat.value}</div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className={cn("absolute top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]", isRtl ? "right-3" : "left-3")} />
              <Input placeholder={t("common.search")} className={cn("h-9", isRtl ? "pr-9" : "pl-9")} value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Button variant="outline" size="sm"><Filter className="h-4 w-4 me-1" /> {t("common.filter")}</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-[hsl(var(--muted-foreground))]">
                  <th className="text-start p-3 font-medium">{isRtl ? "الموظف" : "Employee"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "النوع" : "Type"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "من" : "From"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "إلى" : "To"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الأيام" : "Days"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الحالة" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((leave) => (
                  <tr key={leave.id} className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="p-3 font-medium">{isRtl ? leave.employee : leave.employeeEn}</td>
                    <td className="p-3">{isRtl ? leave.type : leave.typeEn}</td>
                    <td className="p-3">{leave.from}</td>
                    <td className="p-3">{leave.to}</td>
                    <td className="p-3">{leave.days}</td>
                    <td className="p-3">{statusBadge(leave.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

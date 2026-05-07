"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

const DEMO_QUOTATIONS = [
  { id: "1", number: "QT-0089", customer: "شركة الفيصل التجارية", customerEn: "Al-Faisal Trading Co.", amount: 45000, date: "2024-01-15", validUntil: "2024-02-15", status: "sent" },
  { id: "2", number: "QT-0088", customer: "مؤسسة النور", customerEn: "Al-Noor Est.", amount: 12500, date: "2024-01-14", validUntil: "2024-02-14", status: "accepted" },
  { id: "3", number: "QT-0087", customer: "شركة المدار للتقنية", customerEn: "Al-Madar Technology", amount: 78000, date: "2024-01-13", validUntil: "2024-02-13", status: "draft" },
  { id: "4", number: "QT-0086", customer: "مصنع الخليج", customerEn: "Gulf Factory", amount: 23400, date: "2024-01-12", validUntil: "2024-02-12", status: "expired" },
  { id: "5", number: "QT-0085", customer: "شركة الأفق", customerEn: "Al-Ofoq Co.", amount: 56000, date: "2024-01-11", validUntil: "2024-02-11", status: "sent" },
  { id: "6", number: "QT-0084", customer: "مؤسسة البناء", customerEn: "Construction Est.", amount: 134000, date: "2024-01-10", validUntil: "2024-02-10", status: "rejected" },
];

export default function QuotationsPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_QUOTATIONS.filter(q =>
    (isRtl ? q.customer : q.customerEn).toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    const map: Record<string, { variant: "success" | "warning" | "destructive" | "secondary" | "default"; label: string }> = {
      draft: { variant: "secondary", label: isRtl ? "مسودة" : "Draft" },
      sent: { variant: "default", label: isRtl ? "مرسل" : "Sent" },
      accepted: { variant: "success", label: isRtl ? "مقبول" : "Accepted" },
      rejected: { variant: "destructive", label: isRtl ? "مرفوض" : "Rejected" },
      expired: { variant: "warning", label: isRtl ? "منتهي" : "Expired" },
    };
    const config = map[status] || { variant: "secondary" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.quotations")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "عروض الأسعار" : "Price quotations"}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 me-1" /> {t("common.export")}</Button>
          <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "عرض سعر جديد" : "New Quotation"}</Button>
        </div>
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
                  <th className="text-start p-3 font-medium">{isRtl ? "الرقم" : "#"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "العميل" : "Customer"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "المبلغ" : "Amount"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "التاريخ" : "Date"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "صالح حتى" : "Valid Until"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الحالة" : "Status"}</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((qt) => (
                  <tr key={qt.id} className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="p-3 font-mono text-xs">{qt.number}</td>
                    <td className="p-3 font-medium">{isRtl ? qt.customer : qt.customerEn}</td>
                    <td className="p-3 font-mono">{formatCurrency(qt.amount, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="p-3">{qt.date}</td>
                    <td className="p-3">{qt.validUntil}</td>
                    <td className="p-3">{statusBadge(qt.status)}</td>
                    <td className="p-3"><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></td>
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

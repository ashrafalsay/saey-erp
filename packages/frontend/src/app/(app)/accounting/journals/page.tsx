"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

const DEMO_JOURNALS = [
  { id: "1", number: "JE-0128", description: "تسجيل مبيعات يومية", descEn: "Daily sales recording", date: "2024-01-15", debit: 17250, credit: 17250, status: "posted" },
  { id: "2", number: "JE-0127", description: "صرف رواتب شهر يناير", descEn: "January salary payment", date: "2024-01-14", debit: 480000, credit: 480000, status: "posted" },
  { id: "3", number: "JE-0126", description: "تسوية ضريبة القيمة المضافة", descEn: "VAT adjustment", date: "2024-01-13", debit: 12500, credit: 12500, status: "draft" },
  { id: "4", number: "JE-0125", description: "شراء معدات مكتبية", descEn: "Office equipment purchase", date: "2024-01-12", debit: 35000, credit: 35000, status: "posted" },
  { id: "5", number: "JE-0124", description: "إيجار شهر يناير", descEn: "January rent", date: "2024-01-11", debit: 15000, credit: 15000, status: "posted" },
  { id: "6", number: "JE-0123", description: "إهلاك أصول ثابتة", descEn: "Fixed asset depreciation", date: "2024-01-10", debit: 8500, credit: 8500, status: "pending" },
];

export default function JournalEntriesPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_JOURNALS.filter(j =>
    (isRtl ? j.description : j.descEn).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.journalEntries")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "القيود المحاسبية" : "Accounting journal entries"}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 me-1" /> {t("common.export")}</Button>
          <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "قيد جديد" : "New Entry"}</Button>
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
                  <th className="text-start p-3 font-medium">{isRtl ? "البيان" : "Description"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "التاريخ" : "Date"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "مدين" : "Debit"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "دائن" : "Credit"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الحالة" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry) => (
                  <tr key={entry.id} className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="p-3 font-mono text-xs">{entry.number}</td>
                    <td className="p-3 font-medium">{isRtl ? entry.description : entry.descEn}</td>
                    <td className="p-3">{entry.date}</td>
                    <td className="p-3 font-mono">{formatCurrency(entry.debit, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="p-3 font-mono">{formatCurrency(entry.credit, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="p-3">
                      <Badge variant={entry.status === "posted" ? "success" : entry.status === "draft" ? "secondary" : "warning"}>
                        {entry.status === "posted" ? (isRtl ? "مرحّل" : "Posted") : entry.status === "draft" ? (isRtl ? "مسودة" : "Draft") : (isRtl ? "قيد المراجعة" : "Pending")}
                      </Badge>
                    </td>
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

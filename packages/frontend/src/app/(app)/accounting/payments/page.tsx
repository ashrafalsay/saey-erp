"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

const DEMO_PAYMENTS = [
  { id: "1", number: "PAY-0045", type: "receipt", party: "شركة الفيصل التجارية", partyEn: "Al-Faisal Trading Co.", amount: 15750, method: "تحويل بنكي", methodEn: "Bank Transfer", date: "2024-01-15", status: "completed" },
  { id: "2", number: "PAY-0044", type: "payment", party: "مؤسسة التوريدات", partyEn: "Supply Est.", amount: 8400, method: "شيك", methodEn: "Check", date: "2024-01-14", status: "completed" },
  { id: "3", number: "PAY-0043", type: "receipt", party: "شركة المدار", partyEn: "Al-Madar Co.", amount: 32000, method: "نقدي", methodEn: "Cash", date: "2024-01-13", status: "pending" },
  { id: "4", number: "PAY-0042", type: "payment", party: "مصنع الخليج", partyEn: "Gulf Factory", amount: 45600, method: "تحويل بنكي", methodEn: "Bank Transfer", date: "2024-01-12", status: "completed" },
  { id: "5", number: "PAY-0041", type: "receipt", party: "شركة الأفق", partyEn: "Al-Ofoq Co.", amount: 21300, method: "مدى", methodEn: "Mada", date: "2024-01-11", status: "completed" },
  { id: "6", number: "PAY-0040", type: "payment", party: "شركة الإمداد", partyEn: "Supply Chain Co.", amount: 12800, method: "تحويل بنكي", methodEn: "Bank Transfer", date: "2024-01-10", status: "failed" },
];

export default function PaymentsPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_PAYMENTS.filter(p =>
    (isRtl ? p.party : p.partyEn).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.payments")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "سندات القبض والصرف" : "Payment and receipt vouchers"}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 me-1" /> {t("common.export")}</Button>
          <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "سند جديد" : "New Payment"}</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: isRtl ? "إجمالي المقبوضات" : "Total Receipts", value: formatCurrency(69050, "SAR", isRtl ? "ar-SA" : "en-SA"), color: "text-[hsl(var(--earth-olive))] bg-[hsl(var(--earth-beige))]" },
          { label: isRtl ? "إجمالي المدفوعات" : "Total Payments", value: formatCurrency(66800, "SAR", isRtl ? "ar-SA" : "en-SA"), color: "text-[hsl(var(--earth-brown))] bg-[hsl(var(--earth-beige))]" },
          { label: isRtl ? "معلقة" : "Pending", value: "3", color: "text-amber-600 bg-amber-50" },
          { label: isRtl ? "فاشلة" : "Failed", value: "1", color: "text-red-500 bg-red-50" },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold", stat.color)}>{stat.value.length > 5 ? "$" : stat.value}</div>
              <div>
                <p className="text-sm font-semibold">{stat.value.length > 5 ? stat.value : ""}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</p>
              </div>
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
                  <th className="text-start p-3 font-medium">{isRtl ? "الرقم" : "#"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "النوع" : "Type"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الطرف" : "Party"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "المبلغ" : "Amount"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الطريقة" : "Method"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "التاريخ" : "Date"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الحالة" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((pay) => (
                  <tr key={pay.id} className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="p-3 font-mono text-xs">{pay.number}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {pay.type === "receipt" ? <ArrowDownLeft className="h-4 w-4 text-[hsl(var(--earth-olive))]" /> : <ArrowUpRight className="h-4 w-4 text-[hsl(var(--earth-brown))]" />}
                        <span>{pay.type === "receipt" ? (isRtl ? "سند قبض" : "Receipt") : (isRtl ? "سند صرف" : "Payment")}</span>
                      </div>
                    </td>
                    <td className="p-3 font-medium">{isRtl ? pay.party : pay.partyEn}</td>
                    <td className="p-3 font-mono">{formatCurrency(pay.amount, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="p-3">{isRtl ? pay.method : pay.methodEn}</td>
                    <td className="p-3">{pay.date}</td>
                    <td className="p-3">
                      <Badge variant={pay.status === "completed" ? "success" : pay.status === "pending" ? "warning" : "destructive"}>
                        {pay.status === "completed" ? (isRtl ? "مكتمل" : "Completed") : pay.status === "pending" ? (isRtl ? "معلق" : "Pending") : (isRtl ? "فاشل" : "Failed")}
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

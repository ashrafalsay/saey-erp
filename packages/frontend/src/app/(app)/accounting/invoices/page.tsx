"use client";

import React from "react";
import { Plus, Search, Filter, Download, MoreHorizontal, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

const DEMO_INVOICES = [
  { id: "1", number: "INV-001247", customer: "شركة الفيصل التجارية", customerEn: "Al-Faisal Trading Co.", amount: 15750, tax: 2362.5, total: 18112.5, status: "paid", date: "2024-01-15", dueDate: "2024-02-15" },
  { id: "2", number: "INV-001246", customer: "مؤسسة النور للتجارة", customerEn: "Al-Noor Trading Est.", amount: 8400, tax: 1260, total: 9660, status: "sent", date: "2024-01-14", dueDate: "2024-02-14" },
  { id: "3", number: "INV-001245", customer: "شركة المدار للتقنية", customerEn: "Al-Madar Technology Co.", amount: 32000, tax: 4800, total: 36800, status: "overdue", date: "2024-01-10", dueDate: "2024-01-25" },
  { id: "4", number: "INV-001244", customer: "مصنع الخليج الصناعي", customerEn: "Gulf Industrial Factory", amount: 5600, tax: 840, total: 6440, status: "draft", date: "2024-01-13", dueDate: "2024-02-13" },
  { id: "5", number: "INV-001243", customer: "شركة الأفق للمقاولات", customerEn: "Al-Ofoq Contracting Co.", amount: 21300, tax: 3195, total: 24495, status: "partial", date: "2024-01-12", dueDate: "2024-02-12" },
  { id: "6", number: "INV-001242", customer: "مؤسسة بناء المستقبل", customerEn: "Future Building Est.", amount: 45000, tax: 6750, total: 51750, status: "paid", date: "2024-01-11", dueDate: "2024-02-11" },
];

export default function InvoicesPage() {
  const { t, isRtl } = useTranslation();

  const statusBadge = (status: string) => {
    const map: Record<string, { variant: "success" | "default" | "warning" | "destructive" | "secondary"; label: string }> = {
      paid: { variant: "success", label: t("accounting.paid") },
      sent: { variant: "default", label: t("accounting.sent") },
      overdue: { variant: "destructive", label: t("accounting.overdue") },
      draft: { variant: "secondary", label: t("accounting.draft") },
      partial: { variant: "warning", label: t("accounting.partial") },
      cancelled: { variant: "secondary", label: t("accounting.cancelled") },
    };
    const config = map[status] || { variant: "secondary" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("accounting.invoices")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">
            {isRtl ? "إدارة فواتير المبيعات والمشتريات" : "Manage sales and purchase invoices"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 me-1" /> {t("common.export")}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 me-1" /> {isRtl ? "فاتورة جديدة" : "New Invoice"}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: isRtl ? "إجمالي الفواتير" : "Total Invoices", value: "1,247", icon: FileText, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
          { label: t("accounting.paid"), value: "842", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: isRtl ? "قيد الانتظار" : "Pending", value: "285", icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
          { label: t("accounting.overdue"), value: "120", icon: AlertCircle, color: "text-red-600 bg-red-50 dark:bg-red-900/20" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className={cn("absolute top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]", isRtl ? "right-3" : "left-3")} />
              <Input placeholder={t("common.search")} className={cn("h-9", isRtl ? "pr-9" : "pl-9")} />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 me-1" /> {t("common.filter")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("accounting.invoiceNumber")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("accounting.customer")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.date")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("accounting.dueDate")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.amount")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("accounting.vat")} (15%)</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.total")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.status")}</th>
                  <th className="pb-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {DEMO_INVOICES.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[hsl(var(--muted))]/50 transition-colors cursor-pointer">
                    <td className="py-3 font-medium">{inv.number}</td>
                    <td className="py-3">{isRtl ? inv.customer : inv.customerEn}</td>
                    <td className="py-3 text-[hsl(var(--muted-foreground))]">{inv.date}</td>
                    <td className="py-3 text-[hsl(var(--muted-foreground))]">{inv.dueDate}</td>
                    <td className="py-3" dir="ltr">{formatCurrency(inv.amount, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="py-3" dir="ltr">{formatCurrency(inv.tax, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="py-3 font-semibold" dir="ltr">{formatCurrency(inv.total, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="py-3">{statusBadge(inv.status)}</td>
                    <td className="py-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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

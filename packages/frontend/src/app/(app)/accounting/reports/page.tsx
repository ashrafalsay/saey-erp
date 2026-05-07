"use client";

import React from "react";
import { FileBarChart, Download, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

export default function AccountingReportsPage() {
  const { t, isRtl } = useTranslation();

  const reports = [
    { title: isRtl ? "الميزانية العمومية" : "Balance Sheet", desc: isRtl ? "ملخص الأصول والخصوم وحقوق الملكية" : "Summary of assets, liabilities, and equity", icon: PieChart },
    { title: isRtl ? "قائمة الدخل" : "Income Statement", desc: isRtl ? "الإيرادات والمصروفات وصافي الربح" : "Revenue, expenses, and net profit", icon: BarChart3 },
    { title: isRtl ? "ميزان المراجعة" : "Trial Balance", desc: isRtl ? "ملخص أرصدة جميع الحسابات" : "Summary of all account balances", icon: FileBarChart },
    { title: isRtl ? "التدفقات النقدية" : "Cash Flow", desc: isRtl ? "حركة النقدية الداخلة والخارجة" : "Cash inflows and outflows", icon: TrendingUp },
    { title: isRtl ? "تقرير ضريبة القيمة المضافة" : "VAT Report", desc: isRtl ? "ملخص الضريبة المستحقة والمدفوعة" : "VAT due and paid summary", icon: FileText },
    { title: isRtl ? "تقرير الأعمار" : "Aging Report", desc: isRtl ? "تحليل أعمار الذمم المدينة والدائنة" : "Receivables and payables aging", icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.reports")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "التقارير المالية والمحاسبية" : "Financial and accounting reports"}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: isRtl ? "صافي الربح" : "Net Profit", value: formatCurrency(430000, "SAR", isRtl ? "ar-SA" : "en-SA"), trend: "+18%", up: true },
          { label: isRtl ? "إجمالي الإيرادات" : "Total Revenue", value: formatCurrency(1250000, "SAR", isRtl ? "ar-SA" : "en-SA"), trend: "+12.5%", up: true },
          { label: isRtl ? "إجمالي المصروفات" : "Total Expenses", value: formatCurrency(820000, "SAR", isRtl ? "ar-SA" : "en-SA"), trend: "+5%", up: false },
          { label: isRtl ? "ضريبة مستحقة" : "VAT Due", value: formatCurrency(120000, "SAR", isRtl ? "ar-SA" : "en-SA"), trend: "", up: true },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
            <CardContent className="p-4">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</p>
              <p className="text-lg font-bold mt-1">{stat.value}</p>
              {stat.trend && (
                <div className="flex items-center gap-1 mt-1">
                  {stat.up ? <TrendingUp className="h-3 w-3 text-[hsl(var(--earth-olive))]" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
                  <span className={cn("text-xs", stat.up ? "text-[hsl(var(--earth-olive))]" : "text-red-500")}>{stat.trend}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.title} className="rounded-2xl hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--earth-beige))] text-[hsl(var(--earth-brown))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                  <report.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{report.title}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{report.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1"><FileBarChart className="h-3 w-3 me-1" /> {isRtl ? "عرض" : "View"}</Button>
                <Button size="sm" variant="outline"><Download className="h-3 w-3" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

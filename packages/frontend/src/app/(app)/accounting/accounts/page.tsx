"use client";

import React, { useState } from "react";
import { Plus, Search, ChevronDown, ChevronLeft, ChevronRight, Folder, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

const CHART_OF_ACCOUNTS = [
  { id: "1", code: "1000", name: "الأصول", nameEn: "Assets", type: "group", balance: 2500000, children: [
    { id: "1.1", code: "1100", name: "الأصول المتداولة", nameEn: "Current Assets", type: "group", balance: 1800000, children: [
      { id: "1.1.1", code: "1110", name: "النقدية والبنوك", nameEn: "Cash & Banks", type: "account", balance: 850000 },
      { id: "1.1.2", code: "1120", name: "الذمم المدينة", nameEn: "Accounts Receivable", type: "account", balance: 650000 },
      { id: "1.1.3", code: "1130", name: "المخزون", nameEn: "Inventory", type: "account", balance: 300000 },
    ]},
    { id: "1.2", code: "1200", name: "الأصول الثابتة", nameEn: "Fixed Assets", type: "group", balance: 700000, children: [
      { id: "1.2.1", code: "1210", name: "المعدات والأجهزة", nameEn: "Equipment", type: "account", balance: 450000 },
      { id: "1.2.2", code: "1220", name: "الأثاث", nameEn: "Furniture", type: "account", balance: 250000 },
    ]},
  ]},
  { id: "2", code: "2000", name: "الخصوم", nameEn: "Liabilities", type: "group", balance: 800000, children: [
    { id: "2.1", code: "2100", name: "الذمم الدائنة", nameEn: "Accounts Payable", type: "account", balance: 450000 },
    { id: "2.2", code: "2200", name: "ضريبة القيمة المضافة", nameEn: "VAT Payable", type: "account", balance: 120000 },
    { id: "2.3", code: "2300", name: "قروض", nameEn: "Loans", type: "account", balance: 230000 },
  ]},
  { id: "3", code: "3000", name: "حقوق الملكية", nameEn: "Equity", type: "group", balance: 1700000, children: [
    { id: "3.1", code: "3100", name: "رأس المال", nameEn: "Capital", type: "account", balance: 1500000 },
    { id: "3.2", code: "3200", name: "الأرباح المحتجزة", nameEn: "Retained Earnings", type: "account", balance: 200000 },
  ]},
  { id: "4", code: "4000", name: "الإيرادات", nameEn: "Revenue", type: "group", balance: 1250000, children: [
    { id: "4.1", code: "4100", name: "إيرادات المبيعات", nameEn: "Sales Revenue", type: "account", balance: 1100000 },
    { id: "4.2", code: "4200", name: "إيرادات أخرى", nameEn: "Other Revenue", type: "account", balance: 150000 },
  ]},
  { id: "5", code: "5000", name: "المصروفات", nameEn: "Expenses", type: "group", balance: 820000, children: [
    { id: "5.1", code: "5100", name: "الرواتب والأجور", nameEn: "Salaries & Wages", type: "account", balance: 480000 },
    { id: "5.2", code: "5200", name: "الإيجارات", nameEn: "Rent", type: "account", balance: 180000 },
    { id: "5.3", code: "5300", name: "مصروفات عامة", nameEn: "General Expenses", type: "account", balance: 160000 },
  ]},
];

interface AccountNode {
  id: string; code: string; name: string; nameEn: string; type: string; balance: number;
  children?: AccountNode[];
}

function AccountRow({ account, level, isRtl }: { account: AccountNode; level: number; isRtl: boolean }) {
  const [open, setOpen] = useState(level === 0);
  const hasChildren = account.children && account.children.length > 0;
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <>
      <tr className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors cursor-pointer" onClick={() => hasChildren && setOpen(!open)}>
        <td className="p-3" style={{ paddingInlineStart: `${level * 24 + 12}px` }}>
          <div className="flex items-center gap-2">
            {hasChildren ? (open ? <ChevronDown className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> : <Chevron className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />) : <div className="w-4" />}
            {hasChildren ? <Folder className="h-4 w-4 text-[hsl(var(--earth-brown))]" /> : <FileText className="h-4 w-4 text-[hsl(var(--earth-olive))]" />}
            <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">{account.code}</span>
            <span className={hasChildren ? "font-semibold" : ""}>{isRtl ? account.name : account.nameEn}</span>
          </div>
        </td>
        <td className="p-3 text-end font-mono">{formatCurrency(account.balance, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
      </tr>
      {open && account.children?.map(child => (
        <AccountRow key={child.id} account={child} level={level + 1} isRtl={isRtl} />
      ))}
    </>
  );
}

export default function ChartOfAccountsPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.chartOfAccounts")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "شجرة الحسابات المالية" : "Financial chart of accounts"}</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "حساب جديد" : "New Account"}</Button>
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className={cn("absolute top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]", isRtl ? "right-3" : "left-3")} />
            <Input placeholder={t("common.search")} className={cn("h-9", isRtl ? "pr-9" : "pl-9")} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-[hsl(var(--muted-foreground))]">
                  <th className="text-start p-3 font-medium">{isRtl ? "الحساب" : "Account"}</th>
                  <th className="text-end p-3 font-medium">{isRtl ? "الرصيد" : "Balance"}</th>
                </tr>
              </thead>
              <tbody>
                {CHART_OF_ACCOUNTS.map(account => (
                  <AccountRow key={account.id} account={account} level={0} isRtl={isRtl} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

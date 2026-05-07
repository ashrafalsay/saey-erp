"use client";

import React from "react";
import {
  Users,
  Package,
  FileText,
  Truck,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { useAuthStore } from "@/stores/auth-store";
import { cn, formatCurrency } from "@/lib/utils";

const DEMO_STATS = {
  totalRevenue: 1250000,
  totalExpenses: 820000,
  netProfit: 430000,
  totalCustomers: 156,
  totalEmployees: 42,
  totalProducts: 384,
  totalInvoices: 1247,
  totalSuppliers: 38,
};

const DEMO_RECENT_INVOICES = [
  { id: "1", number: "INV-001247", customer: "شركة الفيصل التجارية", customerEn: "Al-Faisal Trading Co.", amount: 15750, status: "paid", date: "2024-01-15" },
  { id: "2", number: "INV-001246", customer: "مؤسسة النور", customerEn: "Al-Noor Est.", amount: 8400, status: "sent", date: "2024-01-14" },
  { id: "3", number: "INV-001245", customer: "شركة المدار للتقنية", customerEn: "Al-Madar Technology", amount: 32000, status: "overdue", date: "2024-01-10" },
  { id: "4", number: "INV-001244", customer: "مصنع الخليج", customerEn: "Gulf Factory", amount: 5600, status: "draft", date: "2024-01-13" },
  { id: "5", number: "INV-001243", customer: "شركة الأفق", customerEn: "Al-Ofoq Co.", amount: 21300, status: "partial", date: "2024-01-12" },
];

const DEMO_MONTHLY_SALES = [
  { month: "Jan", sales: 120000 },
  { month: "Feb", sales: 135000 },
  { month: "Mar", sales: 148000 },
  { month: "Apr", sales: 142000 },
  { month: "May", sales: 165000 },
  { month: "Jun", sales: 178000 },
  { month: "Jul", sales: 190000 },
  { month: "Aug", sales: 172000 },
  { month: "Sep", sales: 195000 },
  { month: "Oct", sales: 210000 },
  { month: "Nov", sales: 225000 },
  { month: "Dec", sales: 245000 },
];

export default function DashboardPage() {
  const { t, isRtl } = useTranslation();
  const { user } = useAuthStore();

  const statusBadge = (status: string) => {
    const map: Record<string, { variant: "success" | "default" | "warning" | "destructive" | "secondary"; label: string }> = {
      paid: { variant: "success", label: isRtl ? "مدفوع" : "Paid" },
      sent: { variant: "default", label: isRtl ? "مرسل" : "Sent" },
      overdue: { variant: "destructive", label: isRtl ? "متأخر" : "Overdue" },
      draft: { variant: "secondary", label: isRtl ? "مسودة" : "Draft" },
      partial: { variant: "warning", label: isRtl ? "جزئي" : "Partial" },
    };
    const config = map[status] || { variant: "secondary" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const maxSales = Math.max(...DEMO_MONTHLY_SALES.map(d => d.sales));

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {t("dashboard.welcome")}، {user?.firstName || (isRtl ? "أحمد" : "Ahmed")} 👋
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">
            {isRtl ? "إليك نظرة عامة على أعمالك اليوم" : "Here's an overview of your business today"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Plus className="h-4 w-4 me-1" />
            {t("dashboard.newInvoice")}
          </Button>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 me-1" />
            {t("dashboard.newCustomer")}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: t("dashboard.totalRevenue"),
            value: formatCurrency(DEMO_STATS.totalRevenue, "SAR", isRtl ? "ar-SA" : "en-SA"),
            icon: DollarSign,
            change: "+12.5%",
            trend: "up" as const,
            color: "text-emerald-600",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
          },
          {
            title: t("dashboard.totalCustomers"),
            value: DEMO_STATS.totalCustomers.toString(),
            icon: Users,
            change: "+8",
            trend: "up" as const,
            color: "text-blue-600",
            bg: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            title: t("dashboard.totalProducts"),
            value: DEMO_STATS.totalProducts.toString(),
            icon: Package,
            change: "+24",
            trend: "up" as const,
            color: "text-violet-600",
            bg: "bg-violet-50 dark:bg-violet-900/20",
          },
          {
            title: t("dashboard.totalInvoices"),
            value: DEMO_STATS.totalInvoices.toString(),
            icon: FileText,
            change: "+47",
            trend: "up" as const,
            color: "text-amber-600",
            bg: "bg-amber-50 dark:bg-amber-900/20",
          },
        ].map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={cn("text-xs font-medium", stat.trend === "up" ? "text-emerald-500" : "text-red-500")}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      {isRtl ? "هذا الشهر" : "this month"}
                    </span>
                  </div>
                </div>
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", stat.bg)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Sales Chart */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">{t("dashboard.salesChart")}</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              {isRtl ? "عرض التقارير" : "View Reports"} <ArrowUpRight className="h-3 w-3 ms-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-end gap-2">
              {DEMO_MONTHLY_SALES.map((item) => (
                <div key={item.month} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-[hsl(var(--primary))]/80 hover:bg-[hsl(var(--primary))] transition-colors min-h-[4px]"
                    style={{ height: `${(item.sales / maxSales) * 200}px` }}
                  />
                  <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">{t("dashboard.quickActions")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { icon: FileText, label: t("dashboard.newInvoice"), color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
              { icon: Users, label: t("dashboard.newCustomer"), color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
              { icon: Package, label: t("dashboard.newProduct"), color: "text-violet-600 bg-violet-50 dark:bg-violet-900/20" },
              { icon: Users, label: t("dashboard.newEmployee"), color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
              { icon: ShoppingCart, label: isRtl ? "أمر بيع جديد" : "New Sales Order", color: "text-pink-600 bg-pink-50 dark:bg-pink-900/20" },
              { icon: Truck, label: isRtl ? "مورد جديد" : "New Supplier", color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20" },
            ].map((action) => (
              <button
                key={action.label}
                className="flex w-full items-center gap-3 rounded-lg p-3 text-sm hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", action.color)}>
                  <action.icon className="h-4 w-4" />
                </div>
                <span className="font-medium">{action.label}</span>
                <ArrowUpRight className="h-4 w-4 ms-auto text-[hsl(var(--muted-foreground))]" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">{t("dashboard.recentInvoices")}</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">
            {isRtl ? "عرض الكل" : "View All"} <ArrowUpRight className="h-3 w-3 ms-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{isRtl ? "رقم الفاتورة" : "Invoice #"}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{isRtl ? "العميل" : "Customer"}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.amount")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.status")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.date")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {DEMO_RECENT_INVOICES.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="py-3 font-medium">{invoice.number}</td>
                    <td className="py-3">{isRtl ? invoice.customer : invoice.customerEn}</td>
                    <td className="py-3 font-medium" dir="ltr">
                      {formatCurrency(invoice.amount, "SAR", isRtl ? "ar-SA" : "en-SA")}
                    </td>
                    <td className="py-3">{statusBadge(invoice.status)}</td>
                    <td className="py-3 text-[hsl(var(--muted-foreground))]">{invoice.date}</td>
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

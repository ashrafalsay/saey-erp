"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

const DEMO_ORDERS = [
  { id: "1", number: "SO-0234", customer: "شركة الفيصل التجارية", customerEn: "Al-Faisal Trading Co.", items: 5, amount: 45000, date: "2024-01-15", status: "confirmed" },
  { id: "2", number: "SO-0233", customer: "مؤسسة النور", customerEn: "Al-Noor Est.", items: 3, amount: 12500, date: "2024-01-14", status: "shipped" },
  { id: "3", number: "SO-0232", customer: "شركة المدار للتقنية", customerEn: "Al-Madar Technology", items: 8, amount: 78000, date: "2024-01-13", status: "delivered" },
  { id: "4", number: "SO-0231", customer: "مصنع الخليج", customerEn: "Gulf Factory", items: 2, amount: 23400, date: "2024-01-12", status: "draft" },
  { id: "5", number: "SO-0230", customer: "شركة الأفق", customerEn: "Al-Ofoq Co.", items: 12, amount: 156000, date: "2024-01-11", status: "confirmed" },
  { id: "6", number: "SO-0229", customer: "مؤسسة البناء", customerEn: "Construction Est.", items: 1, amount: 8900, date: "2024-01-10", status: "cancelled" },
];

export default function SalesOrdersPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_ORDERS.filter(o =>
    (isRtl ? o.customer : o.customerEn).toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    const map: Record<string, { variant: "success" | "warning" | "destructive" | "secondary" | "default"; label: string }> = {
      draft: { variant: "secondary", label: isRtl ? "مسودة" : "Draft" },
      confirmed: { variant: "default", label: isRtl ? "مؤكد" : "Confirmed" },
      shipped: { variant: "warning", label: isRtl ? "تم الشحن" : "Shipped" },
      delivered: { variant: "success", label: isRtl ? "تم التسليم" : "Delivered" },
      cancelled: { variant: "destructive", label: isRtl ? "ملغي" : "Cancelled" },
    };
    const config = map[status] || { variant: "secondary" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.salesOrders")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "أوامر البيع" : "Sales orders"}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 me-1" /> {t("common.export")}</Button>
          <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "أمر بيع جديد" : "New Order"}</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: isRtl ? "إجمالي الطلبات" : "Total Orders", value: "234", color: "text-[hsl(var(--earth-brown))] bg-[hsl(var(--earth-beige))]" },
          { label: isRtl ? "مؤكدة" : "Confirmed", value: "156", color: "text-[hsl(var(--earth-olive))] bg-[hsl(var(--earth-beige))]" },
          { label: isRtl ? "قيد الشحن" : "Shipping", value: "45", color: "text-amber-600 bg-amber-50" },
          { label: isRtl ? "تم التسليم" : "Delivered", value: "189", color: "text-[hsl(var(--earth-forest))] bg-[hsl(var(--earth-beige))]" },
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
                  <th className="text-start p-3 font-medium">{isRtl ? "الرقم" : "#"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "العميل" : "Customer"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "المنتجات" : "Items"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "المبلغ" : "Amount"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "التاريخ" : "Date"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الحالة" : "Status"}</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="p-3 font-mono text-xs">{order.number}</td>
                    <td className="p-3 font-medium">{isRtl ? order.customer : order.customerEn}</td>
                    <td className="p-3">{order.items}</td>
                    <td className="p-3 font-mono">{formatCurrency(order.amount, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="p-3">{order.date}</td>
                    <td className="p-3">{statusBadge(order.status)}</td>
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

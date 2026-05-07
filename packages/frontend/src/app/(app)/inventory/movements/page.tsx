"use client";

import React, { useState } from "react";
import { Search, Filter, Download, ArrowRight, ArrowLeftRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const DEMO_MOVEMENTS = [
  { id: "1", number: "MOV-0089", product: "لابتوب Dell", productEn: "Dell Laptop", from: "المستودع الرئيسي", fromEn: "Main Warehouse", to: "مستودع جدة", toEn: "Jeddah Warehouse", qty: 10, date: "2024-01-15", status: "completed" },
  { id: "2", number: "MOV-0088", product: "طابعة HP", productEn: "HP Printer", from: "مستودع الدمام", fromEn: "Dammam Warehouse", to: "المستودع الرئيسي", toEn: "Main Warehouse", qty: 5, date: "2024-01-14", status: "in_transit" },
  { id: "3", number: "MOV-0087", product: "شاشة Samsung", productEn: "Samsung Monitor", from: "المستودع الرئيسي", fromEn: "Main Warehouse", to: "مستودع جدة", toEn: "Jeddah Warehouse", qty: 20, date: "2024-01-13", status: "completed" },
  { id: "4", number: "MOV-0086", product: "كرسي مكتبي", productEn: "Office Chair", from: "مستودع جدة", fromEn: "Jeddah Warehouse", to: "مستودع الدمام", toEn: "Dammam Warehouse", qty: 15, date: "2024-01-12", status: "pending" },
  { id: "5", number: "MOV-0085", product: "ماوس لوجيتك", productEn: "Logitech Mouse", from: "المستودع الرئيسي", fromEn: "Main Warehouse", to: "مستودع الدمام", toEn: "Dammam Warehouse", qty: 50, date: "2024-01-11", status: "completed" },
];

export default function StockMovementsPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_MOVEMENTS.filter(m =>
    (isRtl ? m.product : m.productEn).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.stockMovements")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "حركة المخزون بين المستودعات" : "Stock transfers between warehouses"}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 me-1" /> {t("common.export")}</Button>
          <Button size="sm"><ArrowLeftRight className="h-4 w-4 me-1" /> {isRtl ? "تحويل جديد" : "New Transfer"}</Button>
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
                  <th className="text-start p-3 font-medium">{isRtl ? "المنتج" : "Product"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "من" : "From"}</th>
                  <th className="text-start p-3 font-medium"></th>
                  <th className="text-start p-3 font-medium">{isRtl ? "إلى" : "To"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الكمية" : "Qty"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "التاريخ" : "Date"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الحالة" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((mov) => (
                  <tr key={mov.id} className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="p-3 font-mono text-xs">{mov.number}</td>
                    <td className="p-3 font-medium">{isRtl ? mov.product : mov.productEn}</td>
                    <td className="p-3 text-sm">{isRtl ? mov.from : mov.fromEn}</td>
                    <td className="p-3"><ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /></td>
                    <td className="p-3 text-sm">{isRtl ? mov.to : mov.toEn}</td>
                    <td className="p-3 font-mono">{mov.qty}</td>
                    <td className="p-3">{mov.date}</td>
                    <td className="p-3">
                      <Badge variant={mov.status === "completed" ? "success" : mov.status === "in_transit" ? "default" : "warning"}>
                        {mov.status === "completed" ? (isRtl ? "مكتمل" : "Completed") : mov.status === "in_transit" ? (isRtl ? "في الطريق" : "In Transit") : (isRtl ? "معلق" : "Pending")}
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

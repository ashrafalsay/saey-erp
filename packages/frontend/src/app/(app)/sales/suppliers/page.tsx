"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download, MoreHorizontal, Truck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

const DEMO_SUPPLIERS = [
  { id: "1", name: "شركة التوريدات السعودية", nameEn: "Saudi Supply Co.", contact: "0551234567", city: "الرياض", cityEn: "Riyadh", balance: 45000, status: "active" },
  { id: "2", name: "مصنع الخليج للبلاستيك", nameEn: "Gulf Plastic Factory", contact: "0559876543", city: "جدة", cityEn: "Jeddah", balance: 78000, status: "active" },
  { id: "3", name: "شركة الإمداد اللوجستي", nameEn: "Logistics Supply Co.", contact: "0541112233", city: "الدمام", cityEn: "Dammam", balance: 23000, status: "active" },
  { id: "4", name: "مؤسسة التقنية المتقدمة", nameEn: "Advanced Tech Est.", contact: "0533445566", city: "الرياض", cityEn: "Riyadh", balance: 0, status: "inactive" },
  { id: "5", name: "شركة المواد الخام", nameEn: "Raw Materials Co.", contact: "0567788990", city: "ينبع", cityEn: "Yanbu", balance: 156000, status: "active" },
];

export default function SuppliersPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_SUPPLIERS.filter(s =>
    (isRtl ? s.name : s.nameEn).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.suppliers")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "إدارة الموردين" : "Supplier management"}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 me-1" /> {t("common.export")}</Button>
          <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "مورد جديد" : "New Supplier"}</Button>
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
                  <th className="text-start p-3 font-medium">{isRtl ? "المورد" : "Supplier"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الهاتف" : "Phone"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "المدينة" : "City"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الرصيد" : "Balance"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الحالة" : "Status"}</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sup) => (
                  <tr key={sup.id} className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--earth-beige))] text-[hsl(var(--earth-brown))]">
                          <Truck className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{isRtl ? sup.name : sup.nameEn}</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-xs" dir="ltr">{sup.contact}</td>
                    <td className="p-3">{isRtl ? sup.city : sup.cityEn}</td>
                    <td className="p-3 font-mono">{formatCurrency(sup.balance, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="p-3">
                      <Badge variant={sup.status === "active" ? "success" : "secondary"}>
                        {sup.status === "active" ? (isRtl ? "نشط" : "Active") : (isRtl ? "غير نشط" : "Inactive")}
                      </Badge>
                    </td>
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

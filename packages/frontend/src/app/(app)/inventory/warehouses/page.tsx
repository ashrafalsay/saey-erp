"use client";

import React from "react";
import { Plus, Warehouse, MapPin, Package, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const DEMO_WAREHOUSES = [
  { id: "1", name: "المستودع الرئيسي", nameEn: "Main Warehouse", location: "الرياض", locationEn: "Riyadh", manager: "محمد الغامدي", managerEn: "Mohammed Al-Ghamdi", products: 245, capacity: 85, status: "active" },
  { id: "2", name: "مستودع جدة", nameEn: "Jeddah Warehouse", location: "جدة", locationEn: "Jeddah", manager: "عبدالله السعيد", managerEn: "Abdullah Al-Saeed", products: 89, capacity: 60, status: "active" },
  { id: "3", name: "مستودع الدمام", nameEn: "Dammam Warehouse", location: "الدمام", locationEn: "Dammam", manager: "فهد العمري", managerEn: "Fahd Al-Omari", products: 50, capacity: 35, status: "active" },
  { id: "4", name: "مستودع المدينة", nameEn: "Madinah Warehouse", location: "المدينة المنورة", locationEn: "Madinah", manager: "-", managerEn: "-", products: 0, capacity: 0, status: "inactive" },
];

export default function WarehousesPage() {
  const { t, isRtl } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.warehouses")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "إدارة المستودعات" : "Warehouse management"}</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "مستودع جديد" : "New Warehouse"}</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {DEMO_WAREHOUSES.map(wh => (
          <Card key={wh.id} className="rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--earth-beige))] text-[hsl(var(--earth-brown))]">
                    <Warehouse className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{isRtl ? wh.name : wh.nameEn}</h3>
                    <div className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))]">
                      <MapPin className="h-3 w-3" /> {isRtl ? wh.location : wh.locationEn}
                    </div>
                  </div>
                </div>
                <Badge variant={wh.status === "active" ? "success" : "secondary"}>
                  {wh.status === "active" ? (isRtl ? "نشط" : "Active") : (isRtl ? "غير نشط" : "Inactive")}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <Package className="h-4 w-4 mx-auto text-[hsl(var(--muted-foreground))] mb-1" />
                  <p className="text-lg font-bold">{wh.products}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{isRtl ? "منتج" : "Products"}</p>
                </div>
                <div className="text-center">
                  <div className="h-4 w-4 mx-auto mb-1 text-[hsl(var(--muted-foreground))] text-xs font-bold">%</div>
                  <p className="text-lg font-bold">{wh.capacity}%</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{isRtl ? "السعة" : "Capacity"}</p>
                </div>
                <div className="text-center">
                  <Users className="h-4 w-4 mx-auto text-[hsl(var(--muted-foreground))] mb-1" />
                  <p className="text-sm font-medium">{isRtl ? wh.manager : wh.managerEn}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{isRtl ? "المدير" : "Manager"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

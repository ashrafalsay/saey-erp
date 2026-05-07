"use client";

import React, { useState } from "react";
import { Plus, Search, Package, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const DEMO_CATEGORIES = [
  { id: "1", name: "إلكترونيات", nameEn: "Electronics", products: 85, status: "active" },
  { id: "2", name: "أثاث مكتبي", nameEn: "Office Furniture", products: 42, status: "active" },
  { id: "3", name: "مستلزمات مكتبية", nameEn: "Office Supplies", products: 120, status: "active" },
  { id: "4", name: "أجهزة كمبيوتر", nameEn: "Computers", products: 56, status: "active" },
  { id: "5", name: "طابعات وملحقات", nameEn: "Printers & Accessories", products: 38, status: "active" },
  { id: "6", name: "أدوات صيانة", nameEn: "Maintenance Tools", products: 25, status: "inactive" },
  { id: "7", name: "مواد تغليف", nameEn: "Packaging Materials", products: 18, status: "active" },
];

export default function CategoriesPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_CATEGORIES.filter(c =>
    (isRtl ? c.name : c.nameEn).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.categories")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "تصنيفات المنتجات" : "Product categories"}</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "تصنيف جديد" : "New Category"}</Button>
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className={cn("absolute top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]", isRtl ? "right-3" : "left-3")} />
            <Input placeholder={t("common.search")} className={cn("h-9", isRtl ? "pr-9" : "pl-9")} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(cat => (
              <div key={cat.id} className="flex items-center gap-3 p-4 rounded-xl border hover:bg-[hsl(var(--muted))]/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--earth-beige))] text-[hsl(var(--earth-brown))]">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{isRtl ? cat.name : cat.nameEn}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{cat.products} {isRtl ? "منتج" : "products"}</p>
                </div>
                <Badge variant={cat.status === "active" ? "success" : "secondary"}>
                  {cat.status === "active" ? (isRtl ? "نشط" : "Active") : (isRtl ? "غير نشط" : "Inactive")}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

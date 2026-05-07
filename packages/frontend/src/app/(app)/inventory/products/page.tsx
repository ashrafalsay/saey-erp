"use client";

import React from "react";
import { Plus, Search, Filter, Download, MoreHorizontal, Package, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

const DEMO_PRODUCTS = [
  { id: "1", sku: "PRD-001", name: "لابتوب ديل انسبيرون 15", nameEn: "Dell Inspiron 15 Laptop", category: "إلكترونيات", categoryEn: "Electronics", costPrice: 2800, salePrice: 3500, stock: 45, status: "in_stock" },
  { id: "2", sku: "PRD-002", name: "طابعة HP ليزرجت", nameEn: "HP LaserJet Printer", category: "إلكترونيات", categoryEn: "Electronics", costPrice: 1200, salePrice: 1650, stock: 3, status: "low_stock" },
  { id: "3", sku: "PRD-003", name: "كرسي مكتبي فاخر", nameEn: "Executive Office Chair", category: "أثاث مكتبي", categoryEn: "Office Furniture", costPrice: 800, salePrice: 1200, stock: 18, status: "in_stock" },
  { id: "4", sku: "PRD-004", name: "شاشة سامسونج 27 بوصة", nameEn: "Samsung 27\" Monitor", category: "إلكترونيات", categoryEn: "Electronics", costPrice: 1500, salePrice: 2100, stock: 0, status: "out_of_stock" },
  { id: "5", sku: "PRD-005", name: "مكتب خشبي كلاسيكي", nameEn: "Classic Wooden Desk", category: "أثاث مكتبي", categoryEn: "Office Furniture", costPrice: 1800, salePrice: 2500, stock: 12, status: "in_stock" },
  { id: "6", sku: "PRD-006", name: "ورق طباعة A4 - 5 رزم", nameEn: "A4 Paper - 5 Reams", category: "مستلزمات مكتبية", categoryEn: "Office Supplies", costPrice: 45, salePrice: 65, stock: 200, status: "in_stock" },
];

export default function ProductsPage() {
  const { t, isRtl } = useTranslation();

  const stockBadge = (status: string) => {
    const map: Record<string, { variant: "success" | "warning" | "destructive"; label: string }> = {
      in_stock: { variant: "success", label: t("inventory.inStock") },
      low_stock: { variant: "warning", label: t("inventory.lowStock") },
      out_of_stock: { variant: "destructive", label: t("inventory.outOfStock") },
    };
    const config = map[status] || { variant: "success" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("inventory.products")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">
            {isRtl ? "إدارة المنتجات والمخزون" : "Manage products and inventory"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 me-1" /> {t("common.export")}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 me-1" /> {t("inventory.addProduct")}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: isRtl ? "إجمالي المنتجات" : "Total Products", value: "384", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20", icon: Package },
          { label: t("inventory.inStock"), value: "341", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20", icon: Package },
          { label: t("inventory.lowStock"), value: "28", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20", icon: AlertTriangle },
          { label: t("inventory.outOfStock"), value: "15", color: "text-red-600 bg-red-50 dark:bg-red-900/20", icon: AlertTriangle },
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
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("inventory.sku")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.name")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("inventory.category")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("inventory.costPrice")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("inventory.salePrice")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("inventory.stock")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.status")}</th>
                  <th className="pb-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {DEMO_PRODUCTS.map((product) => (
                  <tr key={product.id} className="hover:bg-[hsl(var(--muted))]/50 transition-colors cursor-pointer">
                    <td className="py-3 font-mono text-xs">{product.sku}</td>
                    <td className="py-3 font-medium">{isRtl ? product.name : product.nameEn}</td>
                    <td className="py-3 text-[hsl(var(--muted-foreground))]">{isRtl ? product.category : product.categoryEn}</td>
                    <td className="py-3" dir="ltr">{formatCurrency(product.costPrice, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="py-3 font-medium" dir="ltr">{formatCurrency(product.salePrice, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="py-3">{product.stock}</td>
                    <td className="py-3">{stockBadge(product.status)}</td>
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

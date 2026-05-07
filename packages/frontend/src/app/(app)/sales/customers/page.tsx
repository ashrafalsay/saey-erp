"use client";

import React from "react";
import { Plus, Search, Filter, Download, MoreHorizontal, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

const DEMO_CUSTOMERS = [
  { id: "1", number: "CUST-00001", name: "شركة الفيصل التجارية", nameEn: "Al-Faisal Trading Co.", type: "company", phone: "+966 55 123 4567", email: "info@alfaisal.sa", city: "الرياض", cityEn: "Riyadh", balance: 45750, status: "active" },
  { id: "2", number: "CUST-00002", name: "مؤسسة النور للتجارة", nameEn: "Al-Noor Trading Est.", type: "company", phone: "+966 50 987 6543", email: "contact@alnoor.sa", city: "جدة", cityEn: "Jeddah", balance: 12300, status: "active" },
  { id: "3", number: "CUST-00003", name: "شركة المدار للتقنية", nameEn: "Al-Madar Technology Co.", type: "company", phone: "+966 56 456 7890", email: "info@almadar.tech", city: "الدمام", cityEn: "Dammam", balance: 78900, status: "active" },
  { id: "4", number: "CUST-00004", name: "أحمد بن سعد الشهري", nameEn: "Ahmed bin Saad Al-Shahri", type: "individual", phone: "+966 54 321 0987", email: "ahmed.shahri@email.com", city: "الرياض", cityEn: "Riyadh", balance: 3200, status: "active" },
  { id: "5", number: "CUST-00005", name: "مصنع الخليج الصناعي", nameEn: "Gulf Industrial Factory", type: "company", phone: "+966 53 111 2222", email: "sales@gulfind.sa", city: "الجبيل", cityEn: "Jubail", balance: 156000, status: "inactive" },
];

export default function CustomersPage() {
  const { t, isRtl } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("sales.customers")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">
            {isRtl ? "إدارة العملاء وبياناتهم" : "Manage customers and their data"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 me-1" /> {t("common.export")}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 me-1" /> {t("sales.addCustomer")}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: isRtl ? "إجمالي العملاء" : "Total Customers", value: "156", icon: Users, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
          { label: isRtl ? "شركات" : "Companies", value: "124", icon: Users, color: "text-violet-600 bg-violet-50 dark:bg-violet-900/20" },
          { label: isRtl ? "أفراد" : "Individuals", value: "32", icon: Users, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
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
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("sales.customerNumber")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.name")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.phone")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.city")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{isRtl ? "الرصيد" : "Balance"}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.status")}</th>
                  <th className="pb-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {DEMO_CUSTOMERS.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[hsl(var(--muted))]/50 transition-colors cursor-pointer">
                    <td className="py-3 font-mono text-xs">{customer.number}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-xs font-bold">
                          {(isRtl ? customer.name : customer.nameEn).split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium">{isRtl ? customer.name : customer.nameEn}</p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3" dir="ltr">{customer.phone}</td>
                    <td className="py-3">{isRtl ? customer.city : customer.cityEn}</td>
                    <td className="py-3 font-medium" dir="ltr">{formatCurrency(customer.balance, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="py-3">
                      <Badge variant={customer.status === "active" ? "success" : "secondary"}>
                        {customer.status === "active" ? t("common.active") : t("common.inactive")}
                      </Badge>
                    </td>
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

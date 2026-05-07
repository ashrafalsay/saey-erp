"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download, Building2, Users, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn, formatCurrency } from "@/lib/utils";

const DEMO_DEPARTMENTS = [
  { id: "1", name: "تقنية المعلومات", nameEn: "Information Technology", manager: "أحمد محمد", managerEn: "Ahmed Mohammed", employees: 12, budget: 250000, status: "active" },
  { id: "2", name: "المحاسبة والمالية", nameEn: "Accounting & Finance", manager: "سارة عبدالله", managerEn: "Sara Abdullah", employees: 8, budget: 180000, status: "active" },
  { id: "3", name: "المبيعات", nameEn: "Sales", manager: "خالد العتيبي", managerEn: "Khalid Al-Otaibi", employees: 15, budget: 320000, status: "active" },
  { id: "4", name: "الموارد البشرية", nameEn: "Human Resources", manager: "فاطمة الحربي", managerEn: "Fatima Al-Harbi", employees: 5, budget: 120000, status: "active" },
  { id: "5", name: "المخزون والمستودعات", nameEn: "Warehouse & Inventory", manager: "محمد الغامدي", managerEn: "Mohammed Al-Ghamdi", employees: 10, budget: 200000, status: "active" },
  { id: "6", name: "خدمة العملاء", nameEn: "Customer Service", manager: "نورة الشمري", managerEn: "Noura Al-Shammari", employees: 7, budget: 150000, status: "inactive" },
];

export default function DepartmentsPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_DEPARTMENTS.filter(d =>
    (isRtl ? d.name : d.nameEn).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.departments")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">
            {isRtl ? `${DEMO_DEPARTMENTS.length} أقسام` : `${DEMO_DEPARTMENTS.length} departments`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 me-1" /> {t("common.export")}</Button>
          <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "قسم جديد" : "New Department"}</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: isRtl ? "إجمالي الأقسام" : "Total Departments", value: "6", color: "text-[hsl(var(--earth-brown))] bg-[hsl(var(--earth-beige))]" },
          { label: isRtl ? "أقسام نشطة" : "Active", value: "5", color: "text-[hsl(var(--earth-olive))] bg-[hsl(var(--earth-beige))]" },
          { label: isRtl ? "إجمالي الموظفين" : "Total Employees", value: "57", color: "text-[hsl(var(--earth-forest))] bg-[hsl(var(--earth-beige))]" },
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-[hsl(var(--muted-foreground))]">
                  <th className="text-start p-3 font-medium">{isRtl ? "القسم" : "Department"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "المدير" : "Manager"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الموظفين" : "Employees"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الميزانية" : "Budget"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الحالة" : "Status"}</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((dept) => (
                  <tr key={dept.id} className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="p-3 font-medium">{isRtl ? dept.name : dept.nameEn}</td>
                    <td className="p-3">{isRtl ? dept.manager : dept.managerEn}</td>
                    <td className="p-3">{dept.employees}</td>
                    <td className="p-3">{formatCurrency(dept.budget, "SAR", isRtl ? "ar-SA" : "en-SA")}</td>
                    <td className="p-3">
                      <Badge variant={dept.status === "active" ? "success" : "secondary"}>
                        {dept.status === "active" ? (isRtl ? "نشط" : "Active") : (isRtl ? "غير نشط" : "Inactive")}
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

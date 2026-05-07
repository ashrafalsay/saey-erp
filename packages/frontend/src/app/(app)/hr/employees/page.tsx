"use client";

import React from "react";
import { Plus, Search, Filter, Download, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const DEMO_EMPLOYEES = [
  { id: "1", number: "EMP-001", name: "أحمد محمد الفيصل", nameEn: "Ahmed Mohammed Al-Faisal", department: "تقنية المعلومات", departmentEn: "IT", position: "مدير تقنية المعلومات", positionEn: "IT Manager", status: "active", salary: 18000 },
  { id: "2", number: "EMP-002", name: "سارة عبدالله", nameEn: "Sara Abdullah", department: "المحاسبة", departmentEn: "Accounting", position: "محاسب أول", positionEn: "Senior Accountant", status: "active", salary: 12000 },
  { id: "3", number: "EMP-003", name: "خالد العتيبي", nameEn: "Khalid Al-Otaibi", department: "المبيعات", departmentEn: "Sales", position: "مدير مبيعات", positionEn: "Sales Manager", status: "active", salary: 15000 },
  { id: "4", number: "EMP-004", name: "فاطمة الحربي", nameEn: "Fatima Al-Harbi", department: "الموارد البشرية", departmentEn: "HR", position: "أخصائي موارد بشرية", positionEn: "HR Specialist", status: "on_leave", salary: 10000 },
  { id: "5", number: "EMP-005", name: "محمد الغامدي", nameEn: "Mohammed Al-Ghamdi", department: "المخزون", departmentEn: "Warehouse", position: "مدير مستودع", positionEn: "Warehouse Manager", status: "active", salary: 11000 },
  { id: "6", number: "EMP-006", name: "نورة الشمري", nameEn: "Noura Al-Shammari", department: "تقنية المعلومات", departmentEn: "IT", position: "مطور أنظمة", positionEn: "System Developer", status: "active", salary: 14000 },
];

export default function EmployeesPage() {
  const { t, isRtl } = useTranslation();

  const statusBadge = (status: string) => {
    const map: Record<string, { variant: "success" | "warning" | "destructive" | "secondary"; label: string }> = {
      active: { variant: "success", label: isRtl ? "نشط" : "Active" },
      on_leave: { variant: "warning", label: isRtl ? "في إجازة" : "On Leave" },
      inactive: { variant: "secondary", label: isRtl ? "غير نشط" : "Inactive" },
      terminated: { variant: "destructive", label: isRtl ? "منتهي" : "Terminated" },
    };
    const config = map[status] || { variant: "secondary" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("employees.title")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">
            {isRtl ? `${DEMO_EMPLOYEES.length} موظف مسجل` : `${DEMO_EMPLOYEES.length} employees registered`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 me-1" /> {t("common.export")}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 me-1" /> {t("employees.addEmployee")}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: isRtl ? "إجمالي الموظفين" : "Total Employees", value: "42", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
          { label: isRtl ? "موظفين نشطين" : "Active", value: "38", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: isRtl ? "في إجازة" : "On Leave", value: "3", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
          { label: isRtl ? "أقسام" : "Departments", value: "6", color: "text-violet-600 bg-violet-50 dark:bg-violet-900/20" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold", stat.color)}>
                {stat.value}
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</p>
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
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("employees.employeeNumber")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.name")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("employees.department")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("employees.position")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("common.status")}</th>
                  <th className="pb-3 text-start font-medium text-[hsl(var(--muted-foreground))]">{t("employees.salary")}</th>
                  <th className="pb-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {DEMO_EMPLOYEES.map((emp) => (
                  <tr key={emp.id} className="hover:bg-[hsl(var(--muted))]/50 transition-colors cursor-pointer">
                    <td className="py-3 font-mono text-xs">{emp.number}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-xs font-bold">
                          {(isRtl ? emp.name : emp.nameEn).split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium">{isRtl ? emp.name : emp.nameEn}</span>
                      </div>
                    </td>
                    <td className="py-3">{isRtl ? emp.department : emp.departmentEn}</td>
                    <td className="py-3">{isRtl ? emp.position : emp.positionEn}</td>
                    <td className="py-3">{statusBadge(emp.status)}</td>
                    <td className="py-3 font-medium" dir="ltr">{emp.salary.toLocaleString()} SAR</td>
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

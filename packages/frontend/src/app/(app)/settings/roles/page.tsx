"use client";

import React from "react";
import { Plus, Shield, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";

const DEMO_ROLES = [
  { id: "1", name: "مدير النظام", nameEn: "Super Admin", users: 2, permissions: 80, color: "bg-red-100 text-red-700" },
  { id: "2", name: "مدير", nameEn: "Manager", users: 5, permissions: 65, color: "bg-[hsl(var(--earth-beige))] text-[hsl(var(--earth-brown))]" },
  { id: "3", name: "محاسب", nameEn: "Accountant", users: 4, permissions: 25, color: "bg-blue-100 text-blue-700" },
  { id: "4", name: "مدير مبيعات", nameEn: "Sales Manager", users: 3, permissions: 30, color: "bg-green-100 text-green-700" },
  { id: "5", name: "موارد بشرية", nameEn: "HR Specialist", users: 2, permissions: 20, color: "bg-purple-100 text-purple-700" },
  { id: "6", name: "مدير مستودع", nameEn: "Warehouse Manager", users: 3, permissions: 18, color: "bg-amber-100 text-amber-700" },
  { id: "7", name: "موظف", nameEn: "Employee", users: 20, permissions: 8, color: "bg-gray-100 text-gray-700" },
  { id: "8", name: "مشاهد فقط", nameEn: "Viewer", users: 5, permissions: 5, color: "bg-gray-50 text-gray-500" },
];

export default function RolesPage() {
  const { t, isRtl } = useTranslation();
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.roles")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "الأدوار والصلاحيات" : "Roles and permissions"}</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "دور جديد" : "New Role"}</Button>
      </div>

      <div className="grid gap-3">
        {DEMO_ROLES.map(role => (
          <Card key={role.id} className="rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${role.color}`}>
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{isRtl ? role.name : role.nameEn}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {role.permissions} {isRtl ? "صلاحية" : "permissions"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))]">
                  <Users className="h-4 w-4" />
                  <span>{role.users}</span>
                </div>
                <Chevron className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

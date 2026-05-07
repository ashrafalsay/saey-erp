"use client";

import React from "react";
import { Plus, MapPin, Phone, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";

const DEMO_BRANCHES = [
  { id: "1", name: "الفرع الرئيسي", nameEn: "Main Branch", city: "الرياض", cityEn: "Riyadh", phone: "011-234-5678", employees: 25, status: "active" },
  { id: "2", name: "فرع جدة", nameEn: "Jeddah Branch", city: "جدة", cityEn: "Jeddah", phone: "012-345-6789", employees: 12, status: "active" },
  { id: "3", name: "فرع الدمام", nameEn: "Dammam Branch", city: "الدمام", cityEn: "Dammam", phone: "013-456-7890", employees: 8, status: "active" },
  { id: "4", name: "فرع المدينة", nameEn: "Madinah Branch", city: "المدينة", cityEn: "Madinah", phone: "-", employees: 0, status: "inactive" },
];

export default function BranchesPage() {
  const { t, isRtl } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.branches")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "إدارة فروع الشركة" : "Company branches management"}</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "فرع جديد" : "New Branch"}</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {DEMO_BRANCHES.map(branch => (
          <Card key={branch.id} className="rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg">{isRtl ? branch.name : branch.nameEn}</h3>
                <Badge variant={branch.status === "active" ? "success" : "secondary"}>
                  {branch.status === "active" ? (isRtl ? "نشط" : "Active") : (isRtl ? "غير نشط" : "Inactive")}
                </Badge>
              </div>
              <div className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {isRtl ? branch.city : branch.cityEn}</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> <span dir="ltr">{branch.phone}</span></div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4" /> {branch.employees} {isRtl ? "موظف" : "employees"}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

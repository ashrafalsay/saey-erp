"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download, MoreHorizontal, Shield } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const DEMO_USERS = [
  { id: "1", name: "أحمد محمد الفيصل", nameEn: "Ahmed Mohammed Al-Faisal", email: "ahmed@saey.com", role: "مدير النظام", roleEn: "Super Admin", lastLogin: "2024-01-15 08:30", status: "active" },
  { id: "2", name: "سارة عبدالله", nameEn: "Sara Abdullah", email: "sara@saey.com", role: "محاسب", roleEn: "Accountant", lastLogin: "2024-01-15 09:15", status: "active" },
  { id: "3", name: "خالد العتيبي", nameEn: "Khalid Al-Otaibi", email: "khalid@saey.com", role: "مدير مبيعات", roleEn: "Sales Manager", lastLogin: "2024-01-14 16:45", status: "active" },
  { id: "4", name: "فاطمة الحربي", nameEn: "Fatima Al-Harbi", email: "fatima@saey.com", role: "موارد بشرية", roleEn: "HR Specialist", lastLogin: "2024-01-13 11:20", status: "inactive" },
  { id: "5", name: "محمد الغامدي", nameEn: "Mohammed Al-Ghamdi", email: "mohammed@saey.com", role: "مدير مستودع", roleEn: "Warehouse Manager", lastLogin: "2024-01-15 07:00", status: "active" },
  { id: "6", name: "نورة الشمري", nameEn: "Noura Al-Shammari", email: "noura@saey.com", role: "مطور", roleEn: "Developer", lastLogin: "2024-01-15 10:00", status: "active" },
];

export default function UsersPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_USERS.filter(u =>
    (isRtl ? u.name : u.nameEn).toLowerCase().includes(search.toLowerCase()) || u.email.includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.users")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "إدارة المستخدمين والصلاحيات" : "User and permissions management"}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 me-1" /> {t("common.export")}</Button>
          <Button size="sm"><Plus className="h-4 w-4 me-1" /> {isRtl ? "مستخدم جديد" : "New User"}</Button>
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
                  <th className="text-start p-3 font-medium">{isRtl ? "المستخدم" : "User"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "البريد" : "Email"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الدور" : "Role"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "آخر دخول" : "Last Login"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الحالة" : "Status"}</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--earth-beige))] text-[hsl(var(--earth-brown))] text-xs font-bold">
                          {(isRtl ? user.name : user.nameEn).charAt(0)}
                        </div>
                        <span className="font-medium">{isRtl ? user.name : user.nameEn}</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-xs" dir="ltr">{user.email}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-[hsl(var(--earth-olive))]" />
                        <span>{isRtl ? user.role : user.roleEn}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs">{user.lastLogin}</td>
                    <td className="p-3">
                      <Badge variant={user.status === "active" ? "success" : "secondary"}>
                        {user.status === "active" ? (isRtl ? "نشط" : "Active") : (isRtl ? "غير نشط" : "Inactive")}
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

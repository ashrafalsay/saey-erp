"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Activity } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const DEMO_LOGS = [
  { id: "1", user: "أحمد محمد", userEn: "Ahmed Mohammed", action: "تسجيل دخول", actionEn: "Login", module: "المصادقة", moduleEn: "Auth", details: "تسجيل دخول ناجح", detailsEn: "Successful login", date: "2024-01-15 08:30:00", ip: "192.168.1.100" },
  { id: "2", user: "سارة عبدالله", userEn: "Sara Abdullah", action: "إنشاء فاتورة", actionEn: "Create Invoice", module: "المحاسبة", moduleEn: "Accounting", details: "INV-001247", detailsEn: "INV-001247", date: "2024-01-15 09:15:00", ip: "192.168.1.101" },
  { id: "3", user: "خالد العتيبي", userEn: "Khalid Al-Otaibi", action: "تعديل عميل", actionEn: "Update Customer", module: "المبيعات", moduleEn: "Sales", details: "شركة الفيصل التجارية", detailsEn: "Al-Faisal Trading Co.", date: "2024-01-15 10:45:00", ip: "192.168.1.102" },
  { id: "4", user: "محمد الغامدي", userEn: "Mohammed Al-Ghamdi", action: "تحويل مخزون", actionEn: "Stock Transfer", module: "المخزون", moduleEn: "Inventory", details: "MOV-0089", detailsEn: "MOV-0089", date: "2024-01-15 11:20:00", ip: "192.168.1.103" },
  { id: "5", user: "أحمد محمد", userEn: "Ahmed Mohammed", action: "حذف مسودة", actionEn: "Delete Draft", module: "المحاسبة", moduleEn: "Accounting", details: "INV-001240", detailsEn: "INV-001240", date: "2024-01-15 12:00:00", ip: "192.168.1.100" },
  { id: "6", user: "نورة الشمري", userEn: "Noura Al-Shammari", action: "تغيير صلاحيات", actionEn: "Change Permissions", module: "الإعدادات", moduleEn: "Settings", details: "دور: محاسب", detailsEn: "Role: Accountant", date: "2024-01-15 14:30:00", ip: "192.168.1.104" },
  { id: "7", user: "فاطمة الحربي", userEn: "Fatima Al-Harbi", action: "طلب إجازة", actionEn: "Leave Request", module: "الموارد البشرية", moduleEn: "HR", details: "إجازة سنوية - 5 أيام", detailsEn: "Annual leave - 5 days", date: "2024-01-15 15:00:00", ip: "192.168.1.105" },
];

export default function AuditLogPage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_LOGS.filter(l =>
    (isRtl ? l.user : l.userEn).toLowerCase().includes(search.toLowerCase()) ||
    (isRtl ? l.action : l.actionEn).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.auditLog")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "سجل النشاطات والعمليات" : "Activity and operations log"}</p>
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4 me-1" /> {t("common.export")}</Button>
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
          <div className="space-y-3">
            {filtered.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[hsl(var(--muted))]/50 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--earth-beige))] text-[hsl(var(--earth-brown))] flex-shrink-0 mt-0.5">
                  <Activity className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{isRtl ? log.user : log.userEn}</span>
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">{isRtl ? log.action : log.actionEn}</span>
                    <Badge variant="secondary" className="text-[10px]">{isRtl ? log.module : log.moduleEn}</Badge>
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{isRtl ? log.details : log.detailsEn}</p>
                </div>
                <div className="text-end flex-shrink-0">
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{log.date}</p>
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))] font-mono" dir="ltr">{log.ip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

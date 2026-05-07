"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const DEMO_ATTENDANCE = [
  { id: "1", employee: "أحمد محمد", employeeEn: "Ahmed Mohammed", date: "2024-01-15", checkIn: "08:00", checkOut: "17:00", hours: "9h 0m", status: "present" },
  { id: "2", employee: "سارة عبدالله", employeeEn: "Sara Abdullah", date: "2024-01-15", checkIn: "08:15", checkOut: "17:30", hours: "9h 15m", status: "present" },
  { id: "3", employee: "خالد العتيبي", employeeEn: "Khalid Al-Otaibi", date: "2024-01-15", checkIn: "09:05", checkOut: "17:00", hours: "7h 55m", status: "late" },
  { id: "4", employee: "فاطمة الحربي", employeeEn: "Fatima Al-Harbi", date: "2024-01-15", checkIn: "-", checkOut: "-", hours: "-", status: "absent" },
  { id: "5", employee: "محمد الغامدي", employeeEn: "Mohammed Al-Ghamdi", date: "2024-01-15", checkIn: "07:55", checkOut: "16:00", hours: "8h 5m", status: "early_leave" },
  { id: "6", employee: "نورة الشمري", employeeEn: "Noura Al-Shammari", date: "2024-01-15", checkIn: "08:00", checkOut: "17:00", hours: "9h 0m", status: "present" },
  { id: "7", employee: "عبدالرحمن الدوسري", employeeEn: "Abdulrahman Al-Dosari", date: "2024-01-15", checkIn: "08:30", checkOut: "17:15", hours: "8h 45m", status: "present" },
  { id: "8", employee: "منى القحطاني", employeeEn: "Mona Al-Qahtani", date: "2024-01-15", checkIn: "-", checkOut: "-", hours: "-", status: "on_leave" },
];

export default function AttendancePage() {
  const { t, isRtl } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = DEMO_ATTENDANCE.filter(a =>
    (isRtl ? a.employee : a.employeeEn).toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    const map: Record<string, { variant: "success" | "warning" | "destructive" | "secondary" | "default"; label: string }> = {
      present: { variant: "success", label: isRtl ? "حاضر" : "Present" },
      late: { variant: "warning", label: isRtl ? "متأخر" : "Late" },
      absent: { variant: "destructive", label: isRtl ? "غائب" : "Absent" },
      early_leave: { variant: "default", label: isRtl ? "خروج مبكر" : "Early Leave" },
      on_leave: { variant: "secondary", label: isRtl ? "في إجازة" : "On Leave" },
    };
    const config = map[status] || { variant: "secondary" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.attendance")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "سجل الحضور والانصراف اليومي" : "Daily attendance tracking"}</p>
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4 me-1" /> {t("common.export")}</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: isRtl ? "حاضرين" : "Present", value: "34", icon: CheckCircle, color: "text-[hsl(var(--earth-olive))] bg-[hsl(var(--earth-beige))]" },
          { label: isRtl ? "متأخرين" : "Late", value: "3", icon: Clock, color: "text-amber-600 bg-amber-50" },
          { label: isRtl ? "غائبين" : "Absent", value: "2", icon: XCircle, color: "text-red-500 bg-red-50" },
          { label: isRtl ? "في إجازة" : "On Leave", value: "3", icon: AlertCircle, color: "text-[hsl(var(--earth-brown))] bg-[hsl(var(--earth-beige))]" },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
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
                  <th className="text-start p-3 font-medium">{isRtl ? "الموظف" : "Employee"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "التاريخ" : "Date"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الدخول" : "Check In"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الخروج" : "Check Out"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الساعات" : "Hours"}</th>
                  <th className="text-start p-3 font-medium">{isRtl ? "الحالة" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-[hsl(var(--muted))]/50 transition-colors">
                    <td className="p-3 font-medium">{isRtl ? record.employee : record.employeeEn}</td>
                    <td className="p-3">{record.date}</td>
                    <td className="p-3">{record.checkIn}</td>
                    <td className="p-3">{record.checkOut}</td>
                    <td className="p-3">{record.hours}</td>
                    <td className="p-3">{statusBadge(record.status)}</td>
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

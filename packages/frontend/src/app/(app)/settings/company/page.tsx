"use client";

import React from "react";
import { Building2, MapPin, Phone, Mail, Globe, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";

export default function CompanySettingsPage() {
  const { t, isRtl } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.company")}</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">{isRtl ? "إعدادات الشركة" : "Company settings"}</p>
        </div>
        <Button size="sm">{t("common.save")}</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader><CardTitle className="text-base">{isRtl ? "المعلومات الأساسية" : "Basic Information"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{isRtl ? "اسم الشركة (عربي)" : "Company Name (Arabic)"}</label>
              <Input defaultValue="ساعى للتقنية" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isRtl ? "اسم الشركة (إنجليزي)" : "Company Name (English)"}</label>
              <Input defaultValue="Saey Technologies" dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isRtl ? "الرقم الضريبي" : "Tax Number (VAT)"}</label>
              <Input defaultValue="310123456700003" dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isRtl ? "السجل التجاري" : "Commercial Registration"}</label>
              <Input defaultValue="1010234567" dir="ltr" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader><CardTitle className="text-base">{isRtl ? "معلومات الاتصال" : "Contact Information"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1"><Phone className="h-3 w-3" /> {isRtl ? "الهاتف" : "Phone"}</label>
              <Input defaultValue="+966 11 234 5678" dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1"><Mail className="h-3 w-3" /> {isRtl ? "البريد الإلكتروني" : "Email"}</label>
              <Input defaultValue="info@saey.com" dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1"><Globe className="h-3 w-3" /> {isRtl ? "الموقع الإلكتروني" : "Website"}</label>
              <Input defaultValue="https://saey.com" dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1"><MapPin className="h-3 w-3" /> {isRtl ? "العنوان" : "Address"}</label>
              <Input defaultValue={isRtl ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader><CardTitle className="text-base">{isRtl ? "الإعدادات المالية" : "Financial Settings"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{isRtl ? "العملة الافتراضية" : "Default Currency"}</label>
              <Input defaultValue="SAR - ريال سعودي" readOnly className="bg-[hsl(var(--muted))]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isRtl ? "نسبة ضريبة القيمة المضافة" : "VAT Rate"}</label>
              <Input defaultValue="15%" readOnly className="bg-[hsl(var(--muted))]" dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isRtl ? "السنة المالية تبدأ" : "Fiscal Year Start"}</label>
              <Input defaultValue={isRtl ? "1 يناير" : "January 1"} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader><CardTitle className="text-base">{isRtl ? "ZATCA - هيئة الزكاة والضريبة" : "ZATCA Integration"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(var(--earth-beige))]">
              <FileText className="h-5 w-5 text-[hsl(var(--earth-brown))]" />
              <div>
                <p className="text-sm font-medium">{isRtl ? "الفوترة الإلكترونية - المرحلة الثانية" : "E-Invoicing - Phase 2"}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{isRtl ? "جاهز للربط مع منصة فاتورة" : "Ready for Fatoora platform integration"}</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isRtl ? "معرف الجهاز" : "Device ID"}</label>
              <Input placeholder="ZATCA Device ID" dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isRtl ? "مفتاح API" : "API Key"}</label>
              <Input type="password" placeholder="••••••••" dir="ltr" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

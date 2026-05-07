"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { useAuthStore } from "@/stores/auth-store";
import { useAppStore } from "@/stores/app-store";

export default function LoginPage() {
  const { t, isRtl } = useTranslation();
  const { locale, setLocale } = useAppStore();
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Demo login - in production this would call the API
      if (email && password) {
        setAuth({
          user: {
            id: "demo-user-1",
            email: email,
            firstName: isRtl ? "أحمد" : "Ahmed",
            lastName: isRtl ? "محمد" : "Mohammed",
            role: "admin",
            permissions: [],
            locale: locale,
            theme: "light",
            company: {
              id: "demo-company-1",
              name: "Saey Technologies",
              nameAr: "ساعى للتقنية",
              currency: "SAR",
            },
            branch: {
              id: "demo-branch-1",
              name: "Main Branch",
              nameAr: "الفرع الرئيسي",
            },
          },
          accessToken: "demo-token",
          refreshToken: "demo-refresh-token",
        });
        router.push("/dashboard");
      }
    } catch {
      setError(isRtl ? "بيانات الدخول غير صحيحة" : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold backdrop-blur">
              {isRtl ? "س" : "S"}
            </div>
            <h1 className="text-3xl font-bold">{t("common.appName")}</h1>
          </div>
          <p className="text-blue-100 text-lg">{t("common.appDescription")}</p>
        </div>
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            {[
              { title: isRtl ? "المحاسبة" : "Accounting", desc: isRtl ? "نظام محاسبة متكامل" : "Complete financial system" },
              { title: isRtl ? "المخزون" : "Inventory", desc: isRtl ? "إدارة مخزون ذكية" : "Smart stock management" },
              { title: isRtl ? "الموارد البشرية" : "HR", desc: isRtl ? "إدارة شاملة للموظفين" : "Full employee management" },
              { title: isRtl ? "المبيعات" : "Sales", desc: isRtl ? "نقطة بيع متطورة" : "Advanced POS system" },
            ].map((feature) => (
              <div key={feature.title} className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-blue-100">{feature.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-blue-200">
            {isRtl
              ? "نظام متوافق مع هيئة الزكاة والضريبة والجمارك (ZATCA) ويدعم الفوترة الإلكترونية"
              : "ZATCA-compliant system with full e-invoicing support"}
          </p>
        </div>
        <p className="text-sm text-blue-200">
          &copy; 2024 Saey ERP. {isRtl ? "جميع الحقوق محفوظة" : "All rights reserved."}
        </p>
      </div>

      {/* Right side - form */}
      <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2">
        <div className="absolute top-4 end-4">
          <Button variant="ghost" size="sm" onClick={() => setLocale(locale === "ar" ? "en" : "ar")}>
            {locale === "ar" ? "English" : "العربية"}
          </Button>
        </div>

        <Card className="w-full max-w-md border-0 shadow-none lg:border lg:shadow-sm">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-2xl font-bold lg:hidden">
              {isRtl ? "س" : "S"}
            </div>
            <CardTitle className="text-2xl">{t("auth.welcomeBack")}</CardTitle>
            <CardDescription>{t("auth.loginSubtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("auth.email")}</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  required
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{t("auth.password")}</label>
                  <Link href="#" className="text-xs text-[hsl(var(--primary))] hover:underline">
                    {t("auth.forgotPassword")}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-2.5 end-3 text-[hsl(var(--muted-foreground))]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("common.loading") : t("auth.login")}
              </Button>

              <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
                {t("auth.dontHaveAccount")}{" "}
                <Link href="/register" className="text-[hsl(var(--primary))] hover:underline font-medium">
                  {t("auth.startTrial")}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

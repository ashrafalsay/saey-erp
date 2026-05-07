"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Leaf, Mountain, TreePine, Sprout } from "lucide-react";
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
    <div className="flex min-h-screen bg-[hsl(var(--background))]">
      {/* Left side - nature branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{
          background: "linear-gradient(135deg, hsl(25 40% 28%) 0%, hsl(25 45% 35%) 30%, hsl(85 25% 35%) 70%, hsl(100 20% 28%) 100%)",
        }}
      >
        {/* Mountain silhouette SVG */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-20" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none">
          <path d="M0 400L100 280L200 320L350 200L450 250L600 120L750 200L850 160L950 220L1050 180L1200 250L1200 400Z" fill="white" fillOpacity="0.15"/>
          <path d="M0 400L150 300L300 350L450 260L550 300L700 220L800 280L900 240L1050 300L1200 260L1200 400Z" fill="white" fillOpacity="0.1"/>
          <path d="M0 400L200 350L400 380L600 330L800 360L1000 340L1200 370L1200 400Z" fill="white" fillOpacity="0.08"/>
        </svg>

        {/* Tree silhouettes */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-10" viewBox="0 0 1200 300" fill="white" preserveAspectRatio="none">
          <path d="M100 300V200L80 200L100 150L85 150L110 100L100 100L120 60L140 100L130 100L155 150L140 150L160 200L140 200V300Z"/>
          <path d="M250 300V220L235 220L255 180L242 180L265 130L255 130L275 80L295 130L285 130L308 180L295 180L315 220L300 220V300Z"/>
          <path d="M900 300V230L885 230L905 185L892 185L915 140L905 140L920 100L935 140L925 140L948 185L935 185L955 230L940 230V300Z"/>
          <path d="M1050 300V210L1035 210L1055 165L1042 165L1065 120L1055 120L1070 80L1085 120L1075 120L1098 165L1085 165L1105 210L1090 210V300Z"/>
        </svg>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl font-bold text-white backdrop-blur-sm border border-white/10">
              {isRtl ? "س" : "S"}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{t("common.appName")}</h1>
              <p className="text-white/70 text-sm">{t("common.appDescription")}</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: isRtl ? "المحاسبة" : "Accounting", desc: isRtl ? "نظام محاسبة متكامل" : "Complete financial system", icon: Leaf },
              { title: isRtl ? "المخزون" : "Inventory", desc: isRtl ? "إدارة مخزون ذكية" : "Smart stock management", icon: Mountain },
              { title: isRtl ? "الموارد البشرية" : "HR", desc: isRtl ? "إدارة شاملة للموظفين" : "Full employee management", icon: TreePine },
              { title: isRtl ? "المبيعات" : "Sales", desc: isRtl ? "نقطة بيع متطورة" : "Advanced POS system", icon: Sprout },
            ].map((feature) => (
              <div key={feature.title} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm border border-white/5 hover:bg-white/15 transition-colors">
                <feature.icon className="h-5 w-5 text-white/80 mb-2" />
                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/50">
            {isRtl
              ? "نظام متوافق مع هيئة الزكاة والضريبة والجمارك (ZATCA) ويدعم الفوترة الإلكترونية"
              : "ZATCA-compliant system with full e-invoicing support"}
          </p>
        </div>

        <p className="relative z-10 text-sm text-white/40">
          &copy; 2024 Saey ERP. {isRtl ? "جميع الحقوق محفوظة" : "All rights reserved."}
        </p>
      </div>

      {/* Right side - form */}
      <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2">
        <div className="absolute top-4 end-4">
          <Button variant="ghost" size="sm" onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="text-[hsl(var(--earth-brown))]">
            {locale === "ar" ? "English" : "العربية"}
          </Button>
        </div>

        <Card className="w-full max-w-md border-0 shadow-none lg:border lg:shadow-md lg:rounded-2xl">
          <CardHeader className="text-center space-y-3 pb-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-bold lg:hidden"
              style={{ background: "linear-gradient(135deg, hsl(25 45% 35%), hsl(85 25% 42%))", color: "white" }}>
              {isRtl ? "س" : "S"}
            </div>
            <div>
              <CardTitle className="text-2xl text-[hsl(var(--earth-bark))]">{t("auth.welcomeBack")}</CardTitle>
              <CardDescription className="mt-1">{t("auth.loginSubtitle")}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-[hsl(var(--earth-bark))]">{t("auth.email")}</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  required
                  dir="ltr"
                  className="rounded-xl h-11 bg-[hsl(var(--earth-beige))]/50 border-[hsl(var(--earth-sand))] focus:border-[hsl(var(--earth-brown))] focus:ring-[hsl(var(--earth-brown))]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[hsl(var(--earth-bark))]">{t("auth.password")}</label>
                  <Link href="#" className="text-xs text-[hsl(var(--earth-olive))] hover:underline">
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
                    className="rounded-xl h-11 bg-[hsl(var(--earth-beige))]/50 border-[hsl(var(--earth-sand))] focus:border-[hsl(var(--earth-brown))] focus:ring-[hsl(var(--earth-brown))]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 end-3 text-[hsl(var(--muted-foreground))]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 rounded-xl text-base font-semibold"
                style={{ background: "linear-gradient(135deg, hsl(25 45% 35%), hsl(25 40% 30%))" }}
                disabled={loading}>
                {loading ? t("common.loading") : t("auth.login")}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[hsl(var(--earth-sand))]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[hsl(var(--card))] px-3 text-[hsl(var(--muted-foreground))]">
                    {isRtl ? "أو" : "or"}
                  </span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full h-11 rounded-xl border-[hsl(var(--earth-sand))] text-[hsl(var(--earth-bark))] hover:bg-[hsl(var(--earth-beige))]">
                {isRtl ? "الدخول بحساب Nafath" : "Login with Nafath"}
              </Button>

              <p className="text-center text-sm text-[hsl(var(--muted-foreground))] pt-2">
                {t("auth.dontHaveAccount")}{" "}
                <Link href="/register" className="text-[hsl(var(--earth-olive))] hover:underline font-medium">
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

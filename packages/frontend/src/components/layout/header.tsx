"use client";

import React from "react";
import {
  Bell,
  Search,
  Moon,
  Sun,
  Globe,
  Menu,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { useAppStore } from "@/stores/app-store";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const { t, isRtl } = useTranslation();
  const { theme, setTheme, locale, setLocale, setSidebarMobileOpen } = useAppStore();
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLocale = () => {
    setLocale(locale === "ar" ? "en" : "ar");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--card))]/60 lg:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setSidebarMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className={cn("absolute top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]", isRtl ? "right-3" : "left-3")} />
          <Input
            placeholder={t("common.search")}
            className={cn("h-9 w-full bg-[hsl(var(--muted))] border-0", isRtl ? "pr-9" : "pl-9")}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language toggle */}
        <Button variant="ghost" size="icon" onClick={toggleLocale} title={t("common.language")}>
          <Globe className="h-4 w-4" />
        </Button>

        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === "dark" ? t("common.lightMode") : t("common.darkMode")}>
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0 -end-0 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--destructive))] text-[10px] text-[hsl(var(--destructive-foreground))]">
              3
            </span>
          </Button>
          {showNotifications && (
            <div className={cn(
              "absolute top-full mt-2 w-80 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-lg",
              isRtl ? "left-0" : "right-0"
            )}>
              <h3 className="font-semibold mb-3">{t("common.notifications")}</h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-2 rounded-lg hover:bg-[hsl(var(--muted))] cursor-pointer">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FileTextIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{isRtl ? "فاتورة جديدة #INV-001" : "New Invoice #INV-001"}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{isRtl ? "منذ 5 دقائق" : "5 min ago"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-[hsl(var(--accent))] transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-medium">
              {user?.firstName?.[0] || "U"}
            </div>
            <div className="hidden md:block text-start">
              <p className="text-sm font-medium leading-none">
                {user ? `${user.firstName} ${user.lastName}` : "User"}
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                {user?.company?.name || "Company"}
              </p>
            </div>
          </button>
          {showUserMenu && (
            <div className={cn(
              "absolute top-full mt-2 w-56 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-1 shadow-lg",
              isRtl ? "left-0" : "right-0"
            )}>
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-[hsl(var(--muted))] transition-colors">
                <User className="h-4 w-4" />
                <span>{t("common.profile")}</span>
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-[hsl(var(--muted))] transition-colors">
                <Settings className="h-4 w-4" />
                <span>{t("common.settings")}</span>
              </button>
              <div className="my-1 border-t border-[hsl(var(--border))]" />
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[hsl(var(--destructive))] hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>{t("common.logout")}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

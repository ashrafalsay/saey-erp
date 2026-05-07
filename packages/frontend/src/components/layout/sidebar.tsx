"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Building2,
  GitBranch,
  Calculator,
  FileText,
  Receipt,
  CreditCard,
  Package,
  Boxes,
  Warehouse,
  ShoppingCart,
  UserCheck,
  Truck,
  FileBarChart,
  Settings,
  Shield,
  ClipboardList,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { useAppStore } from "@/stores/app-store";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  children?: { label: string; href: string; icon: React.ElementType }[];
}

function useNavItems(): NavItem[] {
  const { t } = useTranslation();
  return [
    { label: t("nav.dashboard"), href: "/dashboard", icon: LayoutDashboard },
    {
      label: t("nav.hr"),
      icon: Users,
      children: [
        { label: t("nav.employees"), href: "/hr/employees", icon: UserCog },
        { label: t("nav.departments"), href: "/hr/departments", icon: Building2 },
        { label: t("nav.attendance"), href: "/hr/attendance", icon: ClipboardList },
        { label: t("nav.leaves"), href: "/hr/leaves", icon: FileText },
      ],
    },
    {
      label: t("nav.accounting"),
      icon: Calculator,
      children: [
        { label: t("nav.chartOfAccounts"), href: "/accounting/accounts", icon: GitBranch },
        { label: t("nav.invoices"), href: "/accounting/invoices", icon: FileText },
        { label: t("nav.payments"), href: "/accounting/payments", icon: CreditCard },
        { label: t("nav.journalEntries"), href: "/accounting/journals", icon: Receipt },
        { label: t("nav.reports"), href: "/accounting/reports", icon: FileBarChart },
      ],
    },
    {
      label: t("nav.inventory"),
      icon: Package,
      children: [
        { label: t("nav.products"), href: "/inventory/products", icon: Boxes },
        { label: t("nav.categories"), href: "/inventory/categories", icon: Package },
        { label: t("nav.warehouses"), href: "/inventory/warehouses", icon: Warehouse },
        { label: t("nav.stockMovements"), href: "/inventory/movements", icon: Truck },
      ],
    },
    {
      label: t("nav.sales"),
      icon: ShoppingCart,
      children: [
        { label: t("nav.customers"), href: "/sales/customers", icon: UserCheck },
        { label: t("nav.suppliers"), href: "/sales/suppliers", icon: Truck },
        { label: t("nav.quotations"), href: "/sales/quotations", icon: FileText },
        { label: t("nav.salesOrders"), href: "/sales/orders", icon: ShoppingCart },
      ],
    },
    {
      label: t("nav.users"),
      href: "/users",
      icon: Users,
    },
    {
      label: t("common.settings"),
      icon: Settings,
      children: [
        { label: t("nav.company"), href: "/settings/company", icon: Building2 },
        { label: t("nav.branches"), href: "/settings/branches", icon: GitBranch },
        { label: t("nav.roles"), href: "/settings/roles", icon: Shield },
        { label: t("nav.auditLog"), href: "/settings/audit-log", icon: ClipboardList },
      ],
    },
  ];
}

export function Sidebar() {
  const pathname = usePathname();
  const { t, isRtl } = useTranslation();
  const { sidebarCollapsed, toggleSidebar, sidebarMobileOpen, setSidebarMobileOpen } = useAppStore();
  const navItems = useNavItems();
  const [openSections, setOpenSections] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    navItems.forEach((item) => {
      if (item.children?.some((child) => pathname.startsWith(child.href))) {
        setOpenSections((prev) => new Set([...prev, item.label]));
      }
    });
  }, [pathname, navItems]);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const CollapseIcon = isRtl ? ChevronLeft : ChevronRight;
  const ExpandIcon = isRtl ? ChevronRight : ChevronLeft;

  return (
    <>
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 z-50 flex h-full flex-col border-e border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all duration-300 lg:relative lg:z-auto",
          sidebarCollapsed ? "w-[68px]" : "w-[280px]",
          sidebarMobileOpen ? "start-0" : "-start-[280px] lg:start-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-[hsl(var(--border))] px-4">
          {!sidebarCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold text-lg">
                {isRtl ? "س" : "S"}
              </div>
              <span className="text-xl font-bold">
                {t("common.appName")}
              </span>
            </Link>
          )}
          {sidebarCollapsed && (
            <Link href="/dashboard" className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold text-lg">
              {isRtl ? "س" : "S"}
            </Link>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = item.href ? pathname === item.href : item.children?.some((c) => pathname.startsWith(c.href));
            const isOpen = openSections.has(item.label);

            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                      : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            }

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleSection(item.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-[hsl(var(--primary))]"
                      : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-start">{item.label}</span>
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
                      />
                    </>
                  )}
                </button>
                {!sidebarCollapsed && isOpen && item.children && (
                  <div className="ms-4 mt-1 space-y-1 border-s border-[hsl(var(--border))] ps-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          pathname.startsWith(child.href)
                            ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-medium"
                            : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
                        )}
                      >
                        <child.icon className="h-4 w-4 shrink-0" />
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="hidden border-t border-[hsl(var(--border))] p-3 lg:block">
          <button
            onClick={toggleSidebar}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors"
          >
            {sidebarCollapsed ? (
              <CollapseIcon className="h-5 w-5" />
            ) : (
              <>
                <ExpandIcon className="h-5 w-5" />
                <span>{t("common.back")}</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

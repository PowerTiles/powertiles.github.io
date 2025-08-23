"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Header() {
  type NavItem = {
    title: string;
    href?: string; // Optional because parent items may not have a direct link
    className?: string;
    mobile: boolean;
    subItems?: {
      title: string;
      href: string;
    }[];
  };

  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      mobile: true,
    },
    {
      title: "Producten",
      mobile: true,
      subItems: [
        {
          title: "Alle Producten",
          href: "/producten",
        },
        {
          title: "Geventileerde PVC-Tegels",
          href: "/producten/geventileerde-pvc-tegels",
        },
        {
          title: "Gladde Kliktegels",
          href: "/producten/gladde-kliktegels",
        },
        {
          title: "Gym Vloer",
          href: "/producten/gym-vloer",
        },
        {
          title: "Hexagonale LED-Verlichting",
          href: "/producten/hexagonale-led-verlichting",
        },
        {
          title: "Randstukken & Accessoires",
          href: "/producten/randstukken-accessoires",
        },
      ],
    },
    {
      title: "Designer Tool",
      href: "/designer-tool",
      mobile: true,
    },
    {
      title: "Company",
      className: "flex lg:hidden",
      mobile: false,
      subItems: [
        {
          title: "Over Ons",
          href: "/over-ons",
        },
        {
          title: "Contact",
          href: "/contact",
        },
      ],
    },
    {
      title: "Over Ons",
      href: "/over-ons",
      mobile: true,
      className: "hidden lg:flex",
    },
    {
      title: "Contact",
      href: "/contact",
      mobile: true,
      className: "hidden lg:flex",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-background py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/powertiles-logo-complete-no-background.png"
              alt="PowerTiles - Transform Your Space. Unleash the Power."
              width={144}
              height={48}
              className="h-12 min-w-min object-cover"
            />
          </Link>

          <NavigationMenu viewport={false} className="hidden min-[840px]:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem
                  key={item.title}
                  className={`${item.className}`}
                >
                  {!item.subItems ? (
                    // Just a single link
                    <NavigationMenuLink asChild className="hover:text-primary">
                      <Link href={item.href || "#"}>{item.title}</Link>
                    </NavigationMenuLink>
                  ) : (
                    // Dropdown with subItems
                    <>
                      <NavigationMenuTrigger>
                        {item.href ? (
                          <Link href={item.href}>{item.title}</Link>
                        ) : (
                          item.title
                        )}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid min-w-[140px] w-max gap-4">
                          {item.subItems.map((sub) => (
                            <li key={sub.title}>
                              <NavigationMenuLink asChild className="hover:text-accent-foreground hover:bg-accent">
                                <Link href={sub.href}>{sub.title}</Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Offerte */}
            <Link href="/offerte">
              <Button variant="default">Offerte Aanvragen</Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="min-[840px]:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-background hover:text-foreground"
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="border-none">
                <SheetHeader>
                  <SheetTitle>PowerTiles</SheetTitle>
                  <SheetDescription>
                    Transform Your Space. Unleash the Power.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <Accordion type="single" collapsible>
                    {navItems
                      .filter((item) => item.mobile) // <-- Only show mobile items
                      .map((item) =>
                        !item.subItems ? (
                          <div key={item.title}>
                            <SheetClose asChild className="py-4 border-b">
                              <Link
                                href={item.href || "#"}
                                className="block text-lg font-medium hover:text-primary"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          </div>
                        ) : (
                          <AccordionItem key={item.title} value={item.title}>
                            <AccordionTrigger className="text-lg font-medium">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col space-y-2">
                              {item.href && (
                                <SheetClose asChild key={item.title}>
                                  <Link
                                    href={item.href}
                                    className="block text-base text-muted-foreground hover:text-primary px-2"
                                  >
                                    Alle {item.title}
                                  </Link>
                                </SheetClose>
                              )}
                              {item.subItems.map((sub) => (
                                <SheetClose asChild key={sub.title}>
                                  <Link
                                    href={sub.href}
                                    className="block text-base text-muted-foreground hover:text-primary px-2"
                                  >
                                    {sub.title}
                                  </Link>
                                </SheetClose>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        )
                      )}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

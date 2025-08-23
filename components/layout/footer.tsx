import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image
              src="/powertiles-logo-footer-no-background.png"
              alt="PowerTiles"
              width={300}
              height={90}
              className="h-12 w-auto"
            />
            <p className="text-muted">
              Premium modulaire PVC-klikvloeren voor garages, home gyms en
              werkplaatsen.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Producten
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/producten"
                  className="hover:text-muted transition-colors"
                >
                  Geventileerde Tegels
                </Link>
              </li>
              <li>
                <Link
                  href="/producten"
                  className="hover:text-muted transition-colors"
                >
                  Gladde Kliktegels
                </Link>
              </li>
              <li>
                <Link
                  href="/producten"
                  className="hover:text-muted transition-colors"
                >
                  Gym Vloer
                </Link>
              </li>
              <li>
                <Link
                  href="/producten"
                  className="hover:text-muted transition-colors"
                >
                  LED-verlichting
                </Link>
              </li>
              <li>
                <Link
                  href="/producten"
                  className="hover:text-muted transition-colors"
                >
                  Accessoires
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Service</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/designer-tool"
                  className="hover:text-muted transition-colors"
                >
                  Vloer Designer Tool
                </Link>
              </li>
              <li>
                <Link
                  href="/offerte"
                  className="hover:text-muted transition-colors"
                >
                  Offerte Aanvragen
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-muted transition-colors"
                >
                  Installatie Service
                </Link>
              </li>
              <li>
                <Link
                  href="/over-ons"
                  className="hover:text-muted transition-colors"
                >
                  Over PowerTiles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-muted transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>info@powertiles.be</p>
              <p>+32 475 21 96 35</p>
              <p>BTW: BE 1024.559.728</p>
              <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="group hover:bg-background">
                <Facebook className="w-5 h-5 group-hover:text-sky-700" />
              </Button>
              <Button variant="ghost" size="icon" className="group hover:bg-background">
                <Instagram className="w-5 h-5 group-hover:text-orange-600" />
              </Button>
            </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} PowerTiles. Alle rechten
            voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}

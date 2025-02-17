import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { mobileNavbarLinks } from "./navbar.constant";

const MobileNavbar = ({ open, setOpen }) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTitle className="sr-only">Open Mobile Navigation Menu</SheetTitle>
      <SheetContent side="left" className="md:hidden">
        <div className="mt-8 grid gap-5">
          {mobileNavbarLinks.map((link) => (
            <Link
              key={link.id}
              href={link.route}
              className="border-b pb-1 text-sm font-medium dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;

export function isNavHrefActive(pathname: string, href: string): boolean {
  if (pathname === href) {
    return true;
  }

  return pathname.startsWith(`${href}/`);
}

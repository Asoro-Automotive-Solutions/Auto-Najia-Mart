# Auto-Naija Mart

Auto-Naija Mart is a Next.js marketplace application for browsing automotive parts, communicating with sellers, and managing marketplace administration screens.

## Project Structure

```text
Auto-Najia-Mart/
|- auto-naija/
|  |- src/app/                 # Next.js routes
|  |- src/components/          # Shared UI and admin components
|  |- src/containers/          # Marketplace screens
|  |- src/assets/              # Fonts and imported assets
|  `- public/                  # Public images and static assets
`- README.md                   # Canonical project documentation
```

## Getting Started

```powershell
cd auto-naija
npm install
npm run dev
```

Open http://localhost:3000.

## Main Routes

```text
/                         Coming soon page
/chat-screens             Chat screen
/help-support             Help and support
/password-security        Password and security
/seller-details           Seller details
/market-home              Victor marketplace home
/market-search            Victor marketplace search
/market-orders            Victor marketplace orders
```

## Admin Routes

The admin screens are integrated into the same Next.js application:

```text
/admin                    Main admin portal
/admin/items-store        Items management admin portal
```

Admin source is located at:

```text
auto-naija/src/components/admin
```

## Validation

```powershell
cd auto-naija
npm run lint
npm run build
```

## Git Workflow

The active development branch is `pope`. The Asoro repository is configured as `upstream`.

```powershell
git fetch upstream
git status
git push upstream pope
```

Keep project documentation in this root `README.md` only.

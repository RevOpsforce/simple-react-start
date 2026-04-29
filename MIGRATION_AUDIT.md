# Migration Audit: Manus → Lovable

**Date**: 2026-04-29  
**Repository**: RevOpsforce/opsforce.ai  
**Status**: Exported from Manus, ready for Lovable migration  
**Scope**: Technical inventory, environment setup, Manus-specific dependencies, and migration risks

---

## 1. Technology Stack Inventory

### Frontend Framework & Build
- **Framework**: React 19.2.1 (latest)
- **Build Tool**: Vite 7.1.7
- **Language**: TypeScript 5.9.3 (strict mode enabled)
- **Styling**: 
  - Tailwind CSS 4.1.14 (with @tailwindcss/vite plugin)
  - CSS Variables + Radix UI design tokens
  - shadcn/ui components (New York style)
  - Framer Motion 12.23.22 for animations

### Routing
- **Library**: Wouter 3.3.5 (lightweight client-side router)
- **Implementation**: File-based routing NOT used; manual route definitions in `client/src/App.tsx`
- **Status**: ⚠️ **Patched** - pnpm patch applied to wouter@3.7.1 (see `patches/wouter@3.7.1.patch`)

### Backend Framework & API
- **Runtime**: Node.js (ES modules)
- **Server**: Express 4.21.2
- **API Framework**: tRPC 11.6.0 (RPC-like API with full-stack type safety)
- **API Endpoint**: `/api/trpc` (batch HTTP adapter)
- **Database ORM**: Drizzle ORM 0.44.5 (MySQL dialect)
- **Database**: MySQL 3.15.0 (driver)

### Authentication & Security
- **Auth Framework**: Custom OAuth integration with Manus OAuth Server
- **Session Management**: JWT (jose 6.1.0) with HTTP-only cookies
- **Cookie Strategy**: 
  - Name: `app_session_id` (ONE_YEAR_MS expiration)
  - sameSite: "none", httpOnly: true
  - Domain: NOT set (commented out in cookies.ts)

### State Management
- **Query Client**: TanStack Query (React Query) 5.90.2
- **Data Serialization**: superjson 1.13.3 (tRPC serialization)
- **Theme**: next-themes 0.4.6
- **Form**: React Hook Form 7.64.0 with Zod 4.1.12 validation

### UI Components & Libraries
- **Radix UI**: ~40 components (accordion, dialog, dropdown, etc.)
- **Icons**: Lucide React 0.453.0
- **Charts**: Recharts 2.15.2
- **Toast Notifications**: Sonner 2.0.7
- **Carousel**: Embla Carousel 8.6.0
- **Resizable Panels**: react-resizable-panels 3.0.6
- **OTP Input**: input-otp 1.4.2
- **Drawer**: Vaul 1.1.2
- **Date Picker**: react-day-picker 9.11.1 with date-fns 4.1.0

### AI/ML Integration
- **LLM API**: Google Gemini 2.5 Flash (via Manus forge API)
- **Forge API URL**: Defaults to `https://forge.manus.im/v1/chat/completions` if not configured
- **Voice Transcription**: Implemented in `server/_core/voiceTranscription.ts`
- **Image Generation**: Implemented in `server/_core/imageGeneration.ts`
- **Map Services**: Google Maps (types included, not yet integrated)

### Cloud & File Storage
- **AWS S3**: AWS SDK v3 (client-s3, s3-request-presigner)
- **S3 Usage**: Presigned URLs for file uploads

### Additional Dependencies
- **HTTP Client**: Axios 1.12.0 (with AXIOS_TIMEOUT_MS = 30s)
- **Utilities**: nanoid, clsx, class-variance-authority, tailwind-merge
- **Logging**: Browser console logs collected via Manus debug plugin

### Dev Dependencies & Tools
- **Package Manager**: pnpm 10.15.1 (with lock file pnpm-lock.yaml)
- **Testing**: Vitest 2.1.4 (node environment, server tests only)
- **Formatting**: Prettier 3.6.2
- **Linting**: TypeScript compiler check only (no ESLint configured)
- **Build Bundler**: esbuild 0.25.0 (for server bundle)
- **JSX Location**: @builder.io/vite-plugin-jsx-loc (for debugging)

---

## 2. Installation & Build Commands

### Prerequisites
```bash
# Node.js version: 18+
# Package Manager: pnpm (pinned to 10.15.1)
```

### Install Dependencies
```bash
pnpm install
```

### Local Development
```bash
pnpm dev
```
**Behavior**: 
- Starts Express server in development mode
- tRPC API at `/api/trpc`
- Vite dev server with HMR configured
- Manus debug collector middleware active (logs to `.manus-logs/`)
- Auto-finds available port starting from 3000

### Production Build
```bash
pnpm build
```
**What happens**:
1. Vite builds client (React) → `dist/public/`
2. esbuild bundles `server/_core/index.ts` → `dist/index.js` (ESM format, external packages)

### Production Start
```bash
pnpm start
```
**Behavior**: Runs `node dist/index.js` with NODE_ENV=production

### Database Migrations
```bash
pnpm db:push
```
**Behavior**: 
- Runs drizzle-kit generate (generates migrations from schema)
- Runs drizzle-kit migrate (applies migrations to MySQL database)

### Other Commands
```bash
pnpm check          # TypeScript type check
pnpm format         # Prettier format entire project
pnpm test           # Run vitest (server tests only)
```

---

## 3. Environment Variables

### Required for All Environments
| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@localhost/db` | ✅ Yes |
| `JWT_SECRET` | Cookie/session signing secret | Any strong random string | ✅ Yes |
| `VITE_APP_ID` | OAuth app identifier | Provided by OAuth server | ✅ Yes |
| `OAUTH_SERVER_URL` | Manus OAuth server endpoint | `https://oauth.example.com` | ✅ Yes |
| `OWNER_OPEN_ID` | First admin user openId | Manus user identifier | ✅ Yes (for admin role) |

### Required for Specific Features
| Variable | Purpose | Example | Feature |
|----------|---------|---------|---------|
| `VITE_OAUTH_PORTAL_URL` | OAuth login portal URL | `https://oauth.example.com` | OAuth login |
| `BUILT_IN_FORGE_API_URL` | LLM inference API (optional override) | `https://forge.manus.im` | AI features |
| `BUILT_IN_FORGE_API_KEY` | LLM API key | Bearer token | AI features |
| `AWS_ACCESS_KEY_ID` | AWS S3 credentials | AWS key | File uploads |
| `AWS_SECRET_ACCESS_KEY` | AWS S3 credentials | AWS secret | File uploads |
| `AWS_REGION` | AWS region | `us-east-1` | File uploads |
| `PORT` | Server port override | `3000` | Custom port |
| `NODE_ENV` | Environment mode | `development` or `production` | Build/runtime |

### Client-Side Environment Variables (Vite)
All variables prefixed with `VITE_` are exposed to the client bundle:
- `VITE_APP_ID` - OAuth app ID
- `VITE_OAUTH_PORTAL_URL` - OAuth login portal

### .env.example Template
Create a `.env.example` file in the repository root:

```bash
# ============================================================================
# Core Configuration
# ============================================================================
NODE_ENV=development
PORT=3000

# ============================================================================
# Database
# ============================================================================
# MySQL connection string
# Format: mysql://username:password@host:port/database
DATABASE_URL=mysql://root:password@localhost:3306/opsforce_ai

# ============================================================================
# Authentication & Session
# ============================================================================
# Strong random string for signing JWT session tokens
# Generate: openssl rand -base64 32
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# OAuth App Configuration
# Provided by Manus OAuth Server during app registration
VITE_APP_ID=your-oauth-app-id
OAUTH_SERVER_URL=https://oauth.manus.im

# First admin user - Manus openId
# Users with this openId will automatically be assigned 'admin' role
OWNER_OPEN_ID=your-manus-user-open-id

# OAuth login portal (client-side configuration)
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im

# ============================================================================
# AI & LLM Services (Optional - Uses Manus Forge API by default)
# ============================================================================
# Override default LLM endpoint (https://forge.manus.im/v1/chat/completions)
# BUILT_IN_FORGE_API_URL=https://forge.manus.im

# LLM API key for Manus Forge or compatible endpoint
# BUILT_IN_FORGE_API_KEY=your-api-key-here

# ============================================================================
# AWS S3 Configuration (Optional - For file uploads)
# ============================================================================
# AWS_ACCESS_KEY_ID=your-aws-access-key
# AWS_SECRET_ACCESS_KEY=your-aws-secret-key
# AWS_REGION=us-east-1

# ============================================================================
# Google Maps (Optional - Types included, not yet integrated)
# ============================================================================
# VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

---

## 4. Manus-Specific Findings & Generated Code Issues

### ⚠️ Critical Manus Dependencies

#### A. OAuth Integration (Tightly Coupled to Manus)
**Files**: 
- `server/_core/oauth.ts` - OAuth callback handler
- `server/_core/sdk.ts` - OAuthService class (Manus OAuth SDK)
- `server/_core/types/manusTypes.ts` - Manus-specific type definitions

**Issues**:
1. **Hardcoded OAuth Paths**: All OAuth endpoints use Manus-specific paths:
   - `/webdev.v1.WebDevAuthPublicService/ExchangeToken`
   - `/webdev.v1.WebDevAuthPublicService/GetUserInfo`
   - `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`
2. **Manus OpenId Assumption**: User identification assumes Manus openId format
3. **Platform Mapping**: `deriveLoginMethod()` hard-codes Manus platform enum values:
   - `REGISTERED_PLATFORM_EMAIL`, `REGISTERED_PLATFORM_GOOGLE`, etc.

**Migration Impact**: 🔴 **BREAKING** - OAuth must be completely replaced or adapted for Lovable's auth system

#### B. Vite Config & Manus Dev Tools
**File**: `vite.config.ts`

**Manus-Specific Code**:
1. **allowedHosts** (lines 173-181):
   ```typescript
   allowedHosts: [
     ".manuspre.computer",
     ".manus.computer",
     ".manus-asia.computer",
     ".manuscomputer.ai",
     ".manusvm.computer",
     "localhost",
     "127.0.0.1",
   ]
   ```
   - These are Manus development VM domains

2. **Manus Debug Collector Plugin** (lines 77-151):
   - Middleware at `/__manus__/debug-collector.js`
   - Logs browser console, network requests, session replay
   - Creates `.manus-logs/` directory
   - **Impact**: Can be safely removed; not critical to app functionality

3. **vite-plugin-manus-runtime** (line 103, line 153):
   - Package: `vite-plugin-manus-runtime@0.0.57`
   - **No documentation in codebase** - appears to be Manus build-time plugin
   - **Impact**: May provide build-time code generation or runtime hooks

**Migration Action**: Remove Manus-specific vite plugins and allowedHosts

#### C. Manus Forge API (LLM Integration)
**File**: `server/_core/llm.ts`

**Hardcoded Manus References**:
1. Default API endpoint: `https://forge.manus.im/v1/chat/completions` (line 215)
2. Model: `gemini-2.5-flash` (line 283)
3. **Impact**: App will only work if `BUILT_IN_FORGE_API_URL` is set; else connects to Manus Forge

**Migration Action**: Either:
- Continue using Manus Forge (if API keys available)
- Replace with another LLM provider (OpenAI, Claude, etc.)

#### D. Path Aliases Referencing Non-Existent Directory
**Files**: 
- `vite.config.ts` (line 161)
- `tsconfig.json` (line 20)
- `vitest.config.ts` (line 12)

**Issue**:
```typescript
"@assets": path.resolve(import.meta.dirname, "attached_assets")
```
- Path `attached_assets/` does not exist in repository
- Likely generated by Manus build system for importing external assets
- **Impact**: Imports using `@assets/` will fail at runtime

**Migration Action**: Either remove alias or create the directory

#### E. Package.json Manus Plugin
**File**: `package.json` (line 103)

```json
"vite-plugin-manus-runtime": "^0.0.57"
```
- **Unknown purpose**: No usage found in vite.config (actually used on line 153)
- **Status**: May be required for build/runtime compatibility
- **Risk**: Plugin unavailable in Lovable environment

**Migration Action**: Investigate and replace or remove

---

### ⚠️ Generated Code & Boilerplate

#### A. Monolithic Vite Config
**File**: `vite.config.ts` - 188 lines

**Issues**:
1. Custom Manus debug collector plugin (100+ lines)
2. Mixed concerns: development logging + Vite configuration
3. Node path resolution (`import.meta.dirname`) tightly coupled to file structure

**Recommendation**: Extract debug collector to separate file or remove entirely

#### B. Cookie Configuration (Defensive Coding)
**File**: `server/_core/cookies.ts` - Commented-out domain logic

```typescript
// const hostname = req.hostname;
// const shouldSetDomain = ...
// const domain = ...
```

**Issue**: Security-critical domain logic is commented out
**Reason**: Likely defensive for multi-tenant Manus deployments

**Recommendation**: Clarify intention - either remove or document why needed

#### C. Database Connection (Lazy Loading)
**File**: `server/db.ts` (lines 8-18)

```typescript
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;  // Continues without DB
    }
  }
  return _db;
}
```

**Issue**: Database is optional - app runs without it
**Reason**: Manus development environment may not require DB for all operations

**Migration Action**: Decide if DB should be mandatory in Lovable

---

### 🔵 Hardcoded Assumptions

| Item | Location | Current Value | Impact |
|------|----------|---------------|--------|
| LLM Endpoint | `server/_core/llm.ts:215` | `https://forge.manus.im/v1/chat/completions` | Must override via env var |
| OAuth Paths | `server/_core/sdk.ts:27-29` | `/webdev.v1.WebDevAuthPublicService/*` | Manus-specific; breaks with other OAuth |
| Platform Enums | `server/_core/sdk.ts:103-111` | `REGISTERED_PLATFORM_*` | Manus-specific strings |
| Session Cookie | `shared/const.ts:1` | `app_session_id` | Can change, but hardcoded |
| Cookie Domain | `server/_core/cookies.ts:42-47` | Not set (commented out) | May cause CORS issues cross-domain |

---

### 🔵 Dependency Patches

**File**: `patches/wouter@3.7.1.patch` (918 bytes)

```json
"patchedDependencies": {
  "wouter@3.7.1": "patches/wouter@3.7.1.patch"
}
```

**Issue**: Wouter 3.3.5 is used in dependencies, but 3.7.1 patch exists
**Status**: pnpm will apply patch during install
**Recommendation**: Investigate why this patch is needed; may indicate unsolved routing bug

---

## 5. Risks & Migration Strategy

### 🔴 HIGH PRIORITY RISKS

| Risk | Impact | Recommendation |
|------|--------|-----------------|
| **OAuth System Replacement** | Entire auth system is Manus-specific; cannot use Lovable auth until replacement | Identify Lovable's auth system; replace `sdk.ts` and `oauth.ts` completely |
| **vite-plugin-manus-runtime** | Unknown purpose; plugin likely unavailable in Lovable | Investigate plugin source; determine if essential or can be removed |
| **Manus Debug Collector** | Vite config is 40% debug logging code; may break on migration | Extract to separate file or remove entirely |
| **Forge API Dependency** | LLM endpoints hardcoded to Manus; app unusable without config | Replace with OpenAI/Claude/other provider or ensure Manus API remains available |
| **@assets Path Alias** | References non-existent directory; will cause import errors | Create `attached_assets/` directory or remove alias |

### 🟡 MEDIUM PRIORITY RISKS

| Risk | Impact | Recommendation |
|------|--------|-----------------|
| **Database Optional** | App can run without database; may hide connection errors | Make database required in production; fail fast on connection failure |
| **Wouter Patch** | Custom patch applied to routing library; may hide bugs | Document why patch is needed; test routing thoroughly after migration |
| **Cookie Configuration** | Domain logic commented out; may cause session issues cross-domain | Test cookie behavior in multi-domain Lovable setup |
| **TypeScript Strict Mode** | Strict mode enabled; may prevent unsafe code patterns | Maintain strict mode; easier to migrate with constraints |

### 🟢 LOW PRIORITY RISKS

| Risk | Impact | Recommendation |
|------|--------|-----------------|
| **tRPC API Design** | Requires understanding of tRPC pattern; not standard REST | Document tRPC procedures; consider API documentation |
| **Radix UI Components** | Large set of UI components; migration can use as-is | No action needed; verify all components render correctly |
| **Framer Motion Animations** | May have performance implications on Lovable platform | Test animation performance; profile CPU/memory usage |

---

## 6. Pre-Migration Checklist

Before migrating to Lovable, ensure:

- [ ] **OAuth System Identified**: Know Lovable's authentication mechanism
- [ ] **Environment Variables Prepared**: All `.env` files created and populated
- [ ] **vite-plugin-manus-runtime Purpose Identified**: Research plugin; determine necessity
- [ ] **Manus Debug Collector Removed**: Simplify vite.config.ts; remove Manus-specific code
- [ ] **@assets Directory Created or Removed**: Resolve missing path alias
- [ ] **Database Connection Tested**: Verify MySQL connectivity with DATABASE_URL
- [ ] **LLM Provider Decision**: Decide on Manus Forge vs. alternative
- [ ] **Wouter Patch Documented**: Understand why patch exists; test after migration
- [ ] **Allowed Hosts Updated**: Remove Manus domains from vite.config.ts
- [ ] **Build Process Validated**: Ensure `pnpm build && pnpm start` works locally
- [ ] **Tests Pass**: Run `pnpm test` successfully
- [ ] **Type Checking Passes**: Run `pnpm check` with no errors

---

## 7. Migration Strategy & Next Steps

### Phase 1: Preparation (Before Lovable)
1. Create `.env.example` and `.env.local` with all required variables
2. Test local build and start: `pnpm build && pnpm start`
3. Document all Manus-specific code with comments
4. Identify replacement for `vite-plugin-manus-runtime`
5. Create `attached_assets/` directory or remove alias

### Phase 2: Platform-Agnostic Refactoring (Optional)
1. Extract Manus debug collector to separate plugin
2. Decouple OAuth from Manus (create adapter pattern)
3. Make database connection mandatory (fail fast)
4. Remove Manus allowedHosts from vite.config

### Phase 3: Lovable Integration
1. Migrate authentication system (critical path)
2. Replace Manus Forge API (if LLM needed)
3. Validate build in Lovable environment
4. Test full authentication flow
5. Performance testing in Lovable platform

### Phase 4: Post-Migration
1. Remove `.manus-logs/` handling
2. Update deployment documentation
3. Archive Manus-specific environment variables
4. Test with production database
5. Monitor for hidden dependencies

---

## 8. Repository Structure Summary

```
opsforce.ai/
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # Radix UI + shadcn/ui components
│   │   ├── pages/             # Page components (wouter routes)
│   │   ├── contexts/          # React contexts (theme, auth)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities (trpc client, theme)
│   │   ├── App.tsx            # Router definition
│   │   └── main.tsx           # React DOM mount point
│   └── index.html             # HTML template
├── server/                    # Backend (Express + tRPC)
│   ├── _core/                 # Core functionality
│   │   ├── index.ts           # Express server setup
│   │   ├── oauth.ts           # OAuth callback handler [MANUS]
│   │   ├── sdk.ts             # OAuth service [MANUS]
│   │   ├── llm.ts             # LLM invocation [MANUS]
│   │   ├── context.ts         # tRPC context
│   │   ├── cookies.ts         # Session cookie logic
│   │   ├── vite.ts            # Vite dev/prod setup
│   │   └── ... (other services)
│   ├── routers.ts             # tRPC router definitions
│   └── db.ts                  # Database interface
├── shared/                    # Shared code (client + server)
│   ├── const.ts               # Shared constants
│   └── types.ts               # Shared types
├── drizzle/                   # Database schema & migrations
│   ├── schema.ts              # Drizzle schema (users table)
│   ├── migrations/            # Generated migration files
│   └── meta/                  # Migration metadata
├── patches/                   # pnpm patches
│   └── wouter@3.7.1.patch     # Wouter routing patch
├── vite.config.ts             # [MANUS] Includes debug collector
├── drizzle.config.ts          # Database config
├── package.json               # [MANUS] Includes vite-plugin-manus-runtime
└── .env.example               # [TO BE CREATED]
```

---

## 9. Summary

| Category | Status | Notes |
|----------|--------|-------|
| **Framework** | ✅ Production-ready | React 19, Vite 7, TypeScript 5 (strict) |
| **Build** | ✅ Working | Client (Vite) + Server (esbuild) |
| **Authentication** | ⚠️ Manus-coupled | Requires replacement for Lovable |
| **Database** | ✅ Configured | MySQL with Drizzle ORM; optional in dev |
| **API Design** | ✅ Modern | tRPC with full-stack type safety |
| **Styling** | ✅ Modern | Tailwind CSS 4 with Radix UI |
| **Dev Experience** | ✅ Good | Hot reload, type safety, comprehensive components |
| **Manus Debt** | ⚠️ Moderate | OAuth, Forge API, debug tools, build plugins |
| **Migration Risk** | 🔴 HIGH | OAuth system requires complete replacement |

---

## 10. File Locations for Key Changes

### Files to Review/Modify
- `vite.config.ts` - Remove Manus plugins and allowedHosts
- `server/_core/oauth.ts` - Replace OAuth implementation
- `server/_core/sdk.ts` - Replace OAuth SDK
- `package.json` - Remove/replace vite-plugin-manus-runtime
- `server/_core/llm.ts` - Replace or configure LLM provider
- `.env.example` - Create environment template

### Files to Create
- `.env.example` - Environment variable template
- `attached_assets/` - Directory for asset alias
- Migration guide for Lovable-specific changes

### Files Safe to Keep As-Is
- `client/src/` - UI components (not Manus-specific)
- `drizzle/` - Database schema
- `shared/` - Shared types/constants
- `server/_core/context.ts` - tRPC context
- `server/_core/cookies.ts` - Session management

---

**End of Audit**

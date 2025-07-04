# User Management Components

This directory contains the modular components used for user management in the admin interface.

## Components

### Core Components

- **`UserEngagementDetails.tsx`** - Main component that orchestrates all user engagement details
- **`UserTableColumns.tsx`** - Table column definitions for the user management table

### UI Components

- **`UserProfileCard.tsx`** - Displays user profile information (business, location, interests, etc.)
- **`UserStatsOverview.tsx`** - Shows key engagement metrics in card format
- **`UserEngagementStats.tsx`** - Detailed session and watch statistics
- **`UserVideoHistory.tsx`** - Recent video activity and watch history
- **`UserTrendsCard.tsx`** - 30-day engagement trends

### Usage

```tsx
// Import all components
import { UserEngagementDetails, userColumns } from '@/components/admin/users';

// Use in MaterialReactTable
<MaterialReactTable
  columns={userColumns}
  data={users}
  renderDetailPanel={({ row }) => (
    <UserEngagementDetails userId={row.original.id} user={row.original} />
  )}
/>;
```

## Component Hierarchy

```
UserEngagementDetails
├── UserProfileCard
├── UserStatsOverview
├── UserEngagementStats
├── UserVideoHistory (conditional)
└── UserTrendsCard
```

## Dependencies

- **Common Components**: `StatCard` from `@/components/common`
- **Services**: `userService` from `@/services/user.service`
- **DTOs**: `UserDto`, `UserEngagementDto` from `@/dtos/user.dto`
- **Material-UI**: Various UI components and theming utilities

## Benefits

- **Modularity**: Each component has a single responsibility
- **Reusability**: Components can be used independently
- **Maintainability**: Easier to update and debug individual features
- **Type Safety**: Full TypeScript support with proper interfaces
- **Consistency**: Shared design patterns and styling

# Share Link Components

This directory contains reusable components for the Share Link Analytics page.

## Components

### `ShareLinkTableColumns.tsx`

- **Purpose**: Defines the table column structure for share link analytics
- **Features**:
  - Simplified 5-column layout (Video, Created, Status, Performance, Actions)
  - Combined video thumbnail with title and creator info
  - Status indicators with expiration information
  - Performance metrics with icons
  - External link actions
- **Usage**: Returns MaterialReactTable column definitions

### `ShareLinkStatsCard.tsx`

- **Purpose**: Reusable card component for displaying individual statistics
- **Features**:
  - Consistent styling with subtle hover effects
  - Icon support for visual context
  - Optional subtitle for additional information
  - Responsive design
- **Props**:
  - `title`: Card title
  - `value`: Main statistic value
  - `icon`: React node for icon display
  - `subtitle`: Optional additional text

### `ShareLinkAnalyticsOverview.tsx`

- **Purpose**: Displays comprehensive analytics overview for a share link
- **Features**:
  - Key metrics grid (Views, Unique Visitors, Engagement Rate, Days Active)
  - Link details section with creation/expiration info
  - User information display
  - Engagement rate calculation
- **Props**:
  - `shareLink`: ShareLinkAnalyticsDto object

### `ShareLinkEngagementHistory.tsx`

- **Purpose**: Shows chronological engagement history
- **Features**:
  - Scrollable engagement timeline
  - Unique vs return visit indicators
  - Time-based grouping with hover effects
  - Empty state handling
- **Props**:
  - `engagementDetails`: Array of EngagementDetail objects

### `ShareLinkEngagementDetails.tsx`

- **Purpose**: Main orchestrator component combining overview and history
- **Features**:
  - Combines analytics overview and engagement history
  - Consistent layout with proper spacing
  - Responsive design for different screen sizes
- **Props**:
  - `shareLink`: ShareLinkAnalyticsDto object

## Design Principles

- **Subtle Styling**: Uses neutral colors and subtle gradients for professional appearance
- **Responsive Design**: Components adapt to different screen sizes
- **Consistent Spacing**: Follows Material-UI spacing conventions
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Performance**: Optimized for large datasets with virtualization support

## Usage Example

```tsx
import { ShareLinkEngagementDetails } from '@/components/admin/sharelinks';

// In your component
<ShareLinkEngagementDetails shareLink={shareLinkData} />;
```

## Dependencies

- Material-UI components
- React Icons (Remix Icons)
- dayjs for date formatting
- ShareLinkAnalyticsDto and EngagementDetail types

# Calendar Display Issue Troubleshooting Guide

## Issue Description
Class names and times are not displaying on calendar dates in the manage-schedule component.

## Root Cause Analysis
The calendar displays classes from the user's registered schedule, which requires:
1. Specific classes to exist in the database
2. User to be registered for those classes
3. Proper data flow from backend to frontend

## Fixes Applied

### 1. Frontend Improvements
- **Data Loading**: Fixed `loadClasses()` method to process all schedule items, not just current view dates
- **Component Communication**: Added event-based communication between daily-schedule and manage-schedule components
- **Real-time Updates**: Added event listeners to refresh calendar when schedule changes
- **Better Styling**: Improved CSS for better visibility of class items
- **Debug Tools**: Added debug panel and test buttons

### 2. Backend Verification
- **API Routes**: Verified all routes are properly configured
- **Database Schema**: Confirmed tables exist and are properly structured
- **Sample Data**: Created test data script for specific classes

## Testing Steps

### Step 1: Verify Backend is Running
1. Start the backend server: `cd backend && npm start`
2. Test API endpoint: `http://localhost:3000/test`
3. Check logs for any errors

### Step 2: Add Test Data
1. Run the SQL script to add sample specific classes:
   ```sql
   -- Connect to your database and run:
   \i backend/test_specific_classes.sql
   ```

### Step 3: Test User Registration Flow
1. Login to the application
2. Go to "Daily Schedule" tab
3. Select a date and add a class to your schedule
4. Switch to "Manage Classes" tab
5. Check if the class appears on the calendar

### Step 4: Use Debug Tools
1. In "Manage Classes" tab, click "Test API" button to verify connectivity
2. Click "Refresh" button to force data reload
3. Check the debug panel at the bottom to see raw data
4. Open browser console to see detailed logs

## Common Issues and Solutions

### Issue 1: No Classes Showing
**Cause**: No specific classes in database or user not registered
**Solution**: 
- Add sample data using the SQL script
- Register for classes through the Daily Schedule tab

### Issue 2: API Connection Failed
**Cause**: Backend server not running or CORS issues
**Solution**:
- Ensure backend is running on port 3000
- Check CORS configuration in backend

### Issue 3: Authentication Issues
**Cause**: JWT token expired or invalid
**Solution**:
- Logout and login again
- Check token in localStorage

### Issue 4: Data Not Refreshing
**Cause**: Component not receiving update events
**Solution**:
- Use the manual refresh button
- Check browser console for event logs

## Verification Checklist

- [ ] Backend server is running on port 3000
- [ ] Database tables exist (specific_classes, specific_class_registrations)
- [ ] Sample data is loaded
- [ ] User is logged in with valid token
- [ ] User has registered for at least one class
- [ ] API test button shows success
- [ ] Debug panel shows class data
- [ ] Browser console shows no errors

## Files Modified

### Frontend
- `manage-schedule.component.ts` - Improved data loading and event handling
- `manage-schedule.component.html` - Added debug tools and refresh button
- `manage-schedule.component.css` - Enhanced styling for better visibility
- `daily-schedule.component.ts` - Added event emission for schedule updates
- `daily-schedule.service.ts` - Added test connection method

### Backend
- `test_specific_classes.sql` - Sample data for testing
- `test_api.js` - Database connectivity test script

## Next Steps if Issue Persists

1. Check browser network tab for failed API calls
2. Verify database connection and data integrity
3. Test with different browsers
4. Check for JavaScript errors in console
5. Verify user permissions and authentication
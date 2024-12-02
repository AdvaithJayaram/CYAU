import { DatabaseService } from '../services/database';

// Example function to create a new deal
export async function createNewDeal(dealData: any) {
  try {
    const dealId = await DatabaseService.createDeal(dealData);
    return dealId;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
}

// Example function to fetch all deals
export async function fetchAllDeals() {
  try {
    const deals = await DatabaseService.getAllDeals();
    return deals;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
}

// Example function to update a deal
export async function updateExistingDeal(dealId: string, dealData: any) {
  try {
    await DatabaseService.updateDeal(dealId, dealData);
  } catch (error) {
    console.error('Error updating deal:', error);
    throw error;
  }
}

// Example function to create a new user
export async function createNewUser(userId: string, userData: any) {
  try {
    await DatabaseService.createUser(userId, userData);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Example function to create a connection
export async function createNewConnection(userId: string, connectionData: any) {
  try {
    const connectionId = await DatabaseService.createConnection(userId, connectionData);
    return connectionId;
  } catch (error) {
    console.error('Error creating connection:', error);
    throw error;
  }
}

// Example function to log an activity
export async function logDealActivity(dealId: string, activityData: any) {
  try {
    const activityId = await DatabaseService.logActivity(dealId, activityData);
    return activityId;
  } catch (error) {
    console.error('Error logging activity:', error);
    throw error;
  }
}

// Example function to create a notification
export async function createUserNotification(userId: string, notificationData: any) {
  try {
    const notificationId = await DatabaseService.createNotification(userId, notificationData);
    return notificationId;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}
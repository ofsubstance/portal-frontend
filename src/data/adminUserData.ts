export type AdminUser = {
  fieldNickname: string;
  firstName: string;
  lastName: string;
  businessEmail: string;
  mobilePhone: string;
  businessName: string;
  website: string;
  stateRegion: string;
  country: string;
  smsOptIn: boolean;
  emailOptIn: boolean;
  usageIntent: string;
  latestLoginDate: Date;
  accountCreationDate: Date;
  contentEngagements30Days: number;
  linkShares30Days: number;
  id: string;
};

// Generate random dates within the last year
const getRandomDate = (daysAgo: number = 365) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date;
};

// Generate random boolean
const getRandomBoolean = () => Math.random() > 0.5;

// Generate random number for engagements and shares
const getRandomNumber = (max: number = 100) => Math.floor(Math.random() * max);

// Usage intents
const usageIntents = [
  'Content Creation',
  'Marketing',
  'Education',
  'Personal Use',
  'Business',
  'Research',
  'Other',
];

// Create dummy admin users
export const adminUsers: AdminUser[] = Array(30)
  .fill(null)
  .map((_, index) => ({
    id: `user-${index + 1}`,
    fieldNickname: `user${index + 1}`,
    firstName: [
      'John',
      'Jane',
      'Michael',
      'Sarah',
      'David',
      'Emma',
      'Robert',
      'Lisa',
      'Thomas',
      'Emily',
    ][index % 10],
    lastName: [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Miller',
      'Davis',
      'Garcia',
      'Rodriguez',
      'Wilson',
    ][index % 10],
    businessEmail: `user${index + 1}@example.com`,
    mobilePhone: `+1 (555) ${100 + index}-${1000 + index}`,
    businessName: `Business ${String.fromCharCode(65 + (index % 26))}`,
    website: `https://www.business${index + 1}.com`,
    stateRegion: [
      'California',
      'New York',
      'Texas',
      'Florida',
      'Illinois',
      'Pennsylvania',
      'Ohio',
      'Georgia',
      'North Carolina',
      'Michigan',
    ][index % 10],
    country: [
      'United States',
      'Canada',
      'United Kingdom',
      'Australia',
      'Germany',
      'France',
      'Japan',
      'Brazil',
      'India',
      'Mexico',
    ][index % 10],
    smsOptIn: getRandomBoolean(),
    emailOptIn: getRandomBoolean(),
    usageIntent: usageIntents[index % usageIntents.length],
    latestLoginDate: getRandomDate(30),
    accountCreationDate: getRandomDate(365),
    contentEngagements30Days: getRandomNumber(50),
    linkShares30Days: getRandomNumber(20),
  }));
